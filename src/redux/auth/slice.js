import { createSlice } from "@reduxjs/toolkit";
import { getDatabase, ref, set } from "firebase/database";

const savedUser = JSON.parse(localStorage.getItem("user"));

const INITIAL_USER_STATE = {
  email: savedUser?.email || null,
  token: savedUser?.token || null,
  id: savedUser?.id || null,
  likes: savedUser?.likes || [],
};

const userSlice = createSlice({
  name: "user",
  initialState: INITIAL_USER_STATE,
  reducers: {
    setUser(state, action) {
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.id = action.payload.id;
      localStorage.setItem(
        "user",
        JSON.stringify({
          email: state.email,
          token: state.token,
          id: state.id,
          likes: state.likes,
        })
      );
    },
    removeUser(state) {
      state.email = null;
      state.token = null;
      state.id = null;
      state.likes = [];
      localStorage.removeItem("user");
    },
    toggleLike(state, action) {
      if (!state.token) {
        return;
      }
      const teacherId = action.payload;
      const isLiked = state.likes.includes(teacherId);
      const newLikes = isLiked
        ? state.likes.filter((id) => id !== teacherId)
        : [...state.likes, teacherId];

      state.likes = newLikes;
      localStorage.setItem(
        "user",
        JSON.stringify({
          email: state.email,
          token: state.token,
          id: state.id,
          likes: state.likes,
        })
      );

      const db = getDatabase();
      const userRef = ref(db, `users/${state.id}/favorites`);
      set(userRef, newLikes)
        .then(() => console.log("Favorites updated in Firebase:", newLikes))
        .catch((error) => console.error("Firebase update error:", error));
    },
  },
});

export const { setUser, removeUser, toggleLike } = userSlice.actions;
export const userReducer = userSlice.reducer;
