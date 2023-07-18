import styles from "./SubjectRow.module.scss";
import { GradeSelect, SubjectSelect } from "../GPASelect";

export default function SubjectRow({
  id,
  grade,
}: {
  id: number;
  grade: number | null;
}) {
  const optional = id > 2;
  const name = `sub-${optional ? "opt" : "comp"}-${id}`;
  return (
    <>
      {/* <div className={styles["subject-row"]}> */}
      <div className={`${styles["flex-1"]} ${styles["select-container"]}`}>
        <SubjectSelect name={name} optional={optional} id={id} />
      </div>
      <div className={styles["select-container"]}>
        <GradeSelect name={name} grade={grade} />
      </div>
      <div
        style={{ marginBottom: "1.3rem" }}
        className={styles["select-container"]}
      >
        <GradeSelect name={name} grade={grade} internal />
      </div>
      {/* </div> */}
    </>
  );
}
