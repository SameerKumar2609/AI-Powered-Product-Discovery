import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity
  } = useCart();

  const totalAmount = cart.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

  // Empty cart UI
  if (cart.length === 0) {
    return (
      <div style={styles.empty}>
        <h2>🛒 Your Cart is Empty</h2>
        <Link to="/">
          <button style={styles.shopBtn}>Continue Shopping</button>
        </Link>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h2 style={{ textAlign: "center" }}>My Cart 🛒</h2>

      <div style={styles.grid}>
        {cart.map((item) => (
          <div key={item.id} style={styles.card}>
            <img
              src={item.image}
              alt={item.name}
              style={styles.img}
            />

            <h3>{item.name}</h3>

            <p style={styles.price}>₹{item.price}</p>

            {/* Quantity Controls */}
            <div style={styles.qtyRow}>
              <button
                style={styles.qtyBtn}
                onClick={() => decreaseQuantity(item.id)}
              >
                −
              </button>

              <span style={styles.qty}>
                {item.quantity}
              </span>

              <button
                style={styles.qtyBtn}
                onClick={() => increaseQuantity(item.id)}
              >
                +
              </button>
            </div>

            <p style={styles.subTotal}>
              Subtotal: ₹{Number(item.price) * item.quantity}
            </p>

            <button
              style={styles.removeBtn}
              onClick={() => removeFromCart(item.id)}
            >
              Remove ❌
            </button>
          </div>
        ))}
      </div>

      {/* Total Section */}
      <div style={styles.totalBox}>
        <h2>Total Amount: ₹{totalAmount}</h2>

        <Link to="/checkout">
          <button style={styles.checkoutBtn}>
            Proceed to Checkout →
          </button>
        </Link>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px"
  },

  empty: {
    textAlign: "center",
    marginTop: "60px"
  },

  shopBtn: {
    padding: "12px 18px",
    background: "black",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    marginTop: "15px"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "20px",
    marginTop: "20px"
  },

  card: {
    border: "1px solid #eee",
    borderRadius: "12px",
    padding: "16px",
    textAlign: "center",
    boxShadow: "0 6px 14px rgba(0,0,0,0.08)"
  },

  img: {
    width: "100%",
    height: "180px",
    objectFit: "contain"
  },

  price: {
    fontWeight: "bold",
    fontSize: "18px"
  },

  qtyRow: {
    marginTop: "10px"
  },

  qtyBtn: {
    padding: "6px 12px",
    fontSize: "18px",
    background: "black",
    color: "white",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer"
  },

  qty: {
    fontSize: "18px",
    fontWeight: "bold",
    margin: "0 10px"
  },

  subTotal: {
    marginTop: "10px",
    fontWeight: "bold"
  },

  removeBtn: {
    marginTop: "12px",
    padding: "8px 14px",
    background: "#ff4d4f",
    color: "white",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer"
  },

  totalBox: {
    marginTop: "30px",
    textAlign: "center",
    padding: "20px",
    border: "1px solid #eee",
    borderRadius: "12px",
    boxShadow: "0 6px 14px rgba(0,0,0,0.08)"
  },

  checkoutBtn: {
    padding: "12px 20px",
    marginTop: "12px",
    fontSize: "16px",
    background: "green",
    color: "white",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer"
  }
};

export default Cart;
