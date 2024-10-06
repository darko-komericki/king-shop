import { useState, useEffect } from "react";
import { useProducts } from "./hooks/useProducts";
import { useCart } from "./hooks/useCart";
import priceFormatter from "./helpers/priceFormatter";
import styles from "./App.module.scss";

import ProductList from "./components/ProductList";
import SimpleFilter from "./components/SimpleFilter";
import ProductModal from "./components/ProductModal";
import PageHeader from "./components/PageHeader";
import ProductListEmpty from "./components/ProductListEmpty";
import SortFilter from "./components/SortFilter";
import ActiveFilters from "./components/ActiveFilters";
import Cart from "./components/Cart";
import Pagination from "./components/Pagination";

const PRICE_RANGES = [
  {
    value: '{"min": 0, "max": 50}',
    label: `${priceFormatter(0)} - ${priceFormatter(50)}`,
  },
  {
    value: '{"min": 50, "max": 100}',
    label: `${priceFormatter(50)} - ${priceFormatter(100)}`,
  },
  { value: '{"min": 100, "max": null}', label: `${priceFormatter(100)} ...` },
];

const ITEMS_PER_PAGE = 21;

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [sort, setSort] = useState("default");
  const [categories, setCategories] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [search, setSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(ITEMS_PER_PAGE);
  const [totalPages, setTotalPages] = useState(0);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(0);

  const { paginatedProducts, totalProducts } = useProducts({
    selectedCategory,
    selectedPrice,
    sort,
    search,
    setSearch,
    skip,
    limit,
  });

  const {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    setCartOpen,
    cartOpen,
  } = useCart({
    setShowDetails,
  });

  useEffect(() => {
    fetch("https://dummyjson.com/products/categories")
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
      });
  }, []);

  useEffect(() => {
    setTotalPages(Math.ceil(totalProducts / itemsPerPage));
  }, [totalProducts, itemsPerPage]);

  useEffect(() => {
    setSkip((currentPage - 1) * itemsPerPage);
    setLimit(skip + itemsPerPage);
  }, [currentPage, itemsPerPage, skip]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleSimpleFilter = (category) => {
    resetPagination();
    setSelectedCategory(category);
  };

  const resetAllFilters = () => {
    setSelectedCategory(null);
    setSelectedPrice(null);
    setSort("default");
    setSearch("");
    setSearchQuery("");
  };

  const resetFilters = () => {
    setSelectedCategory(null);
    setSelectedPrice(null);
    setSort("default");
  };

  const resetSearch = () => {
    setSearch("");
    setSearchQuery("");
  };

  const resetPagination = () => {
    setCurrentPage(1);
    setItemsPerPage(ITEMS_PER_PAGE);
    setTotalPages(Math.ceil(totalProducts / itemsPerPage));
    setSkip((currentPage - 1) * itemsPerPage);
    setLimit(skip + itemsPerPage);
  };

  return (
    <>
      <div className={styles.container}>
        <PageHeader
          search={search}
          setSearch={setSearch}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setCartOpen={setCartOpen}
          resetFilters={resetFilters}
          resetSearch={resetSearch}
          resetPagination={resetPagination}
        />

        <div className={styles.layout}>
          <aside className={styles.filters}>
            <SimpleFilter
              title="Categories"
              items={categories.map((category) => ({
                value: category.slug,
                label: category.name,
              }))}
              selectedItem={selectedCategory}
              setSelectedItem={handleSimpleFilter}
            />
            <SimpleFilter
              title="Price"
              items={PRICE_RANGES}
              selectedItem={selectedPrice}
              setSelectedItem={setSelectedPrice}
            />
          </aside>
          <main className={styles.content}>
            <div className={styles.topFilters}>
              <SortFilter currentSort={sort} setSort={setSort} />

              {(selectedCategory !== null ||
                selectedPrice !== null ||
                sort !== "default" ||
                search !== "") && (
                <ActiveFilters resetAllFilters={resetAllFilters} />
              )}
            </div>

            {paginatedProducts.length === 0 && <ProductListEmpty />}

            <ProductList
              products={paginatedProducts}
              selectProduct={setSelectedProduct}
              showDetails={setShowDetails}
            />

            {(paginatedProducts.length !== 0 && totalPages > 1) && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </main>
        </div>
      </div>
      <ProductModal
        showDetails={showDetails}
        setShowDetails={setShowDetails}
        product={selectedProduct}
        setSelectedProduct={setSelectedProduct}
        addToCart={addToCart}
      />

      {cartOpen && (
        <Cart
          cart={cart}
          removeFromCart={removeFromCart}
          updateQuantity={updateQuantity}
          setCartOpen={setCartOpen}
        />
      )}
    </>
  );
}

export default App;
