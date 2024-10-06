import { useRef } from "react";
import styles from "./SortFilter.module.scss";

export default function SortFilter(props) {
  const { currentSort, setSort } = props;

  const optionRefs = useRef([]);

  const onSortChange = (value) => {
    const selectedOption = optionRefs.current.find((element) => element.value === value);
    setSort(selectedOption.value);
  };

  const filters = [
    { label: "Sort by default", value: "default" },
    {
      label: "Alphabetically A-Z",
      value: "title-asc",
    },
    {
      label: "Alphabetically Z-A",
      value: "title-desc",
    },
    {
      label: "Price low to high",
      value: "price-asc",
    },
    {
      label: "Price high to low",
      value: "price-desc",
    },
  ];

  return (
    <div className={styles.filters}>
      <select
        className={styles.select}
        value={currentSort}
        onChange={(event) => onSortChange(event.target.value)}
      >
        {filters.map((filter, index) => (
          <option
            key={`sort_${index}`}
            value={filter.value}
            ref={(element) => (optionRefs.current[index] = element)}
          >
            {filter.label}
          </option>
        ))}
      </select>
    </div>
  );
}
