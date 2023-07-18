import { GRADES } from "@/data/data";
import { CustomSelect } from "../CustomSelect";
import { useMemo } from "react";

export default function GradeSelect({
  name,
  internal = false,
}: {
  name: string;
  grade: number | null;
  internal?: boolean;
}) {
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
      <CustomSelect name={nameSelect} title="GPA" options={options} />
    </>
  );
}
