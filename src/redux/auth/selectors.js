export const selectUser = (state) => state?.auth?.user || null;
export const selectIsAuthenticated = (state) =>
  Boolean(state?.auth?.user?.token);
export const selectAuthError = (state) => state.auth.error;
export const selectAuthIsLoading = (state) => state.auth.isLoading;
