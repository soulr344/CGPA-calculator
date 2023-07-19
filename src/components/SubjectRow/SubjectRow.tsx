import styles from "./SubjectRow.module.scss";
import { GradeSelect, SubjectSelect } from "../GPASelect";
import { useCallback } from "react";
import { useDataStore } from "@/store/dataStore";

export default function SubjectRow({ id }: { id: number }) {
  const optional = id > 2;
  const name = `sub-${optional ? "opt" : "comp"}-${id}`;

  const { grade, setInGrades, setSubject, setThGrades } = useDataStore();

  const handleSubjectChange = useCallback(
    (value: number) => {
      setSubject(id, value);
    },
    [setSubject, id]
  );

  const handleInChange = useCallback(
    (value: number) => {
      setInGrades(id, value);
    },
    [setInGrades, id]
  );

  const handleThChange = useCallback(
    (value: number) => {
      setThGrades(id, value);
    },
    [setThGrades, id]
  );

  return (
    <>
    <div className={styles["row-container"]}>
      <div>
        <SubjectSelect
          onChange={handleSubjectChange}
          name={name}
          optional={optional}
          id={id}
        />
      </div>
      <div className={styles.break}></div>
      <div className={styles["select-container"]}>
        <GradeSelect
          key={grade}
          id={id}
          onChange={handleThChange}
          name={name}
        />
      </div>
      <div className={styles["select-container"]}>
        <GradeSelect
          key={grade}
          id={id}
          onChange={handleInChange}
          name={name}
          internal
        />
      </div>
    </div>
    </>
  );
}
