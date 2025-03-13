import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '../store/cartSlice';
import SizeSelection from './SizeSelection';
import Popup from './shirtpopup';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const TShirtSelector = () => {
	const [selectedShirt, setSelectedShirt] = useState(null);
	const [isAnimating, setIsAnimating] = useState(false);
	const [products, setProducts] = useState([]); // List of all products
	const [selectedProduct, setSelectedProduct] = useState(null);
	const [popupVisible, setPopupVisible] = useState(false);
	const [selectedSize, setSelectedSize] = useState(null);
  const [ selectedColor, setSelectedColor ] = useState(null);
  const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();

	// ✅ Handle Shirt View Change
	const handleShirtChange = (shirt) => {
		setIsAnimating(true);
		setTimeout(() => {
			setSelectedShirt(shirt);
			setIsAnimating(false);
		}, 300);
	};

	// ✅ Handle Product Selection
	const handleProductSelect = (product) => {
		setSelectedProduct(product);
		setSelectedShirt(product.frontImage);
		setSelectedSize(null);
		setSelectedColor(null);
	};

	// ✅ Handle Color Selection (Display Corresponding Color Image)
	const handleColorSelect = (color) => {
		console.log('Color selected:', color);
		setSelectedColor(color);

		// Find the index of the selected color
		const colorIndex = selectedProduct.colors.indexOf(color);

		// Get the corresponding color image (if available)
		if (colorIndex !== -1 && selectedProduct.colorImages[colorIndex]) {
			setSelectedShirt(selectedProduct.colorImages[colorIndex]); // ✅ Display color image
		} else {
			setSelectedShirt(selectedProduct.frontImage); // ✅ Fallback to front image
		}
	};

	// ✅ Handle Adding to Cart
	console.log('selected size', selectedSize);
const handleAddToCart = async () => {
	if (!selectedProduct) {
		toast.error('Please select a product first.');
		return;
	}

	if (!selectedSize || selectedSize.quantity === 0) {
		toast.error('Please select a size.');
		return;
	}

	if (!selectedColor) {
		toast.error('Please select a color.');
		return;
	}
	console.log('selected product id------> ', selectedProduct._id);

	const productToAdd = {
		productId: selectedProduct._id,
		image: selectedShirt || selectedProduct.frontImage,
		title: selectedProduct.title,
		size: selectedSize.size,
		color: selectedColor,
		finalQuantity: selectedSize.quantity,
		price: selectedProduct.price,
	};

	console.log('productToAdd--->', productToAdd);
	try {
		setLoading(true);
		const token = localStorage.getItem('authToken');
		const response = await fetch('http://localhost:5000/api/cart/add', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(productToAdd),
		});

		const data = await response.json();
    if (response.ok) {
			Swal.fire({
				title: 'Added',
				text: 'Item added to cart',
				icon: 'success',
			});
			dispatch(addItem(productToAdd)); // Dispatch after successful API call
		} else {
			toast.error(data.message || 'Failed to add item to cart.');
		}
	} catch (error) {
		console.error('❌ Error adding to cart:', error.message);
		toast.error('An error occurred while adding to the cart.');
	} finally {
		setLoading(false);
	}

};  

	// ✅ Fetch Products on Component Mount
	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const response = await fetch('http://localhost:5000/api/products/', {
					credentials: 'include',
					method: 'GET',
				});
				const data = await response.json();

				if (data.products && data.products.length > 0) {
					// Filter products to only show those with productType 'shirt'
					const shirtProducts = data.products.filter(
						(product) => product.productType && product.productType.includes('shirt'),
					);
					setProducts(shirtProducts);
					setSelectedProduct(shirtProducts[0]);
					setSelectedShirt(shirtProducts[0]?.frontImage);
				}
			} catch (error) {
				console.error('Error fetching products:', error);
			}
		};

		fetchProducts();
	}, []);

	return (
		<div className=' container flex flex-col md:flex-row justify-between items-center mx-auto p-8  md:gap-6 md:space-y-0'>
			{/* ✅ Shirt Display Area */}
			<div className=' w-full h-auto md:w-2/3 flex justify-center shadow-lg'>
				{selectedShirt && (
					<img
						src={selectedShirt}
						alt='Selected T-Shirt'
						className={`w-full  object-contain h-96 md:m-10 max-w-xs md:max-w-3xl p-4 md:p-0 transform transition-transform duration-200 ${
							isAnimating ? 'scale-10 opacity-50' : 'scale-10 opacity-100'
						}`}
					/>
				)}
			</div>

			{/* ✅ Product & Selection Controls */}
			<div className='h-auto px-2 w-full md:w-1/3 md:pr-10 '>
				{/* Select Product */}
				<div className='w-full mt-4 font-semibold text-lg text-center md:text-left'>Shirts</div>
				<div className='w-full overflow-x-auto flex space-x-2 mt-4 p-2'>
					{products.map((product, index) => (
						<div key={index} className='text-center'>
							<img
								src={product.frontImage}
								alt={`Front View ${index + 1}`}
								className={`w-24 h-24 object-cover rounded-md cursor-pointer border border-gray-300 hover:border-orange-500 ${
									selectedProduct === product ? 'border-orange-500' : ''
								}`}
								onClick={() => handleProductSelect(product)}
							/>
						</div>
					))}
				</div>

				{/* <div className="mt-4 font-medium text-lg text-center md:text-left">
Select Your T-Shirt View
</div>
<div className="grid grid-cols-3 gap-4 mt-4 p-2">
{selectedProduct &&
  [
    selectedProduct.frontImage,
    selectedProduct.sideImage,
    selectedProduct.backImage,
  ].map((image, index) => (
    <div
      key={index}
      onClick={() => handleShirtChange(image)}
      className={`cursor-pointer w-full h-32 p-2 text-center transform transition-transform duration-300 ${
        selectedShirt === image
          ? "scale-105 outline outline-2 outline-orange-500"
          : ""
      }`}
    >
      <img
        src={image}
        alt={`T-Shirt View ${index + 1}`}
        className="w-full h-24 object-cover rounded-md"
      />
    </div>
  ))}
</div>  */}

				{/* Select Color */}
				<div className='mt-6 font-medium text-lg text-center md:text-left'>Select Color</div>
				<div className='flex space-x-2 mt-4'>
					{selectedProduct?.colors?.map((color, index) => (
						<div
							key={index}
							className={`w-8 h-8 rounded-full border border-gray-300 cursor-pointer ${
								selectedColor === color ? 'border-orange-500 outline outline-2' : 'hover:border-orange-500'
							}`}
							style={{ backgroundColor: color }}
							onClick={() => handleColorSelect(color)}></div>
					))}
				</div>

				{/* Shirt Details */}
				<div className=' mt-6 p-4 md:mb-3'>
					<h3 className='text-lg font-bold mb-2'>Shirt Details</h3>
					<p className='text-sm text-gray-700'>{selectedProduct?.description || 'No description available.'}</p>
					<p className='text-sm font-bold mt-2'>Price: Rs. {selectedProduct?.price}</p>
				</div>

				{/* Size Selection */}
				<SizeSelection selectedProduct={selectedProduct} onSizeSelect={setSelectedSize} />

				{/* Buttons */}
				<div className='flex sm:flex-col md:flex-row sm:justify-center sm:items-center items-center justify-center sm:gap-2 gap-2'>
				<button
					onClick={() => setPopupVisible(true)}
					className=' bg-orange-500 text-white py-2 px-5 rounded-lg  hover:bg-orange-600'>
					ADD LOGO
				</button>

				<button
					onClick={handleAddToCart}
					className='bg-orange-500 text-white py-2 px-5 rounded-lg hover:bg-orange-600'>
					ADD TO CART
				</button>
				</div>
			</div>

			{/* Popup */}

			{popupVisible &&
				console.log(JSON.stringify(selectedProduct, null, 2), selectedSize, selectedShirt, selectedColor)}
			{popupVisible && (
				<Popup
					visible={popupVisible}
					onClose={() => setPopupVisible(false)}
					selectedProduct={selectedProduct}
					selectedSize={selectedSize}
					selectedColor={selectedColor}
					selectedShirt={selectedShirt}
				/>
			)}
		</div>
	);
};

export default TShirtSelector;
