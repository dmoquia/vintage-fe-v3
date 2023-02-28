import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Products from "./pages/Products";
import Error from "./pages/Error";
import PrivateRoute from "./components/PrivateRoute";
import ProductDetails from "./pages/ProductDetails";
import Header from "./components/Header";
import Alert from "./components/Alert";
import ScrollButton from "./components/ScrollButton";
import Checkout from "./pages/Checkout";
function App() {
  return (
    <>
      <Header />
      <Alert />
      <ScrollButton />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<PrivateRoute />}>
          <Route path="/checkout" element={<Checkout />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
