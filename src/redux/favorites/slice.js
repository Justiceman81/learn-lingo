import { createSlice } from "@reduxjs/toolkit";
import { addFavorite, removeFavorite } from "./operations";

const INITIAL_STATE = {
  items: [],
  error: null,
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: INITIAL_STATE,
  reducers: {
    setFavorites: (state, { payload }) => {
      state.items = payload;
    },
    resetFavorites: (state) => {
      state.items = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addFavorite.rejected, (state, { payload }) => {
        state.error = payload;
      })
      .addCase(removeFavorite.rejected, (state, { payload }) => {
        state.error = payload;
      });
  },
});

export const { setFavorites, resetFavorites } = favoritesSlice.actions;
export const favoritesReducer = favoritesSlice.reducer;
