import type { Metadata } from "next";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import type { NoteTag } from "@/types/note";
import NotesClient from "./Notes.client";

const PER_PAGE = 12;
const OG_IMAGE = "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg";

const allowedTags: NoteTag[] = [
  "Todo",
  "Work",
  "Personal",
  "Meeting",
  "Shopping",
];

interface NotesPageProps {
  params: Promise<{
    slug: string[];
  }>;
}

function getTagFromSlug(slug?: string[]): NoteTag | undefined {
  const tagFromUrl = slug?.[0];

  if (tagFromUrl && allowedTags.includes(tagFromUrl as NoteTag)) {
    return tagFromUrl as NoteTag;
  }

  return undefined;
}

export async function generateMetadata({
  params,
}: NotesPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tag = getTagFromSlug(slug);
  const filterName = tag ?? "All";

  return {
    title: `${filterName} notes | NoteHub`,
    description: `Browse ${filterName.toLowerCase()} notes in NoteHub.`,
    openGraph: {
      title: `${filterName} notes | NoteHub`,
      description: `Browse ${filterName.toLowerCase()} notes in NoteHub.`,
      url: `/notes/filter/${tag ?? "all"}`,
      images: [
        {
          url: OG_IMAGE,
          width: 1200,
          height: 630,
          alt: "NoteHub preview image",
        },
      ],
    },
  };
}

export default async function NotesPage({ params }: NotesPageProps) {
  const { slug } = await params;
  const tag = getTagFromSlug(slug);

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", 1, "", tag],
    queryFn: () =>
      fetchNotes({
        page: 1,
        perPage: PER_PAGE,
        search: "",
        tag,
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}