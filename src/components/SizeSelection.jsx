import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '../store/cartSlice'; // Correct action import
import Popup from './shirtpopup';

const SizeSelection = ({ selectedProduct, onSizeSelect, selectedSize }) => {
	const [sizes, setSizes] = useState([]);
	const [popupVisible, setPopupVisible] = useState(false);
	const dispatch = useDispatch();
	const apiUrl = import.meta.env.VITE_API_BASE_URL;

	// Fetch the sizes data when the component is mounted
	useEffect(() => {
		if (selectedProduct) {
			const fetchProductSizes = async () => {
				try {
					// Fetch the product data from the backend
					const response = await fetch(`${apiUrl}/products/${selectedProduct._id}`);
					const data = await response.json();

					if (data.success && data.product) {
						// Set the sizes based on the data fetched from the backend
						setSizes(
							data.product.size.map((size) => ({
								size,
								stock: 100, // Modify as per your backend data
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
			// Pass the selected size to the parent component
			onSizeSelect(sizeDetails);
		} else {
			onSizeSelect(null);
		}
	};

	return (
		<div className='max-w-4xl mx-auto p-6 md:mb-5'>
			<div className='text-xl font-semibold mb-4'>Select Size</div>

			{/* Size Buttons Grid */}
			<div className='flex flex-wrap gap-2'>
				{sizes.map((size) => {
					const isSelected = selectedSize?.size === size.size;
					const isAvailable = size.stock > 0;

					return (
						<button
							key={size.size}
							className={`py-2 px-4 rounded-lg border-2 ${
								isSelected
									? 'bg-transparent text-black border-black'
									: isAvailable
									? 'hover:transparent hover:text-black hover:border-black border-gray-300'
									: 'bg-gray-200 text-gray-500 cursor-not-allowed border-gray-200'
							}`}
							onClick={() => handleSizeClick(size.size)}
							disabled={!isAvailable}>
							{size.size}
						</button>
					);
				})}
			</div>
		</div>
	);
};

export default SizeSelection;