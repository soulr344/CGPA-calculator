"use client";
import Menu from "@/components/Menu/Menu";
import styles from "./page.module.scss";
import HelpModal from "@/components/Modal/HelpModal/HelpModal";
import InfoModal from "@/components/Modal/InfoModal/InfoModal";
import SettingsModal from "@/components/Modal/SettingsModal/SettingsModal";
import { CustomSelect } from "@/components/CustomSelect";
import { CLASSES } from "@/data/data";
import { useDataStore } from "@/store/dataStore";
import { useCallback, useEffect, useMemo } from "react";
import SubjectRow from "@/components/SubjectRow";
import Button from "@/components/Button";
import Result from "@/components/Result/Result";
import { calculateResult } from "@/utils/grade";
import { useModalStore } from "@/store/modalStore";

export default function Home() {
  const data = useDataStore();
  const { grade, setGrade } = data;

  const { toggleResult, toggleDarkMode } = useModalStore();

  const handleGradeChange = useCallback(
    (value: number) => {
      setGrade(CLASSES[value]);
    },
    [setGrade]
  );

  useEffect(() => {
    if (window.matchMedia) {
      if (
        window.matchMedia("(prefers-color-scheme: dark)").matches &&
        !document.documentElement.classList.contains("light")
      ) {
        toggleDarkMode();
        return;
      }
    }

    document.documentElement.classList.contains("dark") && toggleDarkMode();
  }, [toggleDarkMode]);

  const result = useMemo(() => calculateResult(data), [data]);

  return (
    <>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1>GPA Calculator</h1>
          <Menu />
        </div>
        <hr />
        <div className={styles.body}>
          <div className={styles["class-select-wrapper"]}>
            <label
              htmlFor="class-btn"
              style={{ margin: "1rem 0 .4rem 0", display: "block" }}
            >
              Select Class:
            </label>
            <CustomSelect
              name="class"
              options={CLASSES.map((grade, index) => ({
                name: grade,
                value: index,
              }))}
              title="Select Class"
              onChange={handleGradeChange}
              defaultValue={CLASSES[0]}
            ></CustomSelect>
          </div>
          <div className={styles["row-container"]}>
            {[0, 1, 2, 3, 4, 5].map((index) => (
              <SubjectRow id={index} key={index + grade} />
            ))}
          </div>
        </div>
        <p style={{ marginBottom: "1rem" }}>
          Your GPA is: <b>{result.gpa}</b>
        </p>
        <Button onClick={toggleResult}>View Full Details</Button>
        <Result result={result} />
      </div>
      <HelpModal />
      <InfoModal />
      <SettingsModal />
    </>
  );
}
