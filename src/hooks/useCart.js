import { useState, useEffect } from "react";

export const useCart = (props) => {
  const { setShowDetails } = props;
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      setShowDetails(false);

      const isProductInCart = prevCart.find((item) => item.id === product.id);

      if (isProductInCart) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...prevCart, { ...product, quantity: 1 }];
    });

    setCartOpen(true);
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity } : item,
      ),
    );
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    setCartOpen,
    cartOpen,
  };
};
