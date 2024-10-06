import SearchFilter from "../SearchFilter/SearchFilter";
import logo from "../../assets/logo.svg";
import styles from "./PageHeader.module.scss";

export default function PageHeader(props) {
  const {
    search,
    setSearch,
    setCartOpen,
    searchQuery,
    setSearchQuery,
    resetFilters,
    resetSearch,
    resetPagination,
  } = props;

  return (
    <header className={styles.header}>
      <div className={styles.headerLeft}>
        <h1 className={styles.logo}>
          <img src={logo} alt="Logo" />
        </h1>
      </div>

      <div className={styles.headerCenter}>
        <SearchFilter
          search={search}
          setSearch={setSearch}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          resetFilters={resetFilters}
          resetSearch={resetSearch}
          resetPagination={resetPagination}
        />
      </div>

      <div className={styles.headerRight}>
        <button className={styles.cartOpen} onClick={() => setCartOpen(true)}>
          <i className="ri-shopping-cart-line"></i>
        </button>
      </div>
    </header>
  );
}
