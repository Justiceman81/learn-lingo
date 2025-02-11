import { onAuthStateChanged, getAuth } from "firebase/auth";
import { onValue, ref, set, remove } from "firebase/database";
import { dbRealtime } from "../../services/firebase";
import { setFavorites } from "./slice";
import { createAsyncThunk } from "@reduxjs/toolkit";

const auth = getAuth();

export const subscribeToFavorites = () => (dispatch) => {
  return new Promise((resolve) => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (!user) return;

      const favoritesRef = ref(dbRealtime, `users/${user.uid}/favorites`);

      const unsubscribeFavorites = onValue(
        favoritesRef,
        (snapshot) => {
          const data = snapshot.val();
          const favoritesArray = data ? Object.values(data) : [];
          dispatch(setFavorites(favoritesArray));
        },
        (error) => console.error("Error fetching favorites:", error)
      );

      resolve(() => {
        unsubscribeAuth();
        unsubscribeFavorites();
      });
    });
  });
};

export const addFavorite = createAsyncThunk(
  "favorites/addFavorite",
  async (teacher, { rejectWithValue }) => {
    try {
      return new Promise((resolve, reject) => {
        onAuthStateChanged(auth, async (user) => {
          if (!user)
            return reject(rejectWithValue("User is not authenticated"));

          const favRef = ref(dbRealtime, `favorites/${user.uid}/${teacher.id}`);
          await set(favRef, teacher);
          resolve();
        });
      });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const removeFavorite = createAsyncThunk(
  "favorites/removeFavorite",
  async (teacherId, { rejectWithValue }) => {
    try {
      return new Promise((resolve, reject) => {
        onAuthStateChanged(auth, async (user) => {
          if (!user)
            return reject(rejectWithValue("User is not authenticated"));

          const favRef = ref(dbRealtime, `favorites/${user.uid}/${teacherId}`);
          await remove(favRef);
          resolve();
        });
      });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
