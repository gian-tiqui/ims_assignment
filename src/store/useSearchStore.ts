import { create } from "zustand";

interface InputState {
  input: string;
  setInput: (value: string) => void;
}

export const useSearchStore = create<InputState>((set) => ({
  input: "",
  setInput: (value) => set({ input: value }),
}));
