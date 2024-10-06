import styles from "./ActiveFilters.module.scss";

export default function ActiveFilters(props) {
  const { resetAllFilters } = props;

  return (
    <div>
      <button className={styles.button} onClick={resetAllFilters}>
        <i className="ri-filter-off-line"></i> Reset filters
      </button>
    </div>
  );
}
