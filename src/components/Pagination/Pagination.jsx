import styles from "./Pagination.module.scss";
import cn from "classnames";

export default function Pagination(props) {
  const { currentPage, totalPages, onPageChange } = props;

  const renderPageNumbers = () => {
    const pageNumbers = [];

    if (currentPage > 3) {
      pageNumbers.push(
        <button
          key={1}
          onClick={() => onPageChange(1)}
          className={cn(styles.button, { [styles.active]: currentPage === 1 })}
        >
          1
        </button>,
      );

      if (currentPage > 4) {
        pageNumbers.push(
          <span key="start-ellipsis" className={styles.ellipsis}>
            ...
          </span>,
        );
      }
    }

    for (
      let i = Math.max(1, currentPage - 2);
      i <= Math.min(totalPages, currentPage + 2);
      i++
    ) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={cn(styles.button, { [styles.active]: currentPage === i })}
        >
          {i}
        </button>,
      );
    }

    if (currentPage < totalPages - 2) {
      if (currentPage < totalPages - 3) {
        pageNumbers.push(
          <span key="end-ellipsis" className={styles.ellipsis}>
            ...
          </span>,
        );
      }

      pageNumbers.push(
        <button
          key={totalPages}
          onClick={() => onPageChange(totalPages)}
          className={cn(styles.button, {
            [styles.active]: currentPage === totalPages,
          })}
        >
          {totalPages}
        </button>,
      );
    }

    return pageNumbers;
  };

  return (
    <div className={styles.pagination}>
      <button
        className={cn(styles.iconButton, styles.button)}
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
      >
        <i className="ri-skip-left-line"></i>
      </button>
      <button
        className={cn(styles.iconButton, styles.button)}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <i className="ri-arrow-left-s-line"></i>
      </button>

      {renderPageNumbers()}

      <button
        className={cn(styles.iconButton, styles.button)}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <i className="ri-arrow-right-s-line"></i>
      </button>
      <button
        className={cn(styles.iconButton, styles.button)}
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
      >
        <i className="ri-skip-right-line"></i>
      </button>
    </div>
  );
}
