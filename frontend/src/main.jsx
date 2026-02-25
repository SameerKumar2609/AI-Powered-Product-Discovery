import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { ToastProvider } from "./context/ToastContext";
import { ProductProvider } from "./context/ProductContext";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CartProvider>
      <WishlistProvider>
        <ToastProvider>
          <ProductProvider>
          <App />
          </ProductProvider>
        </ToastProvider>
      </WishlistProvider>
    </CartProvider>
  </React.StrictMode>
);
