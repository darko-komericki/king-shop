import { useRef, useEffect } from "react";
import priceFormatter from "../../helpers/priceFormatter";
import styles from "./ProductModal.module.scss";

export default function ProductModal(props) {
  const {
    showDetails,
    setShowDetails,
    product,
    setSelectedProduct,
    addToCart,
  } = props;

  const dialogRef = useRef(null);

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setShowDetails(false);
      dialogRef.current.close();
      setSelectedProduct(null);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <dialog className={styles.modal} ref={dialogRef} open={showDetails}>
      <article className={styles.modalContainer}>
        <header className={styles.header}>
          <button
            aria-label="Close"
            className={styles.close}
            onClick={() => {
              setShowDetails(false);
              dialogRef.current.close();
              setSelectedProduct(null);
            }}
          >
            <i className="ri-close-large-line"></i>
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
