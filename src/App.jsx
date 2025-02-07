import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./Pages/Home";
import Products from "./Pages/Products";
import Navigation from "./components/Navigation";
import Cart from "./components/Cart";
import Contact from "./Pages/Contact";
import About from "./Pages/About";
import Footer from "./components/Footer";
import Checkout from "./components/Checkout";
import LoginPage from "./Pages/login";
import SignUp from "./Pages/signup";
import OtpPage from "./Pages/otp";
import SellPage from "./Pages/seller";

const App = () => {
  const location = useLocation();
  const isSellerPage = location.pathname === "/seller";

  return (
    <>
      {!isSellerPage && <Navigation />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/otp" element={<OtpPage />} />
        <Route path="/seller" element={<SellPage />} />
      </Routes>
      {!isSellerPage && <Footer />}
    </>
  );
};

export default App;
