import styles from "./LoadMoreBtn.module.css";
const LoadMoreBtn = ({ children, onClick, disabled }) => {
  return (
    <button className={styles.LoadBtn} onClick={onClick} disabled={disabled}>
      {children} Load More
    </button>
  );
};

export default LoadMoreBtn;
