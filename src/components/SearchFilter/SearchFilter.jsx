import { useRef } from "react";
import styles from "./SearchFilter.module.scss";

export default function SearchFilter(props) {
  const {
    searchQuery,
    setSearch,
    setSearchQuery,
    resetSearch,
    resetFilters,
    resetPagination,
  } = props;
  const inputRef = useRef(null);

  const onSubmit = (event) => {
    event.preventDefault();
    resetFilters();
    resetPagination();
    setSearch(inputRef.current.value);
  };

  return (
    <div className={styles.filter}>
      <input
        ref={inputRef}
        className={styles.input}
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
        onKeyUp={(event) => {
          event.key === "Enter" && onSubmit(event);
        }}
      />

      {searchQuery && (
        <button className={styles.buttonReset} onClick={() => resetSearch()}>
          <i className="ri-close-large-line"></i>
        </button>
      )}

      <button className={styles.button} onClick={(event) => onSubmit(event)}>
        <i className="ri-search-line"></i>
      </button>
    </div>
  );
}
