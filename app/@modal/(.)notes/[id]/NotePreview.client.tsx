"use client";

import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Modal from "@/components/Modal/Modal";
import { fetchNoteById } from "@/lib/api/clientApi";
import css from "@/components/NotePreview/NotePreview.module.css";

interface NotePreviewClientProps {
  id: string;
}

export default function NotePreviewClient({ id }: NotePreviewClientProps) {
  const router = useRouter();

  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) {
    return (
      <Modal>
        <p>Loading...</p>
      </Modal>
    );
  }

  if (isError || !note) {
    return (
      <Modal>
        <p>Something went wrong...</p>
      </Modal>
    );
  }

  return (
    <Modal>
      <div className={css.preview}>
        <button className={css.close} onClick={() => router.back()}>
          ×
        </button>
        <h2>{note.title}</h2>
        <p>{note.tag}</p>
        <p>{note.content}</p>
      </div>
    </Modal>
  );
}
