import { GRADES } from "@/data/data";
import { CustomSelect } from "../CustomSelect";

export default function GradeSelect({
  name,
  grade,
  internal = false,
}: {
  name: string;
  grade: number | null;
  internal?: boolean;
}) {
  const options =
    grade == null
      ? [{ name: "Select Grade First", value: -1 }]
      : GRADES.map((sub, index) => ({
          name: sub,
          value: index,
        }));

  const nameSelect = name + (internal ? "-internal" : "-theory");

  return (
    <>
      <label htmlFor={nameSelect + "-btn"}>
        {internal ? "Internal:" : "Theory:"}
      </label>
      <CustomSelect
        disabled={grade == null}
        name={nameSelect}
        title="GPA"
        options={options}
      />
    </>
  );
}
