import { GRADES } from "@/data/data";
import { CustomSelect } from "../CustomSelect";
import { useMemo } from "react";
import { useDataStore } from "@/store/dataStore";

export default function GradeSelect({
  id,
  name,
  internal = false,
  onChange,
}: {
  id: number;
  name: string;
  internal?: boolean;
  onChange: (value: number) => void;
}) {
  const { inGrades, thGrades } = useDataStore();

  const options = useMemo(
    () =>
      GRADES.map((sub, index) => ({
        name: sub,
        value: index,
      })),
    []
  );

  const nameSelect = name + (internal ? "-internal" : "-theory");

  return (
    <>
      <label htmlFor={nameSelect + "-btn"}>
        {internal ? "Internal:" : "Theory:"}
      </label>
      <CustomSelect
        onChange={onChange}
        name={nameSelect}
        title="GPA"
        options={options}
        defaultValue={options[internal ? inGrades[id] : thGrades[id]].name}
      />
    </>
  );
}
