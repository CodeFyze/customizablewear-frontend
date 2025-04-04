import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '../store/cartSlice';
import SizeSelection from './SizeSelection';
import Popup from './shirtpopup';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { useNavigate, useLocation } from 'react-router-dom';

const apiUrl = import.meta.env.VITE_API_BASE_URL;

const TShirtSelector = () => {
	const [selectedShirt, setSelectedShirt] = useState(null);
	const [isAnimating, setIsAnimating] = useState(false);
	const [products, setProducts] = useState([]);
	const [selectedProduct, setSelectedProduct] = useState(null);
	const [popupVisible, setPopupVisible] = useState(false);
	const [selectedSize, setSelectedSize] = useState(null);
	const [selectedColor, setSelectedColor] = useState(null);
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();

	// Handle Shirt View Change
	const handleShirtChange = (shirt) => {
		setIsAnimating(true);
		setTimeout(() => {
			setSelectedShirt(shirt);
			setIsAnimating(false);
		}, 300);
	};
	//resset function
	const resetSelectedColor = () => setSelectedColor(null);
	const resetSelectedSize = () => setSelectedSize(null);

	// Handle Product Selection
	const handleProductSelect = (product) => {
		setSelectedProduct(product);
		setSelectedShirt(product.frontImage);
		setSelectedSize(null);
		setSelectedColor(null);
	};

	// Handle Color Selection
	const handleColorSelect = (color) => {
		console.log('Color selected:', color);
		setSelectedColor(color);

		const colorIndex = selectedProduct.colors.indexOf(color);
		if (colorIndex !== -1 && selectedProduct.colorImages[colorIndex]) {
			setSelectedShirt(selectedProduct.colorImages[colorIndex]);
		} else {
			setSelectedShirt(selectedProduct.frontImage);
		}
	};

	// Handle Adding to Cart
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

		const productToAdd = {
			productId: selectedProduct._id,
			image: selectedShirt || selectedProduct.frontImage,
			title: selectedProduct.title,
			size: selectedSize.size,
			color: selectedColor,
			finalQuantity: selectedSize.quantity,
			price: selectedProduct.price,
		};

		try {
			setLoading(true);
			const response = await fetch(`${apiUrl}/cart/add`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				credentials: 'include',
				body: JSON.stringify(productToAdd),
			});

			const data = await response.json();
			if (response.ok) {
				Swal.fire({
					title: 'Added',
					text: 'Item added to cart',
					icon: 'success',
				});
				dispatch(addItem(productToAdd));
			} else {
				toast.error(data.message || 'Failed to add item to cart.');
				navigate('/login');
			}
		} catch (error) {
			console.error('❌ Error adding to cart:', error.message);
			toast.error('An error occurred while adding to the cart.');
		} finally {
			setLoading(false);
			setSelectedColor(null);
			setSelectedSize(null);
		}
	};

	// Handle Add Logo Click
	const handleAddLogoClick = async () => {
		try {
			const response = await fetch(`${apiUrl}/cart/addlogo`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
				credentials: 'include',
			});

      const data = await response.json();
			if (response.ok) {
				// Check if color or size is not selected
				if (!selectedColor || !selectedSize) {
					let missingFields = [];
					if (!selectedColor) missingFields.push('color');
					if (!selectedSize) missingFields.push('size');

					toast.error(`Please select ${missingFields.join(' and ')}.`);
					return;
				}

				setPopupVisible(true);
			} else {
				navigate('/login', { state: { from: '/products', openPopup: true } });
			}
		} catch (error) {
			console.error('❌ Error verifying authentication:', error.message);
			navigate('/login', { state: { from: '/products', openPopup: true } });
		} finally {
			setLoading(false);
		}
	};

	// Fetch Products on Component Mount
	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const response = await fetch(`${apiUrl}/products/`, {
					credentials: 'include',

					method: 'GET',
				});
				const data = await response.json();

				if (data.products && data.products.length > 0) {
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

		const { openPopup } = location.state || { openPopup: false };
		if (openPopup) {
			setPopupVisible(true);
			navigate(location.pathname, { replace: true, state: {} });
		}
	}, [location, navigate]);

	return (
		<div className='flex flex-col md:flex-row justify-between items-center space-y-8 md:space-x-8 md:space-y-0'>
			{/* Shirt Display Area */}
			<div className='w-full md:w-[1000px] flex justify-center'>
				{selectedShirt && (
					<img
						src={selectedShirt}
						alt='Selected T-Shirt'
						className={`w-full h-auto md:m-10 max-w-xs md:max-w-2xl p-4 md:p-0 transform transition-transform duration-200 ${
							isAnimating ? 'scale-75 opacity-50' : 'scale-100 opacity-100'
						}`}
					/>
				)}
			</div>

			{/* Product & Selection Controls */}
			<div className='w-full md:w-1/3 md:pr-10'>
				{/* Select Product */}
				<div className='mt-4 font-medium text-lg text-center md:text-left'>Shirts</div>
				<div className='overflow-x-auto flex space-x-2 mt-4 p-2'>
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
				<div className='mt-6 p-4 md:mb-3'>
					<h3 className='text-lg font-bold mb-2'>Shirt Details</h3>
					<p className='text-sm text-gray-700'>{selectedProduct?.description || 'No description available.'}</p>
					<p className='text-sm font-bold mt-2'>Price: Rs. {selectedProduct?.price}</p>
				</div>

				{/* Size Selection */}
				<SizeSelection selectedProduct={selectedProduct} onSizeSelect={setSelectedSize} selectedSize={selectedSize} />

				{/* Buttons */}
				<button
					onClick={handleAddLogoClick}
					className='mt-4 bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600'>
					ADD LOGO
				</button>

				<button
					onClick={handleAddToCart}
					className={`mt-4 bg-orange-500 text-white  ml-10 py-2 px-4 rounded-lg hover:bg-orange-600 ${
						loading ? 'opacity-50 cursor-not-allowed' : ''
					}`}
					disabled={loading}>
					{loading ? 'Adding...' : 'ADD TO CART'}
				</button>
			</div>

			{/* Popup */}
			{popupVisible && (
				<Popup
					visible={popupVisible}
					onClose={() => setPopupVisible(false)}
					selectedProduct={selectedProduct}
					selectedSize={selectedSize}
					selectedColor={selectedColor}
					selectedShirt={selectedShirt}
					resetSelectedSize={resetSelectedSize}
					resetSelectedColor={resetSelectedColor}
				/>
			)}
		</div>
	);
};

export default TShirtSelector;
