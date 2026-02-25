import { useState, useEffect } from "react";
import { useProducts } from "../context/ProductContext";
import ProductList from "../components/ProductList";
import Filters from "../components/FilterBar";
import ManualSearchBar from "../components/ManualSearchBar";

const Home = () => {
  const { products } = useProducts();

  const [filteredProducts, setFilteredProducts] = useState([]);

  // Sync when products change (Admin adds/deletes)
  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  /* ---------- FILTER + SORT ---------- */
  const handleFilter = ({ category, sort }) => {
    let result = [...products];

    if (category !== "all") {
      result = result.filter(p => p.category === category);
    }

    if (sort === "low-high") {
      result.sort((a, b) => Number(a.price) - Number(b.price));
    }

    if (sort === "high-low") {
      result.sort((a, b) => Number(b.price) - Number(a.price));
    }

    setFilteredProducts(result);
  };

  /* ---------- MANUAL SEARCH ---------- */
  const handleManualSearch = (text) => {
    if (!text || text.trim() === "") {
      setFilteredProducts(products);
      return;
    }

    const query = text.toLowerCase();

    const result = products.filter(
      p =>
        p.name.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
    );

    setFilteredProducts(result);
  };

  return (
    <>
      {/* Manual Search */}
      <ManualSearchBar onSearch={handleManualSearch} />

      {/* Filters */}
      <Filters onFilter={handleFilter} />

      {/* Empty State */}
      {filteredProducts.length === 0 ? (
        <p style={{ textAlign: "center", marginTop: "20px" }}>
          No products found
        </p>
      ) : (
        <ProductList products={filteredProducts} />
      )}
    </>
  );
};

export default Home;
