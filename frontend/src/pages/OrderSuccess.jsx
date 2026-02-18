import { Link } from "react-router-dom";

const OrderSuccess = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "80px" }}>
      <h1>🎉 Order Placed Successfully!</h1>
      <p>Thank you for shopping with us.</p>

      <Link to="/" style={{
        padding: "12px 20px",
        background: "black",
        color: "white",
        textDecoration: "none"
      }}>
        Continue Shopping
      </Link>
    </div>
  );
};

export default OrderSuccess;
