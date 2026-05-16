"use client";

import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "@/lib/api/clientApi";
import { useNoteStore } from "@/lib/store/noteStore";
import type { NoteTag } from "@/types/note";
import css from "./NoteForm.module.css";

export default function NoteForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { draft, setDraft, clearDraft } = useNoteStore();

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      clearDraft();
      router.back();
    },
  });

  function handleSubmit(formData: FormData) {
    const title = String(formData.get("title"));
    const content = String(formData.get("content"));
    const tag = String(formData.get("tag")) as NoteTag;

    mutation.mutate({
      title,
      content,
      tag,
    });
  }

  function handleChange(
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    setDraft({
      [event.target.name]: event.target.value,
    });
  }

  return (
    <form action={handleSubmit} className={css.form}>
      <input
        className={css.input}
        type="text"
        name="title"
        placeholder="Title"
        value={draft.title}
        onChange={handleChange}
      />

      <textarea
        className={css.textarea}
        name="content"
        placeholder="Content"
        value={draft.content}
        onChange={handleChange}
      />

      <select
        className={css.select}
        name="tag"
        value={draft.tag}
        onChange={handleChange}
      >
        <option value="Todo">Todo</option>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
        <option value="Meeting">Meeting</option>
        <option value="Shopping">Shopping</option>
      </select>

      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelBtn}
          onClick={() => router.back()}
        >
          Cancel
        </button>

        <button
          type="submit"
          className={css.submitBtn}
          disabled={mutation.isPending}
        >
          Create
        </button>
      </div>
    </form>
  );
}