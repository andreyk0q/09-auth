"use client";

import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api/clientApi";
import css from "./NotePreview.module.css";

interface NotePreviewProps {
  id: string;
}

export default function NotePreview({ id }: NotePreviewProps) {
  const router = useRouter();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError || !data) {
    return <p>Something went wrong...</p>;
  }

  return (
    <div className={css.preview}>
      <button className={css.close} onClick={() => router.back()}>
        ×
      </button>

      <h2>{data.title}</h2>
      <p>{data.tag}</p>
      <p>{data.content}</p>
    </div>
  );
}