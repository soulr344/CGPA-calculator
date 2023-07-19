import { useDataStore } from "@/store/dataStore";
import { CustomSelectInput } from "../CustomSelect";
import { memo, useMemo } from "react";
import { SUBJECT_DATA } from "@/data/data";

function SubjectSelect({
  id,
  name,
  optional = false,
  onChange,
}: {
  id: number;
  name: string;
  optional?: boolean;
  onChange: (value: number) => void;
}) {
  const { grade, subjects } = useDataStore();

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
      <label htmlFor={name + "-btn"} style={{ whiteSpace: "nowrap" }}>
        {optional ? "Optional" : "Compulsory"} Subject{" "}
        {id < 3 ? "I".repeat(id + 1) : "I".repeat(id - 2)}:
      </label>
      <CustomSelectInput
        disabled={grade == null}
        name={name}
        placeholder="Search Subjects"
        title="Select Subject"
        options={options}
        onChange={onChange}
        defaultValue={options[subjects[id]].name}
      />
    </>
  );
}

export default memo(SubjectSelect);
