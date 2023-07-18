import { create } from "zustand";

type DataStore = {
  grade: "11" | "12";
  setGrade: (grade: DataStore["grade"]) => void;
};

const useDataStore = create<DataStore>((set) => ({
  grade: "11",
  setGrade: (grade: DataStore["grade"]) =>
    set((state) => ({
      ...state,
      grade,
    })),
}));

export type { DataStore };
export { useDataStore };
