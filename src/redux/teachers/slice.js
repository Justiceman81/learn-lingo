import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getDatabase,
  ref,
  get,
  query,
  orderByChild,
  limitToFirst,
  startAfter,
} from "firebase/database";

// Async thunk для отримання викладачів
export const fetchTeachers = createAsyncThunk(
  "teachers/fetchTeachers",
  async ({ page = 1, limit = 4, lastKey = null }, { rejectWithValue }) => {
    try {
      const db = getDatabase();
      let teachersQuery = query(
        ref(db, "teachers"),
        orderByChild("name"),
        limitToFirst(limit)
      );
      if (lastKey) {
        teachersQuery = query(
          ref(db, "teachers"),
          orderByChild("name"),
          startAfter(lastKey),
          limitToFirst(limit)
        );
      }
      const snapshot = await get(teachersQuery);
      if (!snapshot.exists()) {
        return { data: [], lastKey: null };
      }
      const data = snapshot.val();
      const teachers = Object.values(data);
      const newLastKey = teachers.length
        ? teachers[teachers.length - 1].name
        : null;
      return { data: teachers, lastKey: newLastKey };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const teachersSlice = createSlice({
  name: "teachers",
  initialState: {
    teachers: [],
    lastKey: null,
    status: "idle",
    error: null,
    filters: {
      language: "",
      level: "",
      priceRange: [0, 100],
    },
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetFilters: (state) => {
      state.filters = { language: "", level: "", priceRange: [0, 100] };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeachers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTeachers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.teachers = [...state.teachers, ...action.payload.data];
        state.lastKey = action.payload.lastKey;
      })
      .addCase(fetchTeachers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { setFilters, resetFilters } = teachersSlice.actions;
export default teachersSlice.reducer;
