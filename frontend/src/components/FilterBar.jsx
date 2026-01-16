import { useState } from "react";

const Filters = ({ onFilter }) => {
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("");

  const applyFilters = () => {
    onFilter({ category, sort });
  };

  const clearFilters = () => {
    setCategory("all");
    setSort("");
    onFilter({ category: "all", sort: "" });
  };

  return (
    <div style={styles.wrapper}>
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        style={styles.select}
      >
        <option value="all">All Categories</option>
        <option value="smartphone">Smartphones</option>
        <option value="laptop">Laptops</option>
        <option value="watch">Watches</option>
        <option value="headphone">Headphones</option>
      </select>

      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        style={styles.select}
      >
        <option value="">Sort By</option>
        <option value="low-high">Price: Low → High</option>
        <option value="high-low">Price: High → Low</option>
      </select>

      <button style={styles.applyBtn} onClick={applyFilters}>
        Apply
      </button>

      <button style={styles.clearBtn} onClick={clearFilters}>
        Clear
      </button>
    </div>
  );
};

const styles = {
  wrapper: {
    display: "flex",
    justifyContent: "center",
    gap: "12px",
    flexWrap: "wrap",
    padding: "14px 16px",
    maxWidth: "700px",
    margin: "20px auto",
    borderRadius: "999px",
    background: "#fff",
    boxShadow: "0 4px 10px rgba(0,0,0,0.08)"
  },
  select: {
    padding: "8px 12px",
    borderRadius: "999px",
    border: "1px solid #ddd",
    fontSize: "14px",
    outline: "none",
    cursor: "pointer"
  },
  applyBtn: {
    padding: "8px 16px",
    borderRadius: "999px",
    border: "none",
    background: "black",
    color: "white",
    fontSize: "14px",
    cursor: "pointer"
  },
  clearBtn: {
    padding: "8px 16px",
    borderRadius: "999px",
    border: "1px solid #ccc",
    background: "#f5f5f5",
    fontSize: "14px",
    cursor: "pointer"
  }
};

export default Filters;
