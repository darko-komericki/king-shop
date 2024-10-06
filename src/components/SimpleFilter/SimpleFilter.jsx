import { useRef } from "react";
import cn from "classnames";
import styles from "./SimpleFilter.module.scss";

export default function SimpleFilter(props) {
  const { title, items, selectedItem, setSelectedItem } = props;

  const filterRefs = useRef([]);

  const setFilter = (index) => {
    setSelectedItem(filterRefs.current[index].dataset.value);
  };

  return (
    <div className={styles.filters}>
      <h2 className={styles.heading}>{title}</h2>
      {items.map((item, index) => (
        <button
          key={item.value}
          className={cn(styles.filter, {
            [styles.active]: selectedItem === item.value,
          })}
          type="button"
          data-value={item.value}
          ref={(element) => (filterRefs.current[index] = element)}
          onClick={() => setFilter(index)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
