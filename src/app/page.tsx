"use client";
import Menu from "@/components/Menu/Menu";
import styles from "./page.module.scss";
import HelpModal from "@/components/Modal/HelpModal/HelpModal";
import InfoModal from "@/components/Modal/InfoModal/InfoModal";
import SettingsModal from "@/components/Modal/SettingsModal/SettingsModal";
import { CustomSelect } from "@/components/CustomSelect";
import { CLASSES, GRADES } from "@/data/data";
import { useDataStore } from "@/store/dataStore";
import { useCallback } from "react";
import SubjectRow from "@/components/SubjectRow";
import { SubjectSelect } from "@/components/GPASelect";

export default function Home() {
  const { grade, setGrade } = useDataStore();

  const handleGradeChange = useCallback(
    (value: number) => {
      setGrade(CLASSES[value]);
    },
    [setGrade]
  );

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
              <SubjectRow grade={parseInt(grade)} id={index} key={index} />
            ))}
          </div>
        </div>
      </div>
      <HelpModal />
      <InfoModal />
      <SettingsModal />
    </>
  );
}
