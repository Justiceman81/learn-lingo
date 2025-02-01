import { createSlice } from "@reduxjs/toolkit";
import { fetchTeachers } from "./operations";

const INITIAL_STATE = {
  items: [],
  lastVisible: null,
  loading: false,
  error: null,
};

const teachersSlice = createSlice({
  name: "teachers",
  initialState: INITIAL_STATE,
  reducers: {
    resetTeachers: (state) => {
      state.items = [];
      state.lastVisible = null;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchTeachers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTeachers.fulfilled, (state, { payload }) => {
        state.items = [...state.items, ...payload.teachers];
        state.lastVisible = payload.lastVisible;
        state.loading = false;
      })
      .addCase(fetchTeachers.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export const { resetTeachers } = teachersSlice.actions;
export const teachersReducer = teachersSlice.reducer;
