import { createSlice } from "@reduxjs/toolkit";
import {
  addToFavoritesDB,
  removeFromFavoritesDB,
  fetchFavoritesDB,
} from "./operations.js";

const initialState = {
  favorites: [],
  status: "idle",
  error: null,
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavoritesDB.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFavoritesDB.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.favorites = action.payload;
      })
      .addCase(fetchFavoritesDB.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(addToFavoritesDB.fulfilled, (state, action) => {
        if (
          !state.favorites.some((teacher) => teacher.id === action.payload.id)
        ) {
          state.favorites.push(action.payload);
        }
      })
      .addCase(removeFromFavoritesDB.fulfilled, (state, action) => {
        state.favorites = state.favorites.filter(
          (teacher) => teacher.id !== action.payload
        );
      });
  },
});

export const favoritesReducer = favoritesSlice.reducer;
