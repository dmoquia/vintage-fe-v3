import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import ProductProvider from "./context/products";
import { CartProvider } from "./context/cart";
import { UserProvider } from "./context/user";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <ProductProvider>
        <CartProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </CartProvider>
      </ProductProvider>
    </UserProvider>
  </React.StrictMode>
);
