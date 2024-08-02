import { create } from "zustand";

interface OriginStoreState {
  origins: string[];
  selectedOrigin: string;
  setOrigins: (origins: string[]) => void;
  setSelectedOrigin: (origin: string) => void;
}

export const useOriginStore = create<OriginStoreState>((set) => ({
  origins: [],
  selectedOrigin: "",
  setOrigins: (origins) => set({ origins }),
  setSelectedOrigin: (origin) => set({ selectedOrigin: origin }),
}));
