import { useDispatch, useSelector } from "react-redux";
import RegisterForm from "../RegisterForm/RegisterForm.jsx";
import Modal from "../Modal/Modal.jsx";
import { closeModal } from "../../redux/modal/slice.js";
import { selectIsOpenModal } from "../../redux/modal/selectors.js";
import styles from "./RegisterModal.module.css";

const RegisterModal = () => {
  const dispatch = useDispatch();

  const isOpenModal = useSelector(selectIsOpenModal);

  const onCloseModal = () => {
    dispatch(closeModal());
  };

  return (
    <>
      {isOpenModal && (
        <Modal onCloseModal={onCloseModal} width={566}>
          <h2 className={styles.title}>Registration</h2>
          <p className={styles.text}>
            Thank you for your interest in our platform! In order to register,
            we need some information. Please provide us with the following
            information
          </p>
          <RegisterForm />
        </Modal>
      )}
    </>
  );
};

export default RegisterModal;
