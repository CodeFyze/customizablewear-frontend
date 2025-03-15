export const handleImageUpload = (fileData, productIndex, products, setProducts) => {
    const updatedProducts = [...products];
    updatedProducts[productIndex].image = fileData;
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
    const updatedProducts = [...products];
    const color = updatedProducts[productIndex].colors[colorIndex];
    if (color.sizes.includes(size)) {
      color.sizes = color.sizes.filter((s) => s !== size);
    } else {
      color.sizes.push(size);
    }
    setProducts(updatedProducts);
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
      if (!product.image || product.colors.length === 0) {
        alert('Each product must have an image and at least one color.');
        return;
      }
  
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
      }
    });
  
    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
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
  