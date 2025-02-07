import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { remove, increaseQuantity, decreaseQuantity } from "../store/cartSlice";
import { useNavigate } from "react-router-dom";
import img from "../assets/images/empty-cart.png";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Calculate the total amount
  const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const shippingCost = 50; 
  const totalWithShipping = totalAmount + shippingCost;

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className="mx-16 my-8">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          {cart.length === 0 ? (
            <div><img src={img} alt="emptycart" className="w-96"/></div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between bg-white shadow-lg shadow-gray-300 rounded-md p-4 mb-4"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-20 h-20 object-contain"
                />
                <div className="flex-1 ml-4">
                  <h2 className="text-lg font-bold text-gray-800">{item.title}</h2>
                  <p className="text-gray-600 text-sm">{item.category}</p>
                  <p className="text-gray-800 font-bold text-lg">${item.price}</p>
                </div>
                <div className="flex items-center">
                  <button
                    className="px-2 py-1 bg-gray-200 rounded"
                    onClick={() => dispatch(decreaseQuantity(item.id))}
                  >
                    -
                  </button>
                  <span className="mx-2">{item.quantity}</span>
                  <button
                    className="px-2 py-1 bg-gray-200 rounded"
                    onClick={() => dispatch(increaseQuantity(item.id))}
                  >
                    +
                  </button>
                </div>
                <button
                  className="ml-4 bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600 transition duration-300"
                  onClick={() => dispatch(remove(item.id))}
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>
        <div className="p-4 bg-white shadow-lg shadow-gray-300 rounded-md">
          <h2 className="text-lg font-bold text-gray-800 mb-4">The total amount of</h2>
          <p className="text-gray-600 text-sm">Total amount: ${totalAmount.toFixed(2)}</p>
          <p className="text-gray-600 text-sm">Shipping: ${shippingCost.toFixed(2)}</p>
          <p className="text-gray-800 font-bold text-lg mt-2">
            The total amount of (excluding VAT): ${totalWithShipping.toFixed(2)}
          </p>
          <button
            className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
            onClick={handleCheckout}
          >
            Go to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
