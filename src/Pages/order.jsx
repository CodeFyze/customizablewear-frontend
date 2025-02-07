import React from 'react';

export default function Order() {
  const orderData = {
    productName: 'Custom T-Shirt',
    logo: 'https://via.placeholder.com/150',  // Placeholder logo image URL
    logoName: 'CoolBrand',
    logoPosition: 'Center of the Chest',
  };

  return (
    <div className="mt-20 p-6 bg-gray-50 rounded-lg shadow-lg max-w-md mx-auto">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">Order Summary</h2>
      
      <div className="mb-4">
        <h3 className="text-xl font-bold text-gray-700">Product: {orderData.productName}</h3>
      </div>
      
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <img
            src={orderData.logo}
            alt={orderData.logoName}
            className="w-16 h-16 object-contain rounded-full"
          />
          <div className="ml-3">
            <p className="font-semibold text-lg text-gray-800">{orderData.logoName}</p>
            <p className="text-sm text-gray-600">Logo Position: {orderData.logoPosition}</p>
          </div>
        </div>
      </div>
      
      <div className="text-center mt-6">
        <button className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition">
          Confirm Order
        </button>
      </div>
    </div>
  );
}
