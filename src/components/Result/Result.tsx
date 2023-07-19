import c from "classnames";
import styles from "./Result.module.scss";
import { useModalStore } from "@/store/modalStore";
import {
  calculateResult,
  getGradeFromGradePoint,
  getGradePointFromGrade,
} from "@/utils/grade";
import BackIcon from "../Menu/icons/BackIcon";
import { useDataStore } from "@/store/dataStore";
import { Fragment, useCallback, useRef } from "react";
import { GRADES } from "@/data/data";
import Button from "../Button";

export default function Result({
  result,
}: {
  result: ReturnType<typeof calculateResult>;
}) {
  const { resultOpen, toggleResult } = useModalStore();

  const { inGrades, thGrades } = useDataStore();

  const tableContainerRef = useRef<HTMLTableElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);

  const printResult = useCallback(() => {
    const w = window.open();

    if (w === null) return;

    // TODO: Make the print a lil good looking
    const style = `
    table {
      table-layout: fixed;
      width: 100%;
    }
      tbody  tr:nth-child(even) {
        background-color: var(--result-table-row-even);
      }

      tbody tr:nth-child(odd) {
        background-color: var(--result-table-row-odd);
      }

    .${styles.span} {
      width: 100%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    td,
    th {
      text-align: center;
      margin: 0.5rem 0;
    }

    thead tr {
      position: sticky;
      top: 0;
      background: var(--card-bg);
    }

     colgroup .${styles.code} {
        width: 6ch;
      }
      colgroup .${styles.name} {
        width: 200px;
     colgroup }
     colgroup .${styles.credit} {
        width: 150px;
      }
      colgroup .${styles.gp} {
        width: 150px;
      }
      colgroup .${styles.grade} {
        width: 100px;
      }
      colgroup .${styles.finalgrade} {
        width: 150px;
      }
      colgroup .${styles.finalgp} {
        width: 150px;
      }
      colgroup .${styles.remarks} {
        width: 6ch;
      }
  
    .${styles.summary} {
      margin-top: 2rem;
    }  
    `;

    w.document.body.innerHTML =
      (tableContainerRef.current?.innerHTML ?? "") +
      (summaryRef.current?.innerHTML ?? "") +
      "<style>" +
      style +
      "</style>";

    w.print();
    w.onafterprint = window.close
  }, []);

  return (
    <div className={c(styles.result, { [styles.open]: resultOpen })}>
      <h1>
        <button onClick={toggleResult} className={styles.back}>
          <BackIcon />
        </button>
        Result
      </h1>
      <div className={styles.body}>
        <div ref={tableContainerRef} className={styles["table-container"]}>
          <table>
            <colgroup>
              <col className={styles.code} />
              <col className={styles.name} />
              <col className={styles.credit} />
              <col className={styles.gp} />
              <col className={styles.grade} />
              <col className={styles.finalgrade} />
              <col className={styles.finalgp} />
              <col className={styles.remarks} />
            </colgroup>
            <thead>
              <tr>
                <th>Code</th>
                <th>Subject Name</th>
                <th>Credit Hours</th>
                <th>Grade Point</th>
                <th>Grade</th>
                <th>Final GP</th>
                <th>Final Grade</th>
                <th>Remarks</th>
              </tr>
            </thead>
            <tbody>
              {result.subjects.map((subject, index) => (
                <Fragment key={index}>
                  <tr>
                    <td>{subject.code}</td>
                    <td>
                      <span className={styles.span}>{subject.name}</span>{" "}
                      (Theory)
                    </td>
                    <td>{subject.theory_credit}</td>
                    <td>{getGradePointFromGrade(GRADES[thGrades[index]])}</td>
                    <td>{GRADES[thGrades[index]]}</td>
                    <td>{result.subjectGrades[index]}</td>
                    <td>
                      {getGradeFromGradePoint(result.subjectGrades[index])}
                    </td>
                    <td>
                      {getGradePointFromGrade(GRADES[thGrades[index]]) < 1.6
                        ? "*"
                        : ""}
                    </td>
                  </tr>
                  <tr>
                    <td></td>
                    <td>
                      <span className={styles.span}>{subject.name}</span>{" "}
                      (Internal)
                    </td>
                    <td>{subject.internal_credit}</td>
                    <td>{getGradePointFromGrade(GRADES[inGrades[index]])}</td>
                    <td>{GRADES[inGrades[index]]}</td>
                    <td></td>
                    <td></td>
                    <td>
                      {getGradePointFromGrade(GRADES[inGrades[index]]) < 1.6
                        ? "*"
                        : ""}
                    </td>
                  </tr>
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className={styles.summary} ref={summaryRef}>
        <b>Grade Point Average: </b>
        {result.gpa} <br />
        <b>Final Grade: </b>
        {getGradeFromGradePoint(result.gpa)}
        <br />
        <br />
      </div>
      <Button onClick={printResult}>Print Result</Button>
    </div>
  );
}
