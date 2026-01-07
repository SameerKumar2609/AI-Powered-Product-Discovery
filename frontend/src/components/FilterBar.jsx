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
    <div style={{ marginBottom: "20px" }}>
      <select value={category} onChange={e => setCategory(e.target.value)}>
        <option value="all">All</option>
        <option value="smartphones">Smartphones</option>
        <option value="laptops">Laptops</option>
        <option value="appliances">Appliances</option>
      </select>

      <select value={sort} onChange={e => setSort(e.target.value)}>
        <option value="">Sort by</option>
        <option value="low-high">Price: Low → High</option>
        <option value="high-low">Price: High → Low</option>
      </select>

      <button onClick={applyFilters}>Apply</button>
      <button onClick={clearFilters}>Clear</button>
    </div>
  );
};

export default Filters;
