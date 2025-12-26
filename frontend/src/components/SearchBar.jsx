import { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleClick = () => {
    if (!query.trim()) {
      onSearch(""); // tell parent search is empty
      return;
    }
    onSearch(query);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search with AI"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleClick}>AI Search</button>
    </div>
  );
};

export default SearchBar;
