export const selectFavorites = (state) => state.favorites.favorites;
export const selectIsFavorite = (teacherId) => (state) =>
  state.favorites.favorites.some((teacher) => teacher.id === teacherId);
