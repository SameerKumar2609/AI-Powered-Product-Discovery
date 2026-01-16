import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

const Navbar = () => {
  const { cart } = useCart();
  const { wishlist } = useWishlist();

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav style={styles.navbar}>
      {/* Logo */}
      <h2 style={styles.logo}>
        AI Product Discovery
      </h2>

      {/* Links */}
      <div style={styles.links}>
        <Link to="/" style={styles.link}>Home</Link>

        <Link to="/cart" style={styles.link}>
          Cart
          <span style={styles.badge}>{cartCount}</span>
        </Link>

        <Link to="/wishlist" style={styles.link}>
          Wishlist
          <span style={styles.badge}>{wishlist.length}</span>
        </Link>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    position: "sticky",
    top: 0,
    zIndex: 1000,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "14px 40px",
    background: "linear-gradient(135deg, #0f0f0f, #1c1c1c)",
    color: "white",
    boxShadow: "0 4px 12px rgba(0,0,0,0.4)"
  },

  logo: {
    fontSize: "22px",
    fontWeight: "bold",
    letterSpacing: "0.5px"
  },

  links: {
    display: "flex",
    alignItems: "center",
    gap: "28px"
  },

  link: {
    position: "relative",
    color: "white",
    textDecoration: "none",
    fontSize: "16px",
    fontWeight: "500"
  },

  badge: {
    marginLeft: "6px",
    background: "#ff4d4f",
    borderRadius: "999px",
    padding: "2px 8px",
    fontSize: "12px",
    fontWeight: "bold"
  }
};

export default Navbar;
