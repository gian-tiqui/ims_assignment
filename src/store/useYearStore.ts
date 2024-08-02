import { create } from "zustand";

interface YearStoreState {
  selectedYear: string;
  setSelectedYear: (year: string) => void;
  releaseFrom: string;
  releaseTo: string;
}

export const useYearStore = create<YearStoreState>((set) => ({
  selectedYear: "",
  releaseFrom: "",
  releaseTo: "",
  setSelectedYear: (year) => {
    if (year === "") {
      set({ selectedYear: year, releaseFrom: "", releaseTo: "" });
    } else {
      const releaseFromYear = parseInt(year);
      const releaseToYear = releaseFromYear + 9;

      set({
        selectedYear: year,
        releaseFrom: releaseFromYear.toString(),
        releaseTo: releaseToYear.toString(),
      });
    }
  },
}));
