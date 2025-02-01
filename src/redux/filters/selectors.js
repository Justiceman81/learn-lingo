export const selectFilters = (state) => state.filters;
export const selectFilteredTeachers = (state) => {
  const { teachers } = state.teachers;
  const { languages, levels, price_per_hour } = state.filters;

  return teachers.filter((teacher) => {
    return (
      teacher.languages.includes(languages) &&
      teacher.levels.includes(levels) &&
      teacher.price_per_hour <= Number(price_per_hour)
    );
  });
};
