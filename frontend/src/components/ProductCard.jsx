import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";


const ProductCard = ({ product }) => {
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const isWishlisted = wishlist.some(item => item.id === product.id);

  const handleWishlist = () => {
    isWishlisted
      ? removeFromWishlist(product.id)
      : addToWishlist(product);
  };

  return (
    <div style={styles.card}>
      {/* Image */}
      <div style={styles.imageBox}>
        <img src={product.image} alt={product.name} style={styles.img} />
        <button style={styles.wishlistBtn}  onClick={() => {
          handleWishlist();
          showToast(
           isWishlisted ? "❌ Removed from wishlist" : "❤️ Added to wishlist"
          );
         }}
        >
          {isWishlisted ? "❤️" : "🤍"}
        </button>
      </div>

      {/* Content */}
      <div style={styles.content}>
        <h3 style={styles.title}>{product.name}</h3>

        {/* Rating */}
        <div style={styles.rating}>
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i}>
              {i < Math.round(product.rating) ? "⭐" : "☆"}
            </span>
          ))}
          <span style={styles.ratingText}>({product.rating})</span>
        </div>

        <p style={styles.price}>₹{product.price}</p>

        {/* Actions */}
        <div style={styles.actions}>
          <button
           style={styles.cartBtn}
           onClick={() => {
             addToCart(product);
             showToast("🛒 Added to cart");
            }}
          >
            Add to Cart
          </button>

          <Link to={`/product/${product.id}`} style={styles.detailsBtn}>
            View
          </Link>
        </div>
      </div>
    </div>
  );
};

const styles = {
  card: {
    background: "#fff",
    borderRadius: "14px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
    overflow: "hidden",
    transition: "transform 0.25s ease, box-shadow 0.25s ease",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
    objectFit: "contain"
  },

  imageBox: {
    position: "relative",
    background: "#f7f7f7",
    padding: "20px"
  },

  img: {
    width: "100%",
    height: "180px",
    objectFit: "contain"
  },

  wishlistBtn: {
    position: "absolute",
    top: "12px",
    right: "12px",
    border: "none",
    background: "#fff",
    borderRadius: "50%",
    fontSize: "20px",
    cursor: "pointer",
    padding: "6px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.2)"
  },

  content: {
    padding: "16px",
    textAlign: "center"
  },

  title: {
    fontSize: "18px",
    marginBottom: "6px"
  },

  rating: {
    color: "#ffb400",
    fontSize: "16px"
  },

  ratingText: {
    marginLeft: "6px",
    color: "#555",
    fontSize: "14px"
  },

  price: {
    fontSize: "20px",
    fontWeight: "bold",
    margin: "10px 0"
  },

  actions: {
    display: "flex",
    gap: "10px",
    justifyContent: "center"
  },

  cartBtn: {
    flex: 1,
    padding: "10px",
    background: "black",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold"
  },

  detailsBtn: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    textDecoration: "none",
    color: "#333",
    fontWeight: "bold"
  }
};

export default ProductCard;
