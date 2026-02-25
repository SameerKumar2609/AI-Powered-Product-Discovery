import { useParams } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useState, useEffect } from "react";

const ProductDetails = () => {
  const { id } = useParams();
  const { products } = useProducts();
  const { addToCart } = useCart();
  const { addToWishlist, wishlist } = useWishlist();

  const product = products.find(p => p.id === Number(id));

  /* ---------------- REVIEWS STATE ---------------- */
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState("");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("reviews")) || {};
    setReviews(stored[id] || []);
  }, [id]);

  const saveReviews = (updatedReviews) => {
    const stored = JSON.parse(localStorage.getItem("reviews")) || {};
    stored[id] = updatedReviews;
    localStorage.setItem("reviews", JSON.stringify(stored));
  };

  const handleAddReview = () => {
    if (!reviewText.trim()) return alert("Review cannot be empty");

    const newReview = {
      text: reviewText,
      date: new Date().toLocaleString()
    };

    const updated = [...reviews, newReview];
    setReviews(updated);
    saveReviews(updated);
    setReviewText("");
  };

  if (!product) {
    return (
      <h2 style={{ textAlign: "center", marginTop: "40px" }}>
        Product not found
      </h2>
    );
  }

  const isWishlisted = wishlist.some(item => item.id === product.id);

  return (
    <div style={styles.container}>
      {/* LEFT SECTION */}
      <div style={styles.imageSection}>
        <img
          src={product.image}
          alt={product.name}
          style={styles.image}
        />
      </div>

      {/* RIGHT SECTION */}
      <div style={styles.detailsSection}>
        <h2>{product.name}</h2>

        {/* Rating UI */}
        <div style={styles.rating}>
          {Array.from({ length: 5 }).map((_, index) => (
            <span key={index}>
              {index < Math.round(product.rating) ? "⭐" : "☆"}
            </span>
          ))}
          <span style={{ marginLeft: "6px", color: "black" }}>
            {product.rating} / 5
          </span>
        </div>

        <p style={styles.price}>₹{product.price}</p>

        {/* AI Description */}
        <h3>Description</h3>

        {product.description ? (
          <div style={styles.description}>
            {product.description.split("\n").map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
        ) : (
          <p style={{ color: "gray" }}>
            No description available.
          </p>
        )}

        {/* ACTION BUTTONS */}
        <div style={styles.buttonRow}>
          <button
            style={styles.cartBtn}
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>

          <button
            style={styles.wishBtn}
            onClick={() => addToWishlist(product)}
            disabled={isWishlisted}
          >
            {isWishlisted ? "In Wishlist ❤️" : "Add to Wishlist"}
          </button>
        </div>

        <hr style={{ margin: "20px 0" }} />

        {/* REVIEWS */}
        <h3>Customer Reviews</h3>

        {reviews.length === 0 ? (
          <p>No reviews yet. Be the first!</p>
        ) : (
          reviews.map((r, index) => (
            <div key={index} style={styles.reviewBox}>
              <p>{r.text}</p>
              <small>{r.date}</small>
            </div>
          ))
        )}

        {/* ADD REVIEW */}
        <textarea
          placeholder="Write your review..."
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          rows="3"
          style={styles.textarea}
        />

        <button
          onClick={handleAddReview}
          style={styles.reviewBtn}
        >
          Submit Review
        </button>
      </div>
    </div>
  );
};

/* ---------- STYLES ---------- */
const styles = {
  container: {
    display: "flex",
    gap: "40px",
    padding: "40px",
    flexWrap: "wrap"
  },

  imageSection: {
    flex: "1"
  },

  image: {
    width: "100%",
    maxWidth: "400px",
    objectFit: "contain"
  },

  detailsSection: {
    flex: "1",
    minWidth: "300px"
  },

  price: {
    fontSize: "22px",
    fontWeight: "bold"
  },

  rating: {
    fontSize: "18px",
    color: "#ffb400",
    marginBottom: "10px"
  },

  description: {
    lineHeight: "1.6",
    marginBottom: "15px"
  },

  buttonRow: {
    display: "flex",
    gap: "10px",
    marginTop: "10px"
  },

  cartBtn: {
    padding: "10px 16px",
    background: "black",
    color: "white",
    border: "none",
    cursor: "pointer"
  },

  wishBtn: {
    padding: "10px 16px",
    background: "#ff4d4f",
    color: "white",
    border: "none",
    cursor: "pointer"
  },

  reviewBox: {
    border: "1px solid #ddd",
    padding: "10px",
    margin: "8px 0"
  },

  textarea: {
    width: "100%",
    marginTop: "10px",
    padding: "8px"
  },

  reviewBtn: {
    marginTop: "8px",
    padding: "8px 14px",
    background: "#4c6ef5",
    color: "white",
    border: "none",
    cursor: "pointer"
  }
};

export default ProductDetails;
