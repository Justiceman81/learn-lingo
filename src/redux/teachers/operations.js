import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  get,
  query,
  ref,
  orderByKey,
  limitToFirst,
  startAfter,
} from "firebase/database";
import { dbRealtime } from "../../services/firebase";

export const fetchTeachers = createAsyncThunk(
  "teachers/fetchAll",
  async ({ startAfterId = null, limit = 4 }, thunkApi) => {
    try {
      let teachersQuery = query(
        ref(dbRealtime, "teachers"),
        orderByKey(),
        limitToFirst(limit + 1)
      );

      if (startAfterId) {
        teachersQuery = query(
          ref(dbRealtime, "teachers"),
          orderByKey(),
          startAfter(startAfterId),
          limitToFirst(limit + 1)
        );
      }

      const snapshot = await get(teachersQuery);
      if (!snapshot.exists()) {
        return { teachers: [], lastVisible: null };
      }

      const teachersData = snapshot.val();

      const teachersArray = Object.keys(teachersData).map((key) => ({
        id: key,
        ...teachersData[key],
      }));

      const paginatedTeachers = teachersArray.slice(0, limit);
      const lastVisible =
        teachersArray.length > limit ? teachersArray[limit].id : null;

      return { teachers: paginatedTeachers, lastVisible };
    } catch (error) {
      console.error("Error fetching teachers:", error);
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
