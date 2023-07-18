import { useRef, useState } from "react";
import styles from "./Modal.module.scss";
import c from "classnames";

export default function Modal({
  children,
  open,
  onBackdropClick,
}: {
  children: React.ReactNode;
  open: boolean;
  onBackdropClick?: () => void;
}) {
  const divRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={divRef}
      className={c(styles.backdrop, { [styles.open]: open })}
      onClick={(e) => {
        if (e.target != divRef.current) return;
        e.stopPropagation();
        onBackdropClick?.();
      }}
    >
      <div className={styles.box}>{children}</div>
    </div>
  );
}
