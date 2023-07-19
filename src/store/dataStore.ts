import { create } from "zustand";

type DataStore = {
  grade: "11" | "12";
  setGrade: (grade: DataStore["grade"]) => void;
  subjects: number[];
  setSubject: (index: number, value: number) => void;
  thGrades: number[];
  setThGrades: (index: number, value: number) => void;
  inGrades: number[];
  setInGrades: (index: number, value: number) => void;
};

const useDataStore = create<DataStore>((set) => ({
  grade: "11",
  setGrade: (grade: DataStore["grade"]) =>
    set((state) => ({
      ...state,
      thGrades: Array(6).fill(0),
      inGrades: Array(6).fill(0),
      subjects: Array(6).fill(0),
      grade,
    })),
  subjects: Array(6).fill(0),
  setSubject: (index: number, value: number) =>
    set((state) => {
      const subjects = [...state.subjects];
      subjects[index] = value;
      return { ...state, subjects };
    }),
  thGrades: Array(6).fill(0),
  setThGrades: (index: number, value: number) =>
    set((state) => {
      const thGrades = [...state.thGrades];
      thGrades[index] = value;
      return { ...state, thGrades };
    }),
  inGrades: Array(6).fill(0),
  setInGrades: (index: number, value: number) =>
    set((state) => {
      const inGrades = [...state.inGrades];
      inGrades[index] = value;
      return { ...state, inGrades };
    }),
}));

export type { DataStore };
export { useDataStore };
