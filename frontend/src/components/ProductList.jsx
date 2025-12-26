import products from "../data/products";
import ProductCard from "./ProductCard";


const ProductList = ({ products }) => {
  return (
    <div>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};


export default ProductList;
