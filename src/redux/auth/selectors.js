import { createSelector } from "@reduxjs/toolkit";

export const selectUser = (state) => state.user;
export const selectUserEmail = (state) => state.user.email;
export const selectUserToken = (state) => state.user.token;
export const selectUserId = (state) => state.user.id;
export const selectUserLikes = (state) => state.user.likes;
export const selectIsAuthenticated = createSelector(
  [selectUserToken],
  (token) => Boolean(token)
);
