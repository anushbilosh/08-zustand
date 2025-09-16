import { create } from "zustand";
import type { CreateNoteProp } from "@/lib/api";
import { persist } from "zustand/middleware";

type NoteDraftStore = {
  draft: CreateNoteProp;
  setDraft: (note: CreateNoteProp) => void;
  clearDraft: () => void;
};

export const initialDraft: CreateNoteProp = {
  title: "",
  content: "",
  tag: "Todo",
};

export const useNoteDraftStore = create<NoteDraftStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (note) => set(() => ({ draft: note })),
      clearDraft: () => set(() => ({ draft: initialDraft })),
    }),
    {
      name: "note-draft",
      partialize: (state) => ({ draft: state.draft }),
    }
  )
);
