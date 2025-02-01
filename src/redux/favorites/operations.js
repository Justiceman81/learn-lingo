import { createAsyncThunk } from "@reduxjs/toolkit";
import { getDatabase, ref, update, remove, get } from "firebase/database";
import { auth } from "../../services/firebase";

export const addToFavoritesDB = createAsyncThunk(
  "favorites/addToFavoritesDB",
  async (teacher, { rejectWithValue }) => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("User not authenticated");

      if (!teacher?.id) throw new Error("Invalid teacher data");

      const db = getDatabase();
      const favRef = ref(db, `users/${user.uid}/favorites/${teacher.id}`);
      await update(favRef, teacher);

      return teacher;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const removeFromFavoritesDB = createAsyncThunk(
  "favorites/removeFromFavoritesDB",
  async (teacherId, { rejectWithValue }) => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("User not authenticated");

      if (!teacherId) throw new Error("Invalid teacher ID");

      const db = getDatabase();
      const favRef = ref(db, `users/${user.uid}/favorites/${teacherId}`);
      await remove(favRef);

      return teacherId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchFavoritesDB = createAsyncThunk(
  "favorites/fetchFavoritesDB",
  async (_, { rejectWithValue }) => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("User not authenticated");

      const db = getDatabase();
      const favRef = ref(db, `users/${user.uid}/favorites`);
      const snapshot = await get(favRef);

      return snapshot.exists() ? Object.values(snapshot.val()) : [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
