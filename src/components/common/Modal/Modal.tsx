import { FC, PropsWithChildren } from "react";
import styles from "./Modal.module.scss";
import { Portal } from "../Portal";

const Modal: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Portal>
      <div className={styles.overlay}>
        <div className={styles.content}>{children}</div>
      </div>
    </Portal>
  );
};

export default Modal;
