import { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div style={styles.container}>
      <div style={styles.inputWrapper}>
        <span style={styles.icon}>🤖</span>
        <input
          type="text"
          placeholder="Ask AI to find the best products for you..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={styles.input}
        />
      </div>

      <button style={styles.button} onClick={handleSearch}>
        AI Search
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    gap: "12px",
    margin: "10px auto 30px",
    maxWidth: "700px",
    padding: "0 10px"
  },
  inputWrapper: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    padding: "10px 14px",
    borderRadius: "999px",
    border: "1px solid #ddd",
    background: "#fff",
    boxShadow: "0 4px 10px rgba(0,0,0,0.08)"
  },
  icon: {
    fontSize: "20px",
    marginRight: "10px"
  },
  input: {
    border: "none",
    outline: "none",
    width: "100%",
    fontSize: "16px"
  },
  button: {
    padding: "10px 20px",
    borderRadius: "999px",
    border: "none",
    fontSize: "15px",
    fontWeight: "bold",
    cursor: "pointer",
    color: "white",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    boxShadow: "0 4px 10px rgba(0,0,0,0.15)"
  }
};

export default SearchBar;
