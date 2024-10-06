import excerptLimiter from "../../helpers/excerptLimiter";
import priceFormatter from "../../helpers/priceFormatter";
import styles from "./ProductCard.module.scss";

export default function ProductCard(props) {
  const { product, selectProduct, showDetails } = props;

  return (
    <div className={styles.card}>
      <div className={styles.thumbnail}>
        <img src={product.thumbnail} alt={product.title} loading="lazy" />
      </div>
      <h3 className={styles.title}>{product.title}</h3>
      <p className={styles.excerpt}>{excerptLimiter(product.description)}</p>
      <div className={styles.actions}>
        <p className={styles.price}>{priceFormatter(product.price)}</p>
        <button
          className={styles.button}
          onClick={() => {
            selectProduct(product);
            showDetails(true);
          }}
        >
          Details
        </button>
      </div>
    </div>
  );
}
