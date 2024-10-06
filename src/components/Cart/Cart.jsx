import { useEffect } from "react";
import styles from "./Cart.module.scss";
import priceFormatter from "../../helpers/priceFormatter";

export default function Cart(props) {
  const { cart, removeFromCart, updateQuantity, setCartOpen } = props;

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setCartOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      <div className={styles.overlay} onClick={() => setCartOpen(false)}></div>
      <div className={styles.cart}>
        <div className={styles.header}>
          <h2>Shopping Cart</h2>
          <button className={styles.close} onClick={() => setCartOpen(false)}>
            <i className="ri-close-large-line"></i>
          </button>
        </div>
        <div className={styles.cartItems}>
          {cart.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <ul>
              {cart.map((item) => (
                <li className={styles.item} key={item.id}>
                  <div className={styles.itemImage}>
                    <img src={item.thumbnail} alt={item.title} />
                  </div>
                  <div className={styles.itemDetails}>
                    <h4>{item.title}</h4>
                    <p>{priceFormatter(item.price)}</p>
                    <div className={styles.itemActions}>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) =>
                          updateQuantity(item.id, parseInt(e.target.value))
                        }
                      />
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className={styles.itemRemove}
                      >
                        <i className="ri-delete-bin-line"></i>{" "}
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
