import Modal from "../Modal";
import CloseIcon from "@/components/Menu/icons/CloseIcon";
import { useModalStore } from "@/store/modalStore";

import styles from "./SettingsModal.module.scss";
import Toggle from "@/components/Toggle/Toggle";

export default function SettingsModal({}) {
  const { settingsModal, toggleSettingsModal } = useModalStore();

  return (
    <Modal open={settingsModal} onBackdropClick={toggleSettingsModal}>
      <h1 className={styles.h1}>
        Settings
        <button className={styles.close} onClick={toggleSettingsModal}>
          <CloseIcon />
        </button>
      </h1>
      <div className={styles.body}>
        <label htmlFor="darkModeToggle">
          <h3>Dark Mode:</h3>
        </label>
        <Toggle />
      </div>
    </Modal>
  );
}
