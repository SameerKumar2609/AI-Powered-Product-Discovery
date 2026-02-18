import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState("COD");
  const [upi, setUpi] = useState("");
  const [card, setCard] = useState("");

  const total = cart.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

  const handleOrder = () => {
    if (!address.trim()) {
      alert("Enter delivery address");
      return;
    }

    if (payment === "UPI" && !upi.trim()) {
      alert("Enter UPI ID");
      return;
    }

    if (payment === "CARD" && card.length < 12) {
      alert("Enter valid card number");
      return;
    }

    clearCart();
    navigate("/order-success");
  };

  return (
    <div style={styles.container}>
      <h2>Checkout 🛒</h2>

      {/* Address */}
      <textarea
        placeholder="Delivery Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        style={styles.textarea}
      />

      {/* Payment Method */}
      <h3>Payment Method</h3>

      <div style={styles.paymentBox}>
        <label>
          <input
            type="radio"
            checked={payment === "COD"}
            onChange={() => setPayment("COD")}
          />
          Cash on Delivery 💵
        </label>

        <label>
          <input
            type="radio"
            checked={payment === "UPI"}
            onChange={() => setPayment("UPI")}
          />
          UPI 📲
        </label>

        <label>
          <input
            type="radio"
            checked={payment === "CARD"}
            onChange={() => setPayment("CARD")}
          />
          Card 💳
        </label>
      </div>

      {/* UPI Input */}
      {payment === "UPI" && (
        <input
          placeholder="Enter UPI ID (example@upi)"
          value={upi}
          onChange={(e) => setUpi(e.target.value)}
          style={styles.input}
        />
      )}

      {/* Card Input */}
      {payment === "CARD" && (
        <input
          placeholder="Enter Card Number"
          value={card}
          onChange={(e) => setCard(e.target.value)}
          style={styles.input}
        />
      )}

      {/* Summary */}
      <h3>Order Summary</h3>

      {cart.map(item => (
        <div key={item.id} style={styles.item}>
          {item.name} × {item.quantity}
          <span>₹{item.price * item.quantity}</span>
        </div>
      ))}

      <h2>Total: ₹{total}</h2>

      <button onClick={handleOrder} style={styles.button}>
        Place Order
      </button>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "600px",
    margin: "40px auto",
    padding: "20px"
  },

  textarea: {
    width: "100%",
    padding: "10px",
    height: "100px",
    marginBottom: "20px"
  },

  paymentBox: {
    display: "flex",
    gap: "20px",
    marginBottom: "15px"
  },

  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "15px"
  },

  item: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "8px"
  },

  button: {
    padding: "12px",
    width: "100%",
    background: "green",
    color: "white",
    border: "none",
    cursor: "pointer",
    fontSize: "16px"
  }
};

export default Checkout;
