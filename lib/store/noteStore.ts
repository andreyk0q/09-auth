import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { NoteTag } from "@/types/note";

export const initialDraft = {
  title: "",
  content: "",
  tag: "Todo" as NoteTag,
};

interface NoteDraft {
  title: string;
  content: string;
  tag: NoteTag;
}

interface NoteStore {
  draft: NoteDraft;
  setDraft: (note: Partial<NoteDraft>) => void;
  clearDraft: () => void;
}

export const useNoteStore = create<NoteStore>()(
  persist(
    (set) => ({
      draft: initialDraft,

      setDraft: (note) =>
        set((state) => ({
          draft: {
            ...state.draft,
            ...note,
          },
        })),

      clearDraft: () => set({ draft: initialDraft }),
    }),
    {
      name: "note-draft-storage",
    }
  )
);