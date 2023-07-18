import { useDataStore } from "@/store/dataStore";
import { CustomSelectInput } from "../CustomSelect";
import { memo, useMemo } from "react";
import { SUBJECT_DATA } from "@/data/data";

function SubjectSelect({
  id,
  name,
  optional = false,
}: {
  id: number;
  name: string;
  optional?: boolean;
}) {
  const { grade } = useDataStore();

  const subject_list = useMemo(
    () => SUBJECT_DATA[grade][optional ? "optional" : "compulsory"],
    [grade, optional]
  );

  const options = useMemo(
    () =>
      subject_list.map((subject, index) => ({
        name: subject.name,
        value: index,
      })),
    [subject_list]
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
