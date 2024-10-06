import { useRef } from "react";
import priceFormatter from "../../helpers/priceFormatter";
import styles from "./ProductModal.module.scss";

export default function ProductModal(props) {
  const { showDetails, setShowDetails, product, setSelectedProduct, addToCart } = props;

  const dialogRef = useRef(null);

  return (
    <dialog className={styles.modal} ref={dialogRef} open={showDetails}>
      <article className={styles.modalContainer}>
        <header className={styles.header}>
          <button
            aria-label="Close"
            className={styles.toggle}
            onClick={() => {
              setShowDetails(false);
              dialogRef.current.close();
              setSelectedProduct(null);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" />
            </svg>
          </button>
        </header>
        <section className={styles.modalContent}>
          <div className={styles.gallery}>
            {product?.images.map((image, index) => (
              <div className={styles.image} key={`gallery_image_${index}`}>
                <img src={image} alt={`product image ${index}`} />
              </div>
            ))}
          </div>
          <div className={styles.info}>
            <div className={styles.infoCard}>
              <h2 className={styles.title}>{product?.title}</h2>
              <p className={styles.price}>{priceFormatter(product?.price)}</p>
              <p>{product?.description}</p>
              <div className={styles.tags}>
                {product?.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <div className={styles.actions}>
                <button
                  className={styles.addToCart}
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </section>
      </article>
    </dialog>
  );
}
