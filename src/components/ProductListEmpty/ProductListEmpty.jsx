import styles from "./ProductListEmpty.module.scss";

export default function ProductListEmpty() {
  return (
    <div className={styles.notFound}>
      <i style={{fontSize: "36px", lineHeight: "36px"}} className="ri-emotion-sad-line"></i>
      <h2>No products found</h2>
    </div>
  );
}
