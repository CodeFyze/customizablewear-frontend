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
    <div className="mx-4 md:mx-8 lg:mx-16 my-4 md:my-8">
      <h1 className="text-xl md:text-2xl font-bold mb-4">Shopping Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          {cart.length === 0 ? (
            <div className="flex justify-center">
              <img src={img} alt="emptycart" className="w-full max-w-sm md:max-w-md lg:w-96"/>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white shadow-lg shadow-gray-300 rounded-md p-3 md:p-4 mb-4"
              >
                <div className="flex items-center w-full sm:w-auto">
                  <img
                    src={item.image || item.frontImage}
                    alt={item.title}
                    className="w-16 h-16 md:w-20 md:h-20 object-contain"
                  />
                  <div className="flex-1 ml-4">
                    <h2 className="text-base md:text-lg font-bold text-gray-800">{item.title}</h2>
                    <p className="text-gray-600 text-xs md:text-sm">{item.category}</p>
                    <p className="text-gray-800 font-bold text-base md:text-lg">Rs. {item.price}</p>
                    <p className="text-gray-600 text-xs md:text-sm">Size: {item.size}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between w-full sm:w-auto mt-4 sm:mt-0">
                  <div className="flex items-center space-x-2 sm:mr-4">
                    <button
                      className="px-2 py-1 bg-gray-200 rounded text-sm md:text-base"
                      onClick={() => dispatch(decreaseQuantity(item.id))}
                    >
                      -
                    </button>
                    <span className="mx-2 text-sm md:text-base">{item.quantity}</span>
                    <button
                      className="px-2 py-1 bg-gray-200 rounded text-sm md:text-base"
                      onClick={() => dispatch(increaseQuantity(item.id))}
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="bg-red-500 text-white py-1 px-2 md:px-3 rounded-md hover:bg-red-600 transition duration-300 text-sm md:text-base"
                    onClick={() => dispatch(remove(item.id))}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="p-4 bg-white shadow-lg shadow-gray-300 rounded-md sticky top-4">
          <h2 className="text-base md:text-lg font-bold text-gray-800 mb-4">The total amount of</h2>
          <div className="space-y-2">
            <p className="text-gray-600 text-sm flex justify-between">
              <span>Total amount:</span>
              <span>Rs. {totalAmount.toFixed(2)}</span>
            </p>
            <p className="text-gray-600 text-sm flex justify-between">
              <span>Shipping:</span>
              <span>Rs. {shippingCost.toFixed(2)}</span>
            </p>
            <div className="border-t pt-2 mt-2">
              <p className="text-gray-800 font-bold text-base md:text-lg flex justify-between">
                <span>Total (excluding VAT):</span>
                <span>Rs. {totalWithShipping.toFixed(2)}</span>
              </p>
            </div>
          </div>
          <button
            className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300 text-sm md:text-base"
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