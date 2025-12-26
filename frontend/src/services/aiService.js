export const fetchAISearch = async (query) => {
  if (!query.trim()) {
    throw new Error("Search query is empty");
  }

  const response = await fetch("http://localhost:5000/api/ai-search", {
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
