import { create } from "zustand";

interface MakesState {
  makes: string[];
  setMakes: (value: string[]) => void;
}

export const useMakesStore = create<MakesState>((set) => ({
  makes: [],
  setMakes: (value) => set({ makes: value }),
}));
