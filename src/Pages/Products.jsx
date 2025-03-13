import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
// import { add } from "../store/cartSlice";
import { addItem } from "../store/cartSlice";
import TShirtSelector from "../components/Tshirtselector";
import Shirt from '../assets/images/shirt1.jpeg'
import { FaArrowRightLong } from "react-icons/fa6";
import axios from 'axios'


const Products = ({ showTShirtSelector = true }) => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();



  useEffect(() => {
    // calling fake dunmy api
    // Productsfetching()
    fetchProducts();

  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/products/", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Fetched Products:", JSON.stringify(data, null, 2));

      if (!data.products || !Array.isArray(data.products)) {
        throw new Error("Invalid API response format");
      }

      setProducts(data.products.slice(0, 8));
    } catch (error) {
      console.error("Error fetching products:", error.message);
    }
  };

  const handleAdd = (product) => {
    console.log(product)
    dispatch(addItem(product));
  };
 
  return (
    <div className="my-2 ">
      {showTShirtSelector && <TShirtSelector />}
      <div className="container py-2">
        <h1 className="text-3xl font-bold my-8 font-sans px-5">Products</h1>
        <div className="w-full  grid gap-2 sm:gap-5 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
          {/* {products.map((product) => (
            <div
              key={product._id}
              className="bg-red-400 m-2 p-4 shadow-md border-2 rounded-lg transition-transform transform hover:scale-100"
              style={{ height: "560px" }}
            > 
              <img
                src={product.image || product.frontImage || "/placeholder.jpg"}
                alt={product.title || "No title available"}
                className="w-full object-cover rounded-lg py-2 hover:translate-y-2 duration-200"
              />

              <div className="text-center mt-2 font-bold text-lg">
                {product.title || "Untitled Product"}
              </div>

              <div className="text-center mt-1 text-gray-500">
                Price: ₹{product.price || "N/A"}
              </div>

              <div className="text-center mt-1 text-gray-500">
                <span>Color:</span>
                <div className="flex justify-center gap-2 mt-1">
                  {product.colors?.length > 0 ? (
                    product.colors.map((color, index) => (
                      <div
                        key={index}
                        className="w-6 h-6 rounded-full border border-gray-300"
                        style={{ backgroundColor: color }}
                        title={color}
                      ></div>
                    ))
                  ) : (
                    <span>N/A</span>
                  )}
                </div>
              </div>

              {/* <div className="text-center mt-2 font-semibold text-green-600">
                Discount:{" "}
                {product.discount ? `${product.discount}%` : "No discount"}
              </div> 

              <div className="text-center mt-2">
                <button
                  className="px-4 py-2 bg-[#e57312] text-white rounded-full hover:bg-[#146c7d] selection:transition duration-300 font-sans"
                  onClick={() => handleAdd(product)}
                >
                 
                  Add to Cart
                </button>
              </div>
            </div>
          ))} */}
          {/* adding dummy card design */}
          {
            products.map((product) => (
              <div key={product._id} className=" max-w-6xl rounded-lg flex flex-col items-start border-gray-200 shadow-md border-[1px] border-solid  ">
                <div className="  w-full h-full overflow-hidden">
                  <img className=" w-full h-56 object-contain rounded-b-none rounded-t-lg" src={product.image || product.frontImage || "/placeholder.jpg"} alt={product.title || "No title available"} />
                </div>
                <div className="w-full  py-2 px-4 flex flex-col items-start justify-center ">
                  <h4 className="text-md font-noraml text-wrap">{product.title || "Untitled Product"}</h4>
                  <h3 className="text-md font-noraml">{product.description}</h3>
                  <p className="font-bold text-red-600">₹{product.price || "N/A"}</p>
                  <span className="flex flex-row gap-1"> {product.colors?.length > 0 ? (
                    product.colors.map((color, index) => (
                      <div
                        key={index}
                        className="w-5 h-5 rounded-full border border-gray-300"
                        style={{ backgroundColor: color }}
                        title={color}
                      ></div>
                    ))
                  ) : (
                    <span>N/A</span>
                  )}</span>
                    <div className="text-center mt-2 font-semibold text-green-600">
                Discount:{" "}
                {product.discount ? `${product.discount}%` : "No discount"}
              </div> 
                  <button onClick={() => handleAdd(product)} className="my-2 w-full flex items-center justify-around font-medium  bg-[#ED5F1E] text-white px-2 py-2 rounded-full hover:bg-orange-600"><span>Add to Cart </span> <FaArrowRightLong className="font-light" /></button>
                </div>

              </div>
            ))
          }





        </div>
      </div>
    </div>
  );
};

export default Products;
