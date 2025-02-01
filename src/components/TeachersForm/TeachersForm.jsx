import { useDispatch, useSelector } from "react-redux";
import { setFilters, resetFilters } from "../../redux/filters/slice";
import { selectFilters } from "../../redux/filters/selectors";
import { fetchTeachers } from "../../redux/teachers/operations";
import clsx from "clsx";
import styles from "./TeachersForm.module.css";

const TeachersForm = () => {
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);

  const handleChange = (event) => {
    const { name, value } = event.target;
    dispatch(setFilters({ [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(fetchTeachers({ startAfter: null, limit: 4, filters }));
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {/* Language Filter */}
      <div className={styles.filterBox}>
        <label className={styles.label} htmlFor="language">
          Languages
        </label>
        <select
          name="language"
          id="language"
          className={clsx(styles.select)}
          value={filters.language}
          onChange={handleChange}
        >
          <option value="">All languages</option>
          <option value="English">English</option>
          <option value="Spanish">Spanish</option>
          <option value="French">French</option>
        </select>
      </div>

      {/* Rating Filter */}
      <div className={styles.filterBox}>
        <label className={styles.label} htmlFor="minRating">
          Minimum Rating
        </label>
        <select
          name="minRating"
          id="minRating"
          className={clsx(styles.select)}
          value={filters.minRating}
          onChange={handleChange}
        >
          <option value="0">Any</option>
          <option value="3">3+ stars</option>
          <option value="4">4+ stars</option>
          <option value="5">5 stars</option>
        </select>
      </div>

      {/* Price Filter */}
      <div className={styles.filterBox}>
        <label className={styles.label} htmlFor="maxPrice">
          Max Price
        </label>
        <select
          name="maxPrice"
          id="maxPrice"
          className={clsx(styles.select)}
          value={filters.maxPrice}
          onChange={handleChange}
        >
          <option value="100">Any price</option>
          <option value="10">$10/hour</option>
          <option value="20">$20/hour</option>
          <option value="30">$30/hour</option>
        </select>
      </div>

      {/* Buttons */}
      <div className={styles.buttonBox}>
        <button className={styles.submitButton} type="submit">
          Search
        </button>
        <button
          type="button"
          className={styles.resetButton}
          onClick={() => dispatch(resetFilters())}
        >
          Reset Filters
        </button>
      </div>
    </form>
  );
};

export default TeachersForm;
