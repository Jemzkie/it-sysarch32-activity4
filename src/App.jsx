import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signin from "./components/Signin.jsx";
import Signup from "./components/Signup.jsx";
import Products from "./components/Products.jsx";
import Product from "./components/Product.jsx";
import Orders from "./components/Orders.jsx";
import Order from "./components/Order.jsx";

import "./App.css";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:productId" element={<Product />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="orders/:orderId" element={<Order />} />
      </Routes>
    </Router>
  );
}
