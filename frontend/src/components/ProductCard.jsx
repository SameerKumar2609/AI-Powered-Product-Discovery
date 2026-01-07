import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";

const ProductCard = ({ product }) => {
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  

  // Check if product already in wishlist
  const isWishlisted = wishlist.some(item => item.id === product.id);

  const handleWishlist = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div style={styles.card}>
      <img src={product.image} alt={product.name} style={styles.img} />

      <h3>{product.name}</h3>
        <div style={styles.rating}>
          {Array.from({ length: 5 }).map((_, index) => (
            <span key={index}>
              {index < Math.round(product.rating) ? "⭐" : "☆"}
            </span>
          ))}
          <span style={{ marginLeft: "6px" }}>({product.rating})</span>
        </div>
      <p style={{ fontWeight: "bold" }}>₹{product.price}</p>

      <div style={styles.row}>
        <Link to={`/product/${product.id}`} style={styles.btn}>
          View Details
        </Link>

        <button style={styles.wish}
          onClick={handleWishlist}
        >
          {isWishlisted ? "❤️" : "🤍"}
        </button>
      </div>
    </div>
  );
};

  const styles = {
    card: {
      border: "1px solid #ddd",
      borderRadius: "10px",
      padding: "16px",
      textAlign: "center",
      boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
    },
    img: {
      width: "100%",
      height: "180px",
      objectFit: "cover",
      borderRadius: "8px"
    },
    row: {
      display: "flex",
      justifyContent: "space-between",
      marginTop: "10px"
    },
    btn: {
      background: "black",
      color: "white",
      padding: "8px 12px",
      borderRadius: "5px",
      textDecoration: "none"
    },
    wish: {
      border: "none",
      background: "transparent",
      fontSize: "24px",
      cursor: "pointer"
    }
  };

export default ProductCard;
