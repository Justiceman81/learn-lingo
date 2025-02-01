import styles from "./LoginModal.module.css";

const LoginModal = ({ onClose }) => {
  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2>Login</h2>
        <p>Enter your credentials to log in.</p>
        <button className={styles.closeBtn} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default LoginModal;
