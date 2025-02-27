// import React, { useState, useEffect } from "react";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { RxCross1 } from "react-icons/rx"; 

// const Modal = ({ isOpen, onClose, onSubmit, initialData }) => {
//   const [productTitle, setProductTitle] = useState("");
//   const [productPrice, setProductPrice] = useState("");
//   const [productStock, setProductStock] = useState("In Stock");
//   const [frontImage, setFrontImage] = useState(null);
//   const [backImage, setBackImage] = useState(null);
//   const [sideImage, setSideImage] = useState(null);
//   const [colors, setColors] = useState([]);
//   const [colorImages, setColorImages] = useState({}); 
//   const [images, setImages] = useState([]);

//   useEffect(() => {
//     if (initialData) {
//       setProductTitle(initialData.title || "");
//       setProductPrice(initialData.price || "");
//       setProductStock(initialData.stock || "In Stock");
//       setFrontImage(initialData.images?.front || null);
//       setBackImage(initialData.images?.back || null);
//       setSideImage(initialData.images?.side || null);
//       setColors(initialData.colors || []);
//       setImages(initialData.images?.extra || []);
//       setColorImages({});
//     } else {
//       setProductTitle("");
//       setProductPrice("");
//       setProductStock("In Stock");
//       setColors([]);
//       setImages([]);
//       setColorImages({});
//     }
//   }, [initialData]);

//   if (!isOpen) return null;


//   const handleImageChange = (e, type) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     if (type === "front") setFrontImage(file);
//     if (type === "back") setBackImage(file);
//     if (type === "side") setSideImage(file);
//   };

//   const handleExtraImagesChange = (e) => {
//     const files = Array.from(e.target.files);
//     if (images.length + files.length > 10) {
//       toast.error("You can upload up to 10 additional images only.", { position: "top-right" });
//       return;
//     }
//     setImages([...images, ...files]);
//   };

//   const removeExtraImage = (index) => {
//     setImages(images.filter((_, i) => i !== index));
//   };

//   const addColor = () => {
//     setColors([...colors, "#000000"]);
//   };

//   const removeColor = (index) => {
//     setColors(colors.filter((_, i) => i !== index));
//     const newColorImages = { ...colorImages };
//     delete newColorImages[index];  
//     setColorImages(newColorImages);
//   };


//   const handleColorImageChange = (e, index) => {
//     const file = e.target.files[0];
//     if (!file) return;
//   };


//   const updateColor = (index, value) => {
//     const newColors = [...colors];
//     newColors[index] = value;
//     setColors(newColors);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const token = localStorage.getItem("authToken"); // ✅ Get auth token
//     if (!token) {
//       toast.error("Unauthorized! Please log in again.", { position: "top-right" });
//       return;
//     }

//     if (!frontImage || !backImage || !sideImage) {
//       toast.error("Please upload all three main images (front, back, side)!", { position: "top-right" });
//       return;
//     }

//     const formData = new FormData();
//     formData.append("title", productTitle);
//     formData.append("price", productPrice);
//     formData.append("stock", productStock);
//     formData.append("front", frontImage);
//     formData.append("back", backImage);
//     formData.append("side", sideImage);
//     images.forEach((img) => formData.append("images", img));
//     formData.append("colors", JSON.stringify(colors));

//     try {
//       const response = await fetch("http://localhost:5000/api/products/add", {
//         method: "POST",
//         body: formData,
//         credentials: "include",
//         headers: {
//           Authorization: `Bearer ${token}`, // ✅ Add token in headers
//         },
//       });

//       const data = await response.json();
//       if (response.status === 401) {
//         toast.error("Unauthorized! Please log in again.", { position: "top-right" });
//         return;
//       }
//       if (data.success) {
//         toast.success("Product added successfully!", { position: "top-right" });
//         onClose();
//       } else {
//         toast.error(`Error: ${data.message}`, { position: "top-right" });
//       }
//     } catch (error) {
//       console.error("Error adding product:", error);
//       toast.error("Failed to add product. Please try again.", { position: "top-right" });
//     }
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//       <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-scroll">
//       <button onClick={onClose} className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-2 rounded">
//           <RxCross1 size={10} />
//         </button>
//         <h2 className="text-xl font-semibold mb-4">Add Product</h2>
//         <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
//           <input
//             className="w-full p-2 border rounded"
//             type="text"
//             value={productTitle}
//             onChange={(e) => setProductTitle(e.target.value)}
//             required
//             placeholder="Product Name"
//           />
//           <input
//             className="w-full p-2 border rounded"
//             type="number"
//             value={productPrice}
//             onChange={(e) => setProductPrice(e.target.value)}
//             required
//             placeholder="Price"
//           />
//           <select
//             className="w-full p-2 border rounded"
//             value={productStock}
//             onChange={(e) => setProductStock(e.target.value)}
//           >
//             <option value="In Stock">In Stock</option>
//             <option value="Out of Stock">Out of Stock</option>
//           </select>
//           {["front", "back", "side"].map((type) => (
//             <input
//               className="w-full p-2 border rounded"
//               key={type}
//               type="file"
//               accept="image/*"
//               onChange={(e) => handleImageChange(e, type)}
//             />
//           ))}
//           <input className="w-full p-2 border rounded" type="file" accept="image/*" multiple onChange={handleExtraImagesChange} />
//           <button className="px-4 py-2 bg-blue-500 text-white rounded" type="button" onClick={addColor}>
//             Add Color
//           </button>
//           {colors.map((color, index) => (
//             <div key={index} className="flex flex-col gap-2 mt-2">
//               <input type="color" value={color} onChange={(e) => updateColor(index, e.target.value)} />
//               <input type="file" accept="image/*" onChange={(e) => handleColorImageChange(e, index)} />
//               <button className="px-2 py-1 bg-red-500 text-white rounded" type="button" onClick={() => removeColor(index)}>
//                 Remove
//               </button>
//             </div>
//           ))}
//           <button className="w-full p-2 bg-green-500 text-white rounded" type="submit">
//             Add Product
//           </button>
//         </form>
//       </div>
//       <ToastContainer />
//     </div>
//   );
// };

// export default Modal;





import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RxCross1 } from "react-icons/rx"; 

const Modal = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [productTitle, setProductTitle] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productStock, setProductStock] = useState("In Stock");
  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);
  const [sideImage, setSideImage] = useState(null);
  const [colors, setColors] = useState([]);
  const [colorImages, setColorImages] = useState({});  // ✅ Store color images
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (initialData) {
      setProductTitle(initialData.title || "");
      setProductPrice(initialData.price || "");
      setProductStock(initialData.stock || "In Stock");
      setFrontImage(initialData.images?.front || null);
      setBackImage(initialData.images?.back || null);
      setSideImage(initialData.images?.side || null);
      setColors(initialData.colors || []);
      setImages(initialData.images?.extra || []);
      setColorImages({});
    } else {
      setProductTitle("");
      setProductPrice("");
      setProductStock("In Stock");
      setColors([]);
      setImages([]);
      setColorImages({});
    }
  }, [initialData]);

  if (!isOpen) return null;

  const handleImageChange = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;
    if (type === "front") setFrontImage(file);
    if (type === "back") setBackImage(file);
    if (type === "side") setSideImage(file);
  };

  const handleExtraImagesChange = (e) => {
    const files = Array.from(e.target.files);
    if (images.length + files.length > 10) {
      toast.error("You can upload up to 10 additional images only.", { position: "top-right" });
      return;
    }
    setImages([...images, ...files]);
  };

  const removeExtraImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const addColor = () => {
    setColors([...colors, "#000000"]);
  };

  const removeColor = (index) => {
    setColors(colors.filter((_, i) => i !== index));
    const newColorImages = { ...colorImages };
    delete newColorImages[index];  // ✅ Remove color image if color is deleted
    setColorImages(newColorImages);
  };

  const updateColor = (index, value) => {
    const newColors = [...colors];
    newColors[index] = value;
    setColors(newColors);
  };

  const handleColorImageChange = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;
    setColorImages((prev) => ({ ...prev, [index]: file })); // ✅ Store color image
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const token = localStorage.getItem("authToken");
  //   if (!token) {
  //     toast.error("Unauthorized! Please log in again.", { position: "top-right" });
  //     return;
  //   }

  //   if (!frontImage || !backImage || !sideImage) {
  //     toast.error("Please upload all three main images (front, back, side)!", { position: "top-right" });
  //     return;
  //   }

  //   const formData = new FormData();
  //   formData.append("title", productTitle);
  //   formData.append("price", productPrice);
  //   formData.append("stock", productStock);
  //   formData.append("front", frontImage);
  //   formData.append("back", backImage);
  //   formData.append("side", sideImage);
  //   images.forEach((img) => formData.append("images", img));
  //   formData.append("colors", JSON.stringify(colors));

  //   // ✅ Send color images along with their respective colors
  //   Object.keys(colorImages).forEach((index) => {
  //     formData.append(`colorImages`, colorImages[index]);
  //   });

  //   try {
  //     const response = await fetch("http://localhost:5000/api/products/add", {
  //       method: "POST",
  //       body: formData,
  //       credentials: "include",
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     const data = await response.json();
  //     if (response.status === 401) {
  //       toast.error("Unauthorized! Please log in again.", { position: "top-right" });
  //       return;
  //     }
  //     if (data.success) {
  //       toast.success("Product added successfully!", { position: "top-right" });
  //       onClose();
  //     } else {
  //       toast.error(`Error: ${data.message}`, { position: "top-right" });
  //     }
  //   } catch (error) {
  //     console.error("Error adding product:", error);
  //     toast.error("Failed to add product. Please try again.", { position: "top-right" });
  //   }
  // };


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const token = localStorage.getItem("authToken");
    if (!token) {
      toast.error("Unauthorized! Please log in again.");
      return;
    }
  
    if (!frontImage || !backImage || !sideImage) {
      toast.error("Please upload all three main images (front, back, side)!");
      return;
    }
  
    const formData = new FormData();
    formData.append("title", productTitle);
    formData.append("price", productPrice);
    formData.append("stock", productStock);
    formData.append("front", frontImage);
    formData.append("back", backImage);
    formData.append("side", sideImage);
    
    // ✅ Append additional images
    images.forEach((img) => formData.append("images", img));
  
    // ✅ Send colors as JSON string
    formData.append("colors", JSON.stringify(colors));
  
    // ✅ Append color images correctly
    Object.values(colorImages).forEach((img) => {
      formData.append("colorImages", img);
    });
  
    try {
      const response = await fetch("http://localhost:5000/api/products/add", {
        method: "POST",
        body: formData,
        headers: { Authorization: `Bearer ${token}` },
      });
  
      const data = await response.json();
      if (!data.success) {
        toast.error(`Error: ${data.message}`);
      } else {
        toast.success("Product added successfully!");
        onClose();
      }
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Failed to add product. Please try again.");
    }
  };
  
  
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-scroll">
    <button onClick={onClose} className="float-end bg-orange-400 text-white px-1 py-1 rounded">
        <RxCross1 size={20} />
      </button>
      <h2 className="text-xl font-semibold mt-2 mb-4">Add Product</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
        <input
          className="w-full p-2 border rounded"
          type="text"
          value={productTitle}
          onChange={(e) => setProductTitle(e.target.value)}
          required
          placeholder="Product Name"
        />
        <input
          className="w-full p-2 border rounded"
          type="number"
          value={productPrice}
          onChange={(e) => setProductPrice(e.target.value)}
          required
          placeholder="Price"
        />
        <select
          className="w-full p-2 border rounded"
          value={productStock}
          onChange={(e) => setProductStock(e.target.value)}
        >
          <option value="In Stock">In Stock</option>
          <option value="Out of Stock">Out of Stock</option>
        </select>
        {["front", "back", "side"].map((type) => (
          <input
            className="w-full p-2 border rounded"
            key={type}
            type="file"
            accept="image/*"
            onChange={(e) => handleImageChange(e, type)}
          />
        ))}
        <input className="w-full p-2 border rounded" type="file" accept="image/*" multiple onChange={handleExtraImagesChange} />
        <button className="px-4 py-2 bg-orange-400 text-white rounded" type="button" onClick={addColor}>
          Add Color
        </button>
        {colors.map((color, index) => (
          <div key={index} className="flex flex-col gap-2 mt-2">
            <input type="color" value={color} onChange={(e) => updateColor(index, e.target.value)} />
            <input type="file" accept="image/*" onChange={(e) => handleColorImageChange(e, index)} />
            <button className="px-2 py-1 bg-red-500 text-white rounded" type="button" onClick={() => removeColor(index)}>
              Remove
            </button>
          </div>
        ))}
        <button className="w-full p-2 bg-orange-400 text-white rounded" type="submit">
          Add Product
        </button>
      </form>
    </div>
    <ToastContainer />
  </div>
  );
};

export default Modal;
