import { useState } from "react";

const ManualSearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <div style={styles.wrapper}>
      <span style={styles.icon}>🔍</span>
      <input
        type="text"
        placeholder="Search for products, brands and categories"
        value={query}
        onChange={handleChange}
        style={styles.input}
      />
    </div>
  );
};

const styles = {
  wrapper: {
    display: "flex",
    alignItems: "center",
    maxWidth: "600px",
    margin: "20px auto",
    padding: "10px 14px",
    borderRadius: "999px",
    border: "1px solid #ddd",
    boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
    backgroundColor: "#fff"
  },
  icon: {
    fontSize: "20px",
    marginRight: "10px",
    color: "#666"
  },
  input: {
    border: "none",
    outline: "none",
    fontSize: "16px",
    width: "100%",
    background: "transparent"
  }
};

export default ManualSearchBar;
