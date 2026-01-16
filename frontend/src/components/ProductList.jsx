import ProductCard from "./ProductCard";

const ProductList = ({ products }) => {
  return (
    <div style={styles.grid}>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    padding: "20px",
    objectFit: "contain"
  }
};

export default ProductList;
