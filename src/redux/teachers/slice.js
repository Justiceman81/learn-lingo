import { createSlice } from "@reduxjs/toolkit";
import { getTeachers } from "../teachers/operations.js";

const INITIAL_STATE = {
  items: [],
  loading: false,
  error: null,
  lastVisible: null,
  filters: {
    languages: null,
    levels: null,
    price_per_hour: null,
  },
  hasMore: true,
};

const teachersSlice = createSlice({
  name: "teachers",
  initialState: INITIAL_STATE,
  reducers: {
    setFilters: (state, action) => {
      state.filters = action.payload;
    },
    setClear: (state) => {
      state.items = [];
      state.lastVisible = null;
      state.hasMore = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTeachers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTeachers.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.lastVisible = action.payload.lastVisible;

        if (state.items.length === 0) {
          state.items = action.payload.teachers;
        } else {
          const newTeachers = action.payload.teachers.filter(
            (teacher) => !state.items.some((item) => item.id === teacher.id)
          );
          state.items = [...state.items, ...newTeachers];
        }
        state.hasMore = action.payload.hasNextPage;
      })
      .addCase(getTeachers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setFilters, setClear } = teachersSlice.actions;
export const teachersReducer = teachersSlice.reducer;
