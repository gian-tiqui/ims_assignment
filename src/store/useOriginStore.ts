import { create } from "zustand";

interface OriginState {
  origins: string[];
  setOrigins: (value: string[]) => void;
}

export const useOriginStore = create<OriginState>((set) => ({
  origins: [],
  setOrigins: (value) => set({ origins: value }),
}));
