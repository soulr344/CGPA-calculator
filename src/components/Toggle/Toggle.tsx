"use client";

import { useModalStore } from "@/store/modalStore";

import styles from "./Toggle.module.scss"

export default function Toggle() {
  const { darkMode, toggleDarkMode } = useModalStore();
  return (
    <div className={styles["switch-container"]}>
      <input
        type="checkbox"
        id="darkModeToggle"
        checked={darkMode}
        onChange={toggleDarkMode}
      />
      <label htmlFor="darkModeToggle"></label>
    </div>
  );
}
