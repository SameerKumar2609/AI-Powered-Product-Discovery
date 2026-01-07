import { useParams } from "react-router-dom";
import products from "../data/products";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useState, useEffect } from "react";

const ProductDetails = () => {
  const { id } = useParams();
  const product = products.find(p => p.id === Number(id));

  const { addToCart } = useCart();
  const { addToWishlist, wishlist } = useWishlist();

  // ---------------- REVIEWS STATE ----------------
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState("");

  // Load existing reviews from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("reviews")) || {};
    setReviews(stored[id] || []);
  }, [id]);

  // Save reviews to localStorage whenever reviews change
  const saveReviews = (updatedReviews) => {
    const stored = JSON.parse(localStorage.getItem("reviews")) || {};
    stored[id] = updatedReviews;
    localStorage.setItem("reviews", JSON.stringify(stored));
  };

  const handleAddReview = () => {
    if (!reviewText.trim()) return alert("Review cannot be empty");

    const newReview = {
      text: reviewText,
      date: new Date().toLocaleString(),
    };

    const updated = [...reviews, newReview];
    setReviews(updated);
    saveReviews(updated);

    setReviewText("");
  };

  if (!product) return <p>Product not found</p>;

  const isWishlisted = wishlist.some(item => item.id === product.id);

  return (
    <div style={{ padding: "20px" }}>
      <h2>{product.name}</h2>
      <div style={{ fontSize: "20px", color: "#ffb400" }}>
        {Array.from({ length: 5 }).map((_, index) => (
          <span key={index}>
            {index < Math.round(product.rating) ? "⭐" : "☆"}
          </span>
        ))}
      <span style={{ marginLeft: "6px", color: "black" }}>
        {product.rating} / 5
      </span>
    </div>

      <img src={product.image} alt={product.name} width="200" />
      <p>{product.description}</p>
      <p>Price: ₹{product.price}</p>

      <button onClick={() => addToCart(product)}>
        Add to Cart
      </button>

      <button
        onClick={() => addToWishlist(product)}
        disabled={isWishlisted}
        style={{ marginLeft: "10px" }}
      >
        {isWishlisted ? "Already in Wishlist" : "Add to Wishlist"}
      </button>

      <hr />

      {/* ---------------- REVIEWS UI ---------------- */}
      <h3>Customer Reviews</h3>

      {reviews.length === 0 ? (
        <p>No reviews yet. Be the first!</p>
      ) : (
        reviews.map((r, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ddd",
              padding: "10px",
              margin: "8px 0"
            }}
          >
            <p>{r.text}</p>
            <small>{r.date}</small>
          </div>
        ))
      )}

      <div style={{ marginTop: "10px" }}>
        <textarea
          placeholder="Write your review..."
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          rows="3"
          style={{ width: "100%" }}
        ></textarea>

        <button onClick={handleAddReview} style={{ marginTop: "8px" }}>
          Submit Review
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
