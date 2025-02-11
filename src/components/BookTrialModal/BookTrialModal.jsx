import { useSelector } from "react-redux";

import Modal from "../Modal/Modal.jsx";
import BookTrialForm from "../BookTrialForm/BookTrialForm.jsx";
import { selectIsOpenModal } from "../../redux/modal/selectors.js";

import styles from "./BookTrialModal.module.css";

const BookTrialModal = ({ teacher, onCloseModal }) => {
  const isOpenModal = useSelector(selectIsOpenModal);

  return (
    <>
      {isOpenModal && teacher && (
        <Modal
          onCloseModal={onCloseModal}
          top={20}
          transform="translateX(-50%)"
          width={600}
        >
          <h2 className={styles.titleBook}>Book trial lesson</h2>
          <p className={styles.textBook}>
            Our experienced tutor will assess your current language level,
            discuss your learning goals, and tailor the lesson to your specific
            needs.
          </p>
          <div className={styles.boxTeacher}>
            <img
              className={styles.imgTeacher}
              src={teacher.avatar_url}
              alt={`Photo teacher ${teacher.name}`}
              width={44}
              height={44}
            />
            <div className={styles.boxNameTeacher}>
              <p className={styles.textNameTeachers}>Your teacher</p>
              <h4 className={styles.titleNameTeacher}>
                {teacher.name}&nbsp;{teacher.surname}
              </h4>
            </div>
          </div>
          <BookTrialForm />
        </Modal>
      )}
    </>
  );
};

export default BookTrialModal;
