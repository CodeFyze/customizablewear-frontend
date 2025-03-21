import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ProductTypePage = () => {
  const { productType } = useParams();
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
	const apiUrl = import.meta.env.VITE_API_BASE_URL; 
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${apiUrl}/products/`, {
        credentials: "include",
        method: "GET",
      });
      const data = await response.json();

      if (!data.products || !Array.isArray(data.products)) {
        console.error("Invalid API response format");
        return;
      }

      const filteredProducts = data.products.filter((product) =>
        Array.isArray(product.productType) &&
        product.productType.some((type) => type.toLowerCase() === productType.toLowerCase())
      );

      console.log(`Filtered Products for ${productType}:`, filteredProducts);
      setProducts(filteredProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto px-4">
      <button className="mb-4 text-blue-500 hover:underline" onClick={() => navigate(-1)}>
        ← Back to Categories
      </button>
      <h2 className="text-2xl font-bold mb-4">Products in {productType}</h2>

      {products.length === 0 ? (
        <p className="text-gray-600">No products found for {productType}.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-5">
          {products.map((product) => (
            <div 
              key={product._id} 
              className="p-4 rounded-lg shadow-md border bg-white cursor-pointer"
              onClick={() => navigate(`/product/${product._id}`)} // Navigate to product details
            >
              <img
                src={product.frontImage || "https://via.placeholder.com/150"}
                alt={product.title}
                className="w-full h-auto max-h-64 object-contain rounded-lg mb-2"
              />
              <h3 className="text-lg font-semibold text-center">{product.title}</h3>
              <p className="text-gray-500 text-center">{product.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductTypePage;
