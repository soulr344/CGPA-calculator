import {
  SUB_11_COMP_SUBS,
  SUB_11_DETAILS_ASC,
  SUB_12_COMP_SUBS,
  SUB_12_DETAILS_ASC,
} from "@/data/data";
import { CustomSelectInput } from "../CustomSelect";
import { memo, useMemo } from "react";

function getSubjectsDetail(optional: boolean, grade: number) {
  if (optional) return grade === 11 ? SUB_11_DETAILS_ASC : SUB_12_DETAILS_ASC;
  return grade === 11 ? SUB_11_COMP_SUBS : SUB_12_COMP_SUBS;
}

function SubjectSelect({
  id,
  name,
  grade,
  optional = false,
}: {
  id: number;
  name: string;
  grade: number | null;
  optional?: boolean;
}) {
  const options = useMemo(
    () =>
      grade == null
        ? [{ name: "Select Grade First", value: -1 }]
        : getSubjectsDetail(optional, grade).map((sub, index) => ({
            name: sub.name,
            value: index,
          })),
    [grade, optional]
  );

  return (
    <>
      <label htmlFor={name + "-btn"}>
        {optional ? "Optional" : "Compulsory"} Subject{" "}
        {id < 3 ? "I".repeat(id + 1) : "I".repeat(id - 2)}:
      </label>
      <CustomSelectInput
        disabled={grade == null}
        name={name}
        placeholder="Search Subjects"
        title="Select Subject"
        options={options}
      />
    </>
  );
}

export default memo(SubjectSelect);
