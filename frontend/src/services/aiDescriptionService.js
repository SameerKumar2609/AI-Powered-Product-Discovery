export const generateDescription = async (name, category) => {
  const response = await fetch(
    "https://ai-powered-product-discovery-production.up.railway.app/api/generate-description",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, category })
    }
  );

  if (!response.ok) {
    throw new Error("AI generation failed");
  }

  return response.json();
};
