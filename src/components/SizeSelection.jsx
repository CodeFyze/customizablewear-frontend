import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '../store/cartSlice'; // Correct action import
import Popup from './shirtpopup';

const SizeSelection = ({ selectedProduct, onSizeSelect, selectedSize }) => {
	const [sizes, setSizes] = useState([]);
	const [popupVisible, setPopupVisible] = useState(false);
	const dispatch = useDispatch();
	

	// Fetch the sizes data when the component is mounted
	useEffect(() => {
		if (selectedProduct) {
			const fetchProductSizes = async () => {
        try {
					// Fetch the product data from the backend
					const response = await fetch(`http://localhost:5000/products/${selectedProduct._id}`);
					const data = await response.json();

					if (data.success && data.product) {
						// Set the sizes based on the data fetched from the backend
						setSizes(
							data.product.size.map((size) => ({
								size,
								price: 6.42, // You can modify this to match your backend data
								originalPrice: 8.5, // Modify as per your backend data
								stock: 100, // Modify as per your backend data
								quantity: 0, // Initialize quantity to 0
							})),
						);
					} else {
						console.error('Failed to fetch product data:', data.message);
					}
				} catch (error) {
					console.error('Error fetching product sizes:', error);
				}
			};

			fetchProductSizes();
		}
	}, [selectedProduct]); // Run the effect when selectedProduct changes

	// Handle size selection
	const handleSizeClick = (size) => {
		const sizeDetails = sizes.find((s) => s.size === size);
		if (sizeDetails && sizeDetails.stock > 0) {
			// Deselect all other sizes
			const updatedSizes = sizes.map((s) => ({
				...s,
				quantity: s.size === size ? s.quantity : 0, // Reset quantity for other sizes
			}));
			setSizes(updatedSizes);

			// Pass the selected size to the parent component
			onSizeSelect(sizeDetails);
		} else {
			onSizeSelect(null);
		}
	};

	// Handle quantity change (increase or decrease)
	const handleQuantityChange = (size, action) => {
		setSizes((prevSizes) => {
			const updatedSizes = prevSizes.map((s) =>
				s.size === size
					? {
							...s,
							quantity: action === 'increase' ? s.quantity + 1 : Math.max(0, s.quantity - 1),
					  }
					: s,
			);

			const selected = updatedSizes.find((s) => s.size === size && s.quantity > 0);

			if (selected) {
				onSizeSelect(selected);
			} else {
				onSizeSelect(null);
			}

			return updatedSizes;
		});
	};

	return (
		<div className='max-w-4xl mx-auto p-6 md:mb-5'>
			<div className='text-xl font-semibold mb-4'>Select Size</div>
			<div className='space-y-4'>
				{sizes.map((size) => {
					const isSelected = selectedSize?.size === size.size;
					const isAvailable = size.stock > 0;

					return (
						<div key={size.size} className='flex justify-between items-center'>
							{/* Size and Price Section */}
							<div className='flex items-center'>
								{/* Size Button */}
								<button
									className={`py-2 px-4 rounded-lg border border-gray-300 ${
										isSelected
											? 'bg-orange-500 text-white border-orange-500'
											: isAvailable
											? 'hover:bg-orange-500 hover:text-white hover:border-orange-500'
											: 'bg-gray-200 text-gray-500 cursor-not-allowed'
									}`}
									onClick={() => handleSizeClick(size.size)}
									disabled={!isAvailable}>
									{size.size}
								</button>

								{/* Price Display */}
								<div className='ml-4'>
									<span className='line-through text-red-600 mr-2'>£{size.originalPrice}</span>
									<span className='text-lg font-semibold text-gray-700'>£{size.price.toFixed(2)}</span>
								</div>
							</div>

							{/* Quantity Controls */}
							<div className='flex items-center'>
								<button
									onClick={() => handleQuantityChange(size.size, 'decrease')}
									className={`text-lg bg-gray-200 px-2 py-1 rounded-md mr-2 ${
										!isSelected ? 'opacity-50 cursor-not-allowed' : ''
									}`}
									disabled={!isSelected || size.quantity === 0}>
									-
								</button>
								<span className='text-lg'>{size.quantity}</span>
								<button
									onClick={() => handleQuantityChange(size.size, 'increase')}
									className={`text-lg bg-gray-200 px-2 py-1 rounded-md ml-2 ${
										!isSelected ? 'opacity-50 cursor-not-allowed' : ''
									}`}
									disabled={!isSelected || size.quantity >= size.stock}>
									+
								</button>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default SizeSelection;
