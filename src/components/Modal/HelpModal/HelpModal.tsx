import Modal from "../Modal";
import CloseIcon from "@/components/Menu/icons/CloseIcon";
import { useModalStore } from "@/store/modalStore";
import Formula from "@/components/Menu/icons/Formula";

import styles from "./HelpModal.module.scss";

export default function HelpModal({}) {
  const { helpModal, toggleHelpModal } = useModalStore();

  return (
    <Modal open={helpModal} onBackdropClick={toggleHelpModal}>
      <h1 className={styles.h1}>
        How to use?
        <button className={styles.close} onClick={toggleHelpModal} aria-label="Close Help">
          <CloseIcon />
        </button>
      </h1>
      <div className={styles.body}>
        <p className={styles.p}>
          First of all, select the desired subjects. The top 3 subjects are
          reserved for compulsory subjects (English, Nepali, Maths or Social
          Studies). The rest 3 are for optional subjects.
        </p>
        <p className={styles.p}>
          Then, select the GPA for all subjects taking note that the GPA for{" "}
          <strong>Theory (TH)</strong> and for <strong>Internal (IN)</strong>{" "}
          cannot be interchanged. After completing, click the{" "}
          <strong>&quot;Calculate&quot;</strong> button and your CGPA along with
          your grade will be displayed.
        </p>

        <p className={styles.p}>
          <strong>Note:</strong> Selecting different subjects and/or inserting
          values of Theory subjects in Internal field and vice-versa will result
          in inaccurate results.
        </p>
        <p className={styles.p}>
          This is because each subject, along with Theory and Internal have
          different credit hours. Because of this, misselection of subjects
          and/or GPAs, will result in inaccurate result (it&apos;s not incorrect
          tho technically, Garbage In Garbage Out lol).
        </p>
        <div>
          <Formula />
        </div>
      </div>
    </Modal>
  );
}
