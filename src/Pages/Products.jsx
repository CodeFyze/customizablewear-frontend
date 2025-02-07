import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { add } from "../store/cartSlice";
import TShirtSelector from "../components/Tshirtselector";

const Products = ({ showTShirtSelector = true }) => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
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
    dispatch(add(product));
  };

  const getShortTModel = (model) => {
    if (!model || typeof model !== "string") return "Unknown Model";
    return model.length > 20 ? model.substring(0, 12) + "..." : model;
  };

  return (
    <div>
      {showTShirtSelector && <TShirtSelector />}
      <div className="container mx-auto pb-24 py-4">
        <h1 className="text-3xl font-bold my-8 font-sans">Products</h1>
        <div className="flex flex-wrap justify-center">
          {products.map((product) => (
            <div
              key={product.id || Math.random()}
              className="min-w-[300px] max-w-[200px] m-2 p-4 bg-white shadow-md border-2 rounded-lg transition-transform transform hover:scale-100"
              style={{ height: "560px" }}
            >
              <img
                src={product.image || "/placeholder.jpg"}
                alt={product.title || "No title available"}
                className="w-full object-cover rounded-lg py-2 hover:translate-y-2 duration-200"
              />

              <div className="text-center mt-2 text-gray-500 font-bold text-lg">
                Brand: {product.brand || "Unknown Brand"}
              </div>
              <div className="text-center mt-2 font-bold text-lg">
                Model: {getShortTModel(product.model)}
              </div>
              <div className="text-center mt-1 text-gray-500">
                Price: ₹{product.price || "N/A"}
              </div>
              <div className="text-center mt-1 text-gray-500">
                Color: {product.color || "N/A"}
              </div>
              <div className="text-center mt-1 text-gray-500">
                Category: {product.category || "N/A"}
              </div>
              <div className="text-center mt-2 font-semibold text-green-600">
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
