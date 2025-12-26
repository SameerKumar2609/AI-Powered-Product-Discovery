export const fetchAISearch = async (query) => {
  if (!query.trim()) {
    throw new Error("Search query is empty");
  }

  const response = await fetch("https://ai-powered-product-discovery.onrender.com/api/ai-search", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "AI request failed");
  }

  return response.json();
};
