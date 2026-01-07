import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

const Navbar = () => {
  const { cart } = useCart();
  const { wishlist } = useWishlist();

  return (
    <nav style={styles.nav}>
      <h2 style={styles.logo}>AI Product Discovery</h2>

      <div style={styles.links}>
        <Link style={styles.link} to="/">Home</Link>
        <Link style={styles.link} to="/cart">Cart ({cart.length})</Link>
        <Link style={styles.link} to="/wishlist">Wishlist ({wishlist.length})</Link>
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    padding: "12px 24px",
    background: "#111",
    color: "#fff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  logo: { margin: 0 },
  links: { display: "flex", gap: "20px" },
  link: { color: "#fff", textDecoration: "none", fontSize: "18px" }
};

export default Navbar;
