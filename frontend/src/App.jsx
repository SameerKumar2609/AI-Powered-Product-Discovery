import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./components/Cart";
import Header from "./components/Header";
import Wishlist from "./pages/Wishlist";
import Navbar from "./components/Navbar";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";




function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-success" element={<OrderSuccess />} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;
