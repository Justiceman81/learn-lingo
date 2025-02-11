import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../redux/modal/slice.js";
import { selectIsOpenModal } from "../../redux/modal/selectors.js";
import Modal from "../Modal/Modal.jsx";
import LoginForm from "../LoginForm/LoginForm.jsx";
import styles from "./LoginModal.module.css";

const LoginModal = () => {
  const dispatch = useDispatch();

  const isOpenModal = useSelector(selectIsOpenModal);

  const onCloseModal = () => {
    dispatch(closeModal());
  };
  return (
    <>
      {isOpenModal && (
        <Modal onCloseModal={onCloseModal} width={566}>
          <h1 className={styles.title}>Log In</h1>
          <p className={styles.text}>
            Welcome back! Please enter your credentials to access your account
            and continue your search for an teacher.
          </p>
          <LoginForm />
        </Modal>
      )}
    </>
  );
};

export default LoginModal;
