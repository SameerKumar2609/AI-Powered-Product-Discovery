import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div style={{ border: "1px solid #ddd", padding: "16px" }}>
      <img src={product.image} alt={product.name} width="150" />
      <h3>{product.name}</h3>
      <p>₹{product.price}</p>
      <Link to={`/product/${product.id}`}>View Details</Link>
    </div>
  );
};

export default ProductCard;
