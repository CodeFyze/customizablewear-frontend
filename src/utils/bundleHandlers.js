export const handleImageUpload = (fileData, productIndex, products, setProducts) => {
    const updatedProducts = [...products];
    updatedProducts[productIndex].image = fileData;
    setProducts(updatedProducts);
  };
  
  export const handleColorImageChange = (e, productIndex, colorIndex, products, setProducts) => {
    const file = e.target.files[0];
    if (!file) return;
  
    const updatedProducts = [...products];
    updatedProducts[productIndex].colors[colorIndex].image = file;
    setProducts(updatedProducts);
  };
  

  export const addColor = (productIndex, products, setProducts) => {
    const updatedProducts = [...products];
    updatedProducts[productIndex].colors.push({ color: '', image: null, sizes: [] });
    setProducts(updatedProducts);
  };
  
  export const handleColorChange = (productIndex, colorIndex, value, products, setProducts) => {
    const updatedProducts = [...products];
    updatedProducts[productIndex].colors[colorIndex].color = value;
    setProducts(updatedProducts);
  };
  
  export const handleSizeChange = (productIndex, colorIndex, size, products, setProducts) => {
    setProducts((prevProducts) => {
      const updatedProducts = prevProducts.map((product, pIndex) => {
        if (pIndex !== productIndex) return product; // Keep other products unchanged
  
        return {
          ...product,
          colors: product.colors.map((color, cIndex) => {
            if (cIndex !== colorIndex) return color; // Keep other colors unchanged
  
            // Toggle size selection
            const updatedSizes = color.sizes.includes(size)
              ? color.sizes.filter((s) => s !== size) // Remove size
              : [...color.sizes, size]; // Add size
  
            return { ...color, sizes: updatedSizes };
          }),
        };
      });
  
      return updatedProducts;
    });
  };
  
  
  
  export const removeColor = (productIndex, colorIndex, products, setProducts) => {
    const updatedProducts = [...products];
    updatedProducts[productIndex].colors.splice(colorIndex, 1);
    setProducts(updatedProducts);
  };
  
  export const handleCategoryChange = (category, selectedCategories, setSelectedCategories) => {
    setSelectedCategories((prevState) => ({
      ...prevState,
      [category]: !prevState[category],
    }));
  };
  
  export const handleFormSubmit = async (products, selectedCategories) => {
    if (products.length < 2) {
      alert('You must have at least two products.');
      return;
    }
  
    for (let product of products) {
      // if (!product.image || product.colors.length === 0) {
      //   alert('Each product must have an image and at least one color.');
      //   return;
      // }
      console.log('check product loop',product);
      
  
      for (let color of product.colors) {
        if (!color.color || !color.image || color.sizes.length === 0) {
          alert('Each color must have an image and at least one selected size.');
          return;
        }
      }
    }
  
    const formData = new FormData();
    products.forEach((product, productIndex) => {
      formData.append(`productImage_${productIndex}`, product.image);
  
      product.colors.forEach((color, colorIndex) => {
        formData.append(`product_${productIndex}_color_${colorIndex}`, color.color);
        formData.append(`product_${productIndex}_colorImage_${colorIndex}`, color.image);
        formData.append(`product_${productIndex}_sizes_${colorIndex}`, color.sizes.join(','));
      });
    });
  
    Object.keys(selectedCategories).forEach((category) => {
      
      
      if (selectedCategories[category]) {
        formData.append(`category_${category}`, category);
        console.log("category front---",category);
        
      }
    });
    const token = localStorage.getItem('authToken')
    
    
    try {
      console.log(token);
      const response = await fetch('http://localhost:5000/api/bundle/add', {
        method: 'POST',
        headers: {  
          Accept: 'application/json',
          
           Authorization: `Bearer ${token}` 
        },
        body:formData,
      });
      
      
  
      if (response.ok) {
        const data = await response.json();
        console.log('Images uploaded successfully', data);
        alert('Products uploaded successfully!');
      } else {
        console.error('Error uploading images');
      }
    } catch (err) {
      console.error('Upload failed', err);
    }
  };
 