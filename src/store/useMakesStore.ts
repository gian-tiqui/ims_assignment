import { create } from "zustand";

interface MakesStoreState {
  makes: string[];
  selectedMake: string;
  setMakes: (makes: string[]) => void;
  setSelectedMake: (make: string) => void;
}

export const useMakesStore = create<MakesStoreState>((set) => ({
  makes: [],
  selectedMake: "",
  setMakes: (makes) => set({ makes }),
  setSelectedMake: (make) => set({ selectedMake: make }),
}));
