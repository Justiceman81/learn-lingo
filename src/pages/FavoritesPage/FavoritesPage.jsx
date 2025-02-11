import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAuth } from "firebase/auth";
import { toast } from "react-hot-toast";

import Loader from "../../components/Loader/Loader.jsx";
import TeacherCard from "../../components/TeacherCard/TeacherCard.jsx";
import { Container } from "../../components/Container/Container.jsx";

import styles from "./FavoritesPage.module.css";

import {
  selectFavoritesError,
  selectFavoritesIsLoading,
  selectFavorites,
} from "../../redux/favorites/selectors.js";
import {
  subscribeToFavorites,
  addFavorite,
  removeFavorite,
} from "../../redux/favorites/operations.js";
import { selectUserLikes } from "../../redux/auth/selectors.js";
import { selectTeachers } from "../../redux/teachers/selectors.js";

const FavoritesPage = () => {
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites);
  const teachers = useSelector(selectTeachers);
  const loading = useSelector(selectFavoritesIsLoading);
  const error = useSelector(selectFavoritesError);
  const likes = useSelector(selectUserLikes);

  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      const unsubscribePromise = dispatch(subscribeToFavorites());

      return () => {
        unsubscribePromise.then((unsubscribe) => {
          if (typeof unsubscribe === "function") {
            unsubscribe();
          }
        });
      };
    }
  }, [dispatch, user]);

  const handleFavoriteClick = (teacher) => {
    if (!user) {
      toast.error("This feature is available only for authenticated users.");
      return;
    }

    const isFavorite = likes.includes(teacher.id);
    if (isFavorite) {
      dispatch(removeFavorite(teacher.id));
    } else {
      dispatch(addFavorite(teacher));
    }
  };

  const savedTeachers = teachers.filter((teacher) =>
    favorites.includes(teacher.id)
  );

  return (
    <>
      {loading && <Loader />}
      {error && <div>Error: {error}</div>}
      <Container>
        <ul className={styles.list}>
          {savedTeachers.length !== 0 ? (
            savedTeachers.map((teacher) => (
              <li key={teacher.id}>
                <TeacherCard
                  teacher={teacher}
                  onFavoriteClick={() => handleFavoriteClick(teacher)}
                  isFavorite={likes.includes(teacher.id)}
                />
              </li>
            ))
          ) : (
            <p className={styles.text}>You have no favorite teachers.</p>
          )}
        </ul>
      </Container>
    </>
  );
};

export default FavoritesPage;
