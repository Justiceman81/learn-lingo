import { useEffect } from "react";
import { createPortal } from "react-dom";

import sprite from "../../assets/icons/sprite.svg";
import styles from "./Modal.module.css";

export const Modal = ({
  children,
  onCloseModal,
  top = "50%",
  transform = "translate(-50%,-50%)",
  width = "200px",
}) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === "Escape") {
        onCloseModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onCloseModal]);

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      onCloseModal();
    }
  };

  return createPortal(
    <div className={styles.backdrop} onClick={handleBackdropClick}>
      <div className={styles.modal} style={{ width, top, transform }}>
        <button
          type="button"
          className={styles.btn}
          onClick={onCloseModal}
          aria-label="Close modal"
        >
          <svg className={styles.svg} width={32} height={32}>
            <use href={`${sprite}#icon-x`} />
          </svg>
        </button>
        {children}
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default Modal;
