import type { Metadata } from "next";
import NoteForm from "@/components/NoteForm/NoteForm";
import css from "./CreateNote.module.css";

const OG_IMAGE = "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg";

export const metadata: Metadata = {
  title: "Create note | NoteHub",
  description: "Create a new personal note in NoteHub.",
  openGraph: {
    title: "Create note | NoteHub",
    description: "Create a new personal note in NoteHub.",
    url: "https://08-zustand.vercel.app/notes/action/create",
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

export default function CreateNote() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}