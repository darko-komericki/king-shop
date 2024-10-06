import ProductCard from "../ProductCard";
import styles from "./ProductList.module.scss";

export default function ProductList(props) {
  const { products, selectProduct, showDetails } = props;

  return (
    <>
      <div className={styles.grid}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            selectProduct={selectProduct}
            showDetails={showDetails}
          />
        ))}
      </div>
    </>
  );
}
