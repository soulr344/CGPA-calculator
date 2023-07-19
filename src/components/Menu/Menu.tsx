import { useState } from "react";
import Modal from "../Modal/Modal";
import Formula from "./icons/Formula";
import styles from "./Menu.module.scss";
import InfoIcon from "./icons/InfoIcon";
import AboutIcon from "./icons/AboutIcon";
import CloseIcon from "./icons/CloseIcon";
import SettingsIcon from "./icons/Settings";
import { useModalStore } from "@/store/modalStore";

export default function Menu() {
  const { toggleHelpModal, toggleInfoModal, toggleSettingsModal } =
    useModalStore();

  return (
    <>
      <div className={styles.menu}>
        <button onClick={toggleInfoModal} aria-label="About GPA Calculator">
          <InfoIcon />
        </button>
        <button onClick={toggleHelpModal} aria-label="Help for using GPA Calculator">
          <AboutIcon />
        </button>
        <button onClick={toggleSettingsModal} aria-label="Settings">
          <SettingsIcon />
        </button>
      </div>
    </>
  );
}
