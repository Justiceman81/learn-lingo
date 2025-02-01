import styles from "./RegisterModal.module.css";

const RegisterModal = ({ onClose }) => {
  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2>Register</h2>
        <p>Fill in your details to create an account.</p>
        <button className={styles.closeBtn} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default RegisterModal;
