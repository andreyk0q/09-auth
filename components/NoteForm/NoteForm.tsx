"use client";

import { useRouter } from "next/navigation";
import { createNote } from "@/lib/api";
import { useNoteStore } from "@/lib/store/noteStore";
import css from "./NoteForm.module.css";

export default function NoteForm() {
  const router = useRouter();
  const { draft, setDraft, clearDraft } = useNoteStore();

  async function handleSubmit(formData: FormData) {
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const tag = formData.get("tag") as
      | "Todo"
      | "Work"
      | "Personal"
      | "Meeting"
      | "Shopping";

    await createNote({
      title,
      content,
      tag,
    });

    clearDraft();
    router.back();
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

        <button type="submit" className={css.submitBtn}>
          Create
        </button>
      </div>
    </form>
  );
}