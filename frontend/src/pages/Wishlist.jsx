import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (wishlist.length === 0) {
    return (
      <h2 style={{ textAlign: "center", marginTop: "40px" }}>
        ❤️ Your Wishlist is Empty
      </h2>
    );
  }

  return (
    <div style={styles.container}>
      <h2 style={{ textAlign: "center" }}>My Wishlist ❤️</h2>

      <div style={styles.grid}>
        {wishlist.map(item => (
          <div key={item.id} style={styles.card}>
            <img src={item.image} alt={item.name} style={styles.img} />

            <h3>{item.name}</h3>
            <p style={styles.price}>₹{item.price}</p>

            <div style={styles.actions}>
              <button
                style={styles.cartBtn}
                onClick={() => addToCart(item)}
              >
                Add to Cart
              </button>

              <button
                style={styles.removeBtn}
                onClick={() => removeFromWishlist(item.id)}
              >
                Remove ❌
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: { padding: "20px" },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit , minmax(250px, 1fr))",
    gap: "20px",
    marginTop: "20px"
  },

  card: {
    border: "1px solid #ddd",
    borderRadius: "10px",
    padding: "16px",
    textAlign: "center",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
  },

  img: {
    width: "100%",
    height: "180px",
    objectFit: "cover",
    borderRadius: "8px"
  },

  price: {
    fontWeight: "bold",
    fontSize: "18px"
  },

  actions: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "10px"
  },

  cartBtn: {
    padding: "8px 12px",
    background: "black",
    color: "white",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer"
  },

  removeBtn: {
    padding: "8px 12px",
    background: "red",
    color: "white",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer"
  }
};

export default Wishlist;
