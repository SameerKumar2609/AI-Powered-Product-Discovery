import { useCart } from "../context/CartContext";

const Cart = () => {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity } = useCart();

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <h2 style={{ textAlign: "center", marginTop: "40px" }}>
        🛒 Your Cart is Empty
      </h2>
    );
  }

  return (
    <div style={styles.container}>
      <h2 style={{ textAlign: "center" }}>My Cart 🛒</h2>

      <div style={styles.grid}>
        {cart.map(item => (
          <div key={item.id} style={styles.card}>
            <img src={item.image} alt={item.name} style={styles.img} />

            <h3>{item.name}</h3>
            <p style={styles.price}>₹{item.price}</p>

            <div>
              <button
                style={styles.qtyBtn}
                onClick={() => decreaseQuantity(item.id)}
              >
                −
              </button>

              <span style={styles.qty}>{item.quantity}</span>

              <button
                style={styles.qtyBtn}
                onClick={() => increaseQuantity(item.id)}
              >
                +
              </button>
            </div>

            <p style={styles.subTotal}>
              Subtotal: ₹{item.price * item.quantity}
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
        <button style={styles.checkoutBtn}>
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: { padding: "20px" },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit , minmax(280px, 1fr))",
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

  qtyBtn: {
    padding: "6px 10px",
    margin: "0 5px",
    fontSize: "18px",
    background: "black",
    color: "white",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer"
  },

  qty: { fontSize: "18px", fontWeight: "bold" },

  subTotal: { fontWeight: "bold" },

  removeBtn: {
    marginTop: "10px",
    padding: "8px 12px",
    background: "red",
    color: "white",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer"
  },

  totalBox: {
    marginTop: "30px",
    textAlign: "center",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
  },

  checkoutBtn: {
    padding: "10px 16px",
    marginTop: "10px",
    fontSize: "16px",
    background: "green",
    color: "white",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer"
  }
};

export default Cart;
