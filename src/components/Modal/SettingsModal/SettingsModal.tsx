import Modal from "../Modal";
import CloseIcon from "@/components/Menu/icons/CloseIcon";
import { useModalStore } from "@/store/modalStore";

import styles from "./SettingsModal.module.scss";

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
      <div className={styles.body}></div>
    </Modal>
  );
}
