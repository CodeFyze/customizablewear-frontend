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
import Order from "./Pages/order";
import OrderDetails from "./Pages/order";
import Success from "./components/Success";
import CustomerOrders from "./Pages/CustomerOrders";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductTypePage from "./Pages/ProductTypePage";
import ProductDetailsPage from "./Pages/ProductDetailsPage";
import Bundles from "./Pages/Bundles";
import BundlesDetailsPage from "./Pages/BundlesDetailsPage";
import BundleSelectionPage from "./Pages/BundlesDetailsPage";

const App = () => {
  const location = useLocation();
  const isSellerPage = location.pathname === "/seller";
  

  return (
		<>
			{/* <ToastContainer  /> */}

			{!isSellerPage && <Navigation />}

			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/products' element={<Products />} />
				<Route path='/contact' element={<Contact />} />
				<Route path='/about' element={<About />} />
				<Route path='/checkout' element={<Checkout />} />
				<Route path='/cart' element={<Cart />} />
				<Route path='/login' element={<LoginPage />} />
				<Route path='/signup' element={<SignUp />} />
				<Route path='/otp' element={<OtpPage />} />
				<Route path='/seller' element={<SellPage />} />
				<Route path='/order' element={<Order />} />
				<Route path='/orders/:orderId' element={<OrderDetails />} />
				<Route path='/success' element={<Success />} />
				cart
				<Route path='/customers/:customerId/orders' element={<CustomerOrders />} />
				<Route path='/products/:productType' element={<ProductTypePage />} />
				<Route path='/product/:id' element={<ProductDetailsPage />} />
				<Route path="/bundle/:id" element={<BundlesDetailsPage />} />
				<Route path='/bundles' element={<Bundles />} />
				{/* <Route path='/bundle/category/:category' element={<BundlesDetailsPage />} /> */}
			</Routes>

			{!isSellerPage && <Footer />}
		</>
	);
};

export default App;
