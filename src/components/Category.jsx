import React, { useState, useEffect, useRef } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Category = () => {
  const [products, setProducts] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/products/", {
        credentials: 'include',
        method: "GET",
      });
      const data = await response.json();
      setProducts(data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const scrollLeft = () => {
    scrollRef.current.scrollBy({
      left: -300,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({
      left: 300,
      behavior: "smooth",
    });
  };

  return (
    <div className="max-w-[1200px] mx-auto px-4">
      <div className="flex items-center justify-between my-8">
        <div className="text-2xl font-bold">Product Categories</div>
        <div className="flex space-x-2">
          <button
            className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full hover:bg-[#4bf6d4] transition-colors"
            onClick={scrollLeft}
          >
            <FaArrowLeft className="text-xl text-gray-600  hover:text-white" />
          </button>
          <button
            className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full hover:bg-[#4bf6d4]  transition-colors"
            onClick={scrollRight}
          >
            <FaArrowRight className="text-xl text-gray-600  hover:text-white" />
          </button>
        </div>
      </div>
      <div
        ref={scrollRef}
        className="flex items-center overflow-x-auto scrollbar-hide space-x-4 py-7"
      >
        {products.map((product) => (
          <div
            key={product.product_id}
            className="w-44 h-64 flex-shrink-0 transition-transform transform hover:scale-105 p-4 rounded-lg shadow-md"
          >
            <div className="h-full flex flex-col justify-between">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-36 object-cover rounded-lg transition-transform duration-500 hover:rotate-3 hover:scale-110"
              />
              <div className="text-center mt-2 font-semibold text-gray-700">
                {product.name}
              </div>
              <div className="text-center text-gray-500">
                {product.category}
              </div>
            </div>
          </div>
        ))}
      </div>
      <hr className="my-4 border-gray-500" />
    </div>
  );
};

export default Category;
