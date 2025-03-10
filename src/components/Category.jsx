import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Category = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/products/", {
        credentials: "include",
        method: "GET",
      });
      const data = await response.json();
      console.log("product data",data);
      
      setProducts(data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Group products by productType (store only the first product of each type)
  const groupedProducts = {};
  products.forEach((product) => {
    if (!groupedProducts[product.productType]) {
      groupedProducts[product.productType] = product;
    }
  });

  return (
    <div className=" w-full h-auto mx-auto my-2 px-4">
      <div className="flex items-center justify-between ">
        <div className="text-md md:text-xl lg:text-3xl font-bold">Product Categories</div>
        <div className="flex space-x-3">
          <button
            className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full hover:bg-[#4bf6d4] transition-colors"
          >
            <FaArrowLeft className="text-xl text-gray-600 hover:text-white" />
          </button>
          <button
            className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full hover:bg-[#4bf6d4] transition-colors"
          >
            <FaArrowRight className="text-xl text-gray-600 hover:text-white" />
          </button>
        </div>
      </div>
      <div className="flex items-center overflow-x-auto scrollbar-hide space-x-4 py-7">
        {Object.values(groupedProducts).map((product) => (
          <div
            key={product.product_id}
            className="w-44 h-64 flex-shrink-0 transition-transform transform hover:scale-105 p-4 rounded-lg shadow-md relative cursor-pointer"
            onClick={() => navigate(`/products/${product.productType}`)}
          >
            <div className="h-full flex flex-col justify-between">
              <div className="relative w-full h-36">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover rounded-lg transition-transform duration-500 hover:rotate-3 hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white text-sm font-semibold text-center py-1 rounded-b-lg">
                  {product.productType}
                </div>
              </div>
              <div className="text-center mt-2 font-semibold text-gray-700">
                {product.name}
              </div>
              <div className="text-center text-gray-500">{product.category}</div>
            </div>
          </div>
        ))}
      </div>
      {/* <hr className="my-4 border-gray-500" /> */}
    </div>
  );
};

export default Category;
