const STORAGE_KEY = "reviews";

export const getReviews = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : {};
};

export const saveReview = (productId, review) => {
  const existing = getReviews();

  const productReviews = existing[productId] || [];
  const updated = {
    ...existing,
    [productId]: [...productReviews, review],
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};

export const getReviewsForProduct = (productId) => {
  const data = getReviews();
  return data[productId] || [];
};
