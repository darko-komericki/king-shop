import { useState, useEffect } from "react";

export const useProducts = (props) => {
  const { selectedCategory, selectedPrice, sort, search, skip, limit } = props;
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [paginatedProducts, setPaginatedProducts] = useState([]);

  const sortQuery =
    sort !== "default"
      ? `&sortBy=${sort.split("-")[0]}&order=${sort.split("-")[1]}`
      : "";

  const searchQuery = search ? `?q=${search}` : "";

  useEffect(() => {
    let apiUrl = null;

    const productsQuery = () => {
      if (selectedCategory) {
        return `products/category/${selectedCategory}?limit=0`;
      }

      if (searchQuery) {
        return `products/search${searchQuery}`;
      }

      return "products?limit=0";
    };

    apiUrl = `https://dummyjson.com/${productsQuery()}${sortQuery}`;

    const fetchProducts = async () => {
      const response = await fetch(apiUrl);
      const data = await response.json();

      setProducts(data.products);
      setTotalProducts(data.total);
    };

    fetchProducts();
  }, [sortQuery, searchQuery, selectedCategory]);

  useEffect(() => {
    const productsFiltered = selectedPrice
      ? filterByPrice(products, selectedPrice)
      : products;

    setPaginatedProducts(productsFiltered.slice(skip, limit));
    setTotalProducts(productsFiltered.length);
  }, [products, skip, limit, selectedPrice]);

  const filterByPrice = (products, selectedPrice) => {
    const { min, max } = JSON.parse(selectedPrice || "{}");

    return products.filter((product) => {
      if (max === null) return product.price >= min;
      return product.price >= min && product.price <= max;
    });
  };

  return { paginatedProducts, totalProducts };
};
