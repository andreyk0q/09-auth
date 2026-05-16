"use client";

import Link from "next/link";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote } from "@/lib/api/clientApi";
import type { Note } from "@/types/note";
import css from "./NoteList.module.css";

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li key={note.id} className={css.item}>
          <h2>{note.title}</h2>
          <p>{note.content}</p>

          <div className={css.footer}>
            <span>{note.tag}</span>

            {/* 🔥 ВАЖЛИВО ДЛЯ 06 */}
            <Link href={`/notes/${note.id}`}>View details</Link>

            <button onClick={() => mutation.mutate(note.id)}>
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}