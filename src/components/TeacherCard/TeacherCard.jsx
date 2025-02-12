import clsx from "clsx";
import sprite from "../../assets/icons/sprite.svg";
import toast from "react-hot-toast";
import { useState } from "react";
import { useAuth } from "../../redux/auth/auth";
import styles from "./TeacherCard.module.css";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, openModal } from "../../redux/modal/slice.js";
import { toggleLike } from "../../redux/auth/slice.js";
import {
  selectIsOpenModal,
  selectModalType,
} from "../../redux/modal/selectors.js";
import { selectUserLikes } from "../../redux/auth/selectors.js";
import BookTrialModal from "../BookTrialModal/BookTrialModal.jsx";

const TeacherCard = ({ teacher }) => {
  const dispatch = useDispatch();

  const { isAuth } = useAuth();

  const isOpenModal = useSelector(selectIsOpenModal);
  const modalType = useSelector(selectModalType);

  const [readLoad, setReadLoad] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  const likes = useSelector(selectUserLikes);

  const isLike = likes && likes.includes(teacher.id);

  const handleFavoriteClick = () => {
    if (!isAuth) {
      toast.error("This feature is available only for authenticated users.");
      return;
    }
    dispatch(toggleLike(teacher.id));
  };

  const handleReadMoreClick = () => {
    setReadLoad(!readLoad);
  };

  const isOpenModalBook = () => {
    if (!isAuth) {
      toast.error("Please log in first to book a trial lesson.");
      return;
    }
    setSelectedTeacher(teacher);
    dispatch(openModal("book"));
  };

  const onCloseModal = () => {
    setSelectedTeacher(null);
    dispatch(closeModal("book"));
  };

  return (
    <>
      <div
        className={clsx(styles.boxTeacher, readLoad ? "styles.readLoad" : "")}
      >
        <div className={styles.boxImg}>
          <img
            className={styles.img}
            src={teacher.avatar_url}
            alt="Photo teacher"
            width={96}
            height={96}
          />
        </div>
        <div className={styles.boxTeacherInfo}>
          <div className={styles.boxInfo}>
            <div className={styles.boxName}>
              <p>Languages</p>
              <h3 className={styles.title}>
                {teacher.name}&nbsp;
                {teacher.surname}
              </h3>
            </div>
            <div className={styles.boxListInfo}>
              <ul className={styles.listInfo}>
                <li className={clsx(styles.item, styles.itemSvg)}>
                  <svg className={styles.svg} width={16} height={16}>
                    <use href={`${sprite}#icon-book-open`}></use>
                  </svg>
                  <p className={styles.textInfo}>Lessons online</p>
                </li>
                <span className={styles.line}></span>
                <li className={styles.item}>
                  <p className={styles.textInfo}>
                    Lessons done:&nbsp;{teacher.lessons_done}
                  </p>
                </li>
                <span className={styles.line}></span>
                <li className={clsx(styles.item, styles.itemSvg)}>
                  <svg className={styles.svg} width={16} height={16}>
                    <use href={`${sprite}#icon-star`}></use>
                  </svg>
                  <p className={styles.textInfo}>
                    Rating:&nbsp;{teacher.rating}
                  </p>
                </li>
                <span className={styles.line}></span>
                <li className={styles.item}>
                  <p className={styles.textInfo}>
                    Price / 1 hour:&nbsp;
                    <span className={styles.spanPrice}>
                      {teacher.price_per_hour}$
                    </span>
                  </p>
                </li>
              </ul>
              <svg
                className={clsx(
                  `${styles.svgHeart} ${isLike ? styles.like : ""}`
                )}
                width={26}
                height={26}
                onClick={handleFavoriteClick}
              >
                <use href={`${sprite}#icon-heart`}></use>
              </svg>
            </div>
          </div>
          <ul className={styles.listSpeak}>
            <li>
              Speaks:&nbsp;
              <span className={clsx(styles.spanSpeak, styles.spanLine)}>
                {teacher.languages.join(", ")}
              </span>
            </li>
            <li>
              Lesson Info:&nbsp;
              <span className={styles.spanSpeak}>{teacher.lesson_info}</span>
            </li>
            <li>
              Conditions:&nbsp;
              <span className={styles.spanSpeak}>
                {teacher.conditions.join(" ")}
              </span>
            </li>
          </ul>
          {!readLoad ? (
            <>
              <button
                className={styles.btnInfo}
                type="button"
                onClick={handleReadMoreClick}
              >
                Read more
              </button>
              <ul className={styles.listLevel}>
                {teacher.levels.map((level, index) => (
                  <li className={styles.itemLevel} key={index}>
                    #{level}
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <>
              <p className={styles.readLoadText}>{teacher.experience}</p>
              <ul className={styles.listReviewUser}>
                {teacher.reviews.map((review, index) => (
                  <li className={styles.itemReviewUser} key={index}>
                    <div className={styles.boxReviewAvatar}>
                      <div className={styles.boxReviewUser}>
                        {review.reviewer_name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h4>{review.reviewer_name}</h4>
                        <div className={styles.boxReviewRating}>
                          <svg className={styles.svg} width={16} height={16}>
                            <use href={`${sprite}#icon-star`}></use>
                          </svg>
                          <p>{review.reviewer_rating.toFixed(1)}</p>
                        </div>
                      </div>
                    </div>
                    <p className={styles.textReviewUser}>{review.comment}</p>
                  </li>
                ))}
              </ul>
              <ul className={styles.listLevel}>
                {teacher.levels.map((level, index) => (
                  <li className={styles.itemLevel} key={index}>
                    #{level}
                  </li>
                ))}
              </ul>
              <button
                onClick={isOpenModalBook}
                className={styles.readLoadBtn}
                type="button"
              >
                Book trial lesson
              </button>
            </>
          )}
        </div>
        {isOpenModal && modalType === "book" && (
          <BookTrialModal
            teacher={selectedTeacher}
            onCloseModal={onCloseModal}
          />
        )}
      </div>
    </>
  );
};

export default TeacherCard;
