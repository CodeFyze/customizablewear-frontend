import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
// import { add } from "../store/cartSlice";
import { addItem } from "../store/cartSlice";
import TShirtSelector from "../components/Tshirtselector";
const apiUrl = import.meta.env.VITE_API_BASE_URL;

const Products = ({ showTShirtSelector = true }) => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${apiUrl}/products/`, {
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
    <div className="">
      {showTShirtSelector && <TShirtSelector />}
      <div className=" container mx-auto px-4 py-4 ">
        <h1 className="text-3xl font-bold my-8 font-sans px-5">Products</h1>
        <div className="w-full  grid gap-4 sm:gap-5 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
          {products.map((product) => (
            <div
              key={product._id}
              className="max-w-6xl rounded-lg flex flex-col items-start border-gray-200 shadow-md border-[1px] border-solid "

            >
              <div className="w-full h-full overflow-hidden">
                <img
                  src={product.image || product.frontImage || "/placeholder.jpg"}
                  alt={product.title || "No title available"}
                  className="w-full h-56 object-contain rounded-b-none rounded-t-lg"
                />
              </div>
              <div className="  w-full py-2 px-4 flex flex-col items-center  justify-center ">

                <div className="text-md font-noraml text-wrap">
                  {product.title || "Untitled Product"}
                </div>

                <div className="text-center mt-1 text-black">
                  Price: ₹{product.price || "N/A"}
                </div>

                <div className="text-center mt-1 text-black">
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
              </div> */}

                <div className="text-center mt-3 mb-4">
                  <button
                    className="px-4 py-2 bg-[#000000] text-[#ffff] rounded-full hover:bg-transparent hover:text-black border-[1px] selection:transition duration-300 font-sans"
                    onClick={() => handleAdd(product)}
                  >

                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
