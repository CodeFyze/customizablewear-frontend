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
      console.log("product data",data);
      
      setProducts(data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const scrollLeft = () => {
    scrollRef.current.scrollBy({
      left: -200,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({
      left: 200,
      behavior: "smooth",
    });
  };

  return (
    <div className=" w-full h-auto mx-auto my-2 px-4">
      <div className="flex items-center justify-between ">
        <div className="text-md md:text-xl lg:text-3xl font-bold">Product Categories</div>
        <div className="flex space-x-3">
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
        className="flex overflow-x-auto scrollbar-hide space-x-4 md:space-x-3 lg:space-x-3 py-3"
      >
        {products.map((product) => (
          <div
            key={product.product_id}
            className="border-[1px] border-solid border-gray-200 w-52 h-80 flex-shrink-0 transition-transform duration-700 transform hover:scale-105 p-2 rounded-lg shadow-md"
          >
            <div className="h-full flex flex-col items-start gap-y-1">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover rounded-lg transition-transform duration-500  hover:rotate-3 hover:scale-105"
              />
              <div className="text-start font-semibold text-gray-700">
                {product.title} 
              </div>
              <div className="text-start font-normal text-gray-700">
                Kid's Section
              </div>
          
               {/* <div className="text-start font-semibold text-gray-700 text-[14px]">
                {product.description}
              </div> */}
              <div className="border-t-[1px] bordert-t-gray-600 border-solid w-full"></div>
              <div className="text-start font-semibold text-gray-700 text-[14px]">
               Available
              </div>
              
              
              <button className="bg-[#E57312] border-2 border-solid border-[#E57312] w-full px-2 py-1 rounded-full mt-1 hover:bg-transparent duration-500 hover:text-black text-white">click</button>

             
            </div>
          </div>
        ))}
      </div>
      {/* <hr className="my-4 border-gray-500" /> */}
    </div>
  );
};

export default Category;
