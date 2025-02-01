import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTeachers } from "../../redux/teachers/operations.js";
import { Container } from "../Container/Container.jsx";
import Loader from "../Loader/Loader.jsx";
import TeacherCard from "../TeacherCard/TeacherCard.jsx";
import {
  selectError,
  selectLastVisible,
  selectIsLoading,
  selectTeachers,
} from "../../redux/teachers/selectors.js";
import styles from "./TeachersList.module.css";

const PAGE_SIZE = 4;

const TeachersList = () => {
  const dispatch = useDispatch();
  const teachers = useSelector(selectTeachers);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const lastVisible = useSelector(selectLastVisible);

  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (teachers.length === 0 && !isLoading) {
      dispatch(
        fetchTeachers({ startAfterId: null, limit: PAGE_SIZE })
      ).unwrap();
    }
  }, [dispatch, teachers.length, isLoading]);

  const loadMore = () => {
    if (!lastVisible || isLoading) return;

    dispatch(fetchTeachers({ startAfterId: lastVisible, limit: PAGE_SIZE }))
      .unwrap()
      .then((response) => {
        console.log("Response from fetchTeachers:", response);
        if (!response.lastVisible) {
          setHasMore(false);
        }
      })
      .catch((error) => {
        console.error("Error loading more teachers:", error);
      });
  };

  return (
    <>
      {isLoading && <Loader />}
      {error && <div>Error: {error}</div>}
      <Container>
        <ul className={styles.list}>
          {teachers.length > 0 ? (
            teachers.map((teacher) => (
              <li key={teacher.id}>
                <TeacherCard teacher={teacher} />
              </li>
            ))
          ) : (
            <div>No teachers available</div>
          )}
        </ul>
        {hasMore && !isLoading && (
          <div className={styles.boxBtn}>
            <button className={styles.btn} onClick={loadMore}>
              Load more
            </button>
          </div>
        )}
      </Container>
    </>
  );
};

export default TeachersList;
