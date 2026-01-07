import { useState } from "react";
import products from "../data/products";
import ProductList from "../components/ProductList";
import SearchBar from "../components/SearchBar";
import { fetchAISearch } from "../services/aiService";
import Filters from "../components/FilterBar";


const Home = () => {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFilter = ({ category, sort }) => {
  let result = [...products];

  if (category !== "all") {
    result = result.filter(p => p.category === category);
  }

  if (sort === "low-high") {
    result.sort((a, b) => a.price - b.price);
  }

  if (sort === "high-low") {
    result.sort((a, b) => b.price - a.price);
  }

  setFilteredProducts(result);
};



  const handleAISearch = async (query) => {
    // 🔹 Case 1: Empty search
    if (!query || query.trim() === "") {
      setError("Please enter something to search");
      setFilteredProducts(products);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const aiResult = await fetchAISearch(query);
      
      let result = [];
      

      // 🔹 Apply AI filters
      if (aiResult.category !== "all") {
        result = products.filter(
          (p) =>
            p.category === aiResult.category
        );
      }
      
      // 🔹 Case 2: No matches found
      if (result.length === 0) {
        
        setFilteredProducts([]); // ✅ IMPORTANT
        setError("No products match your search");
      } else {
        setFilteredProducts(result);
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* AI Search */}
      <SearchBar onSearch={handleAISearch} />

      {/* Loading */}
      {loading && <p>Searching products...</p>}

      {/* Error / Empty State */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Filters */}
      <Filters onFilter={handleFilter} />


      {/* Product List */}
      {!loading && filteredProducts.length > 0 && (
        <ProductList products={filteredProducts} />
      )}
    </>
  );
};

export default Home;
