import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { FaTimes } from 'react-icons/fa';
import { addItem } from '../store/cartSlice';
import { useDispatch } from 'react-redux';

const apiUrl = import.meta.env.VITE_API_BASE_URL;

const AddTextLogoPopup = ({
	onBack,
	onFinish,
	selectedProduct,
	selectedSize,
	selectedColor,
	selectedMethod,
	selectedPosition,
	onClose,
	resetSelectedSize,
	resetSelectedColor,
}) => {
	const [textLine, setTextLine] = useState(selectedProduct?.textLine || '');
	const [font, setFont] = useState(selectedProduct?.font || 'Standard');
	const [notes, setNotes] = useState(selectedProduct?.notes || '');
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();

	// Font styles mapping
	const fontStyles = {
		Standard: 'font-sans', // Default font
		Serif: 'font-serif', // Serif font
		'Sans-serif': 'font-sans', // Sans-serif font
	};

	useEffect(() => {
		console.log('Product:', selectedProduct);
		console.log('Size:', selectedSize);
		console.log('Color:', selectedColor);
		console.log('Method:', selectedMethod);
		console.log('Position:', selectedPosition);
	}, [selectedProduct, selectedSize, selectedColor, selectedMethod, selectedPosition]);

	const handleFinish = async () => {
		// Validation
		if (!textLine.trim()) {
			toast.error('Please enter text for the logo.');
			return;
		}
		if (!selectedSize || !selectedSize.size) {
			toast.error('Please select a size before finishing.');
			return;
		}
		if (!selectedColor) {
			toast.error('Please select a color before finishing.');
			return;
		}
		if (!selectedMethod || selectedMethod.trim() === '') {
			toast.error('Please select a printing method before finishing.');
			return;
		}
		if (!selectedPosition || selectedPosition.trim() === '') {
			toast.error('Please select a logo position before finishing.');
			return;
		}

		const quantity =
			selectedSize?.quantity && Number.isInteger(Number(selectedSize.quantity)) && selectedSize.quantity > 0
				? selectedSize.quantity
				: 1;

		const requestData = {
			productId: selectedProduct?._id,
			title: selectedProduct?.title,
			frontImage: selectedProduct?.frontImage || selectedProduct?.image,
			size: selectedSize.size,
			color: selectedColor,
			quantity,
			method: selectedMethod,
			position: selectedPosition,
			textLine,
			font,
			notes,
		};

		console.log('request data-->', requestData);
		dispatch(addItem(requestData));
		try {
			setLoading(true);

			const response = await fetch(`${apiUrl}/cart/add`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				credentials:"include",
				body: JSON.stringify(requestData),
			});

			const data = await response.json();
			if (response.ok) {
				Swal.fire({
					title: 'Added',
					text: 'Item added to cart',
					icon: 'success',
				});
				onFinish();
				// Reset selected color and size
				resetSelectedColor();
				resetSelectedSize();
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

	return (
		<div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
			<div className='bg-white rounded-lg shadow-lg p-6 max-w-lg w-full mx-4 relative'>
				{/* Close Button */}
				<button onClick={onClose} className='absolute top-4 right-4 text-red-600 hover:text-red-700 p-2'>
					<FaTimes size={20} />
				</button>

				<div className='text-center'>
					<h2 className='text-2xl font-bold mb-2'>Add Your Text Logo</h2>
					<p className='text-gray-600 mb-4'>
						Create your text logo, we have no setup fees! We will always send a design proof for your approval before
						production.
					</p>
					{selectedProduct?.frontImage && (
						<img
							src={selectedProduct.frontImage}
							alt={selectedProduct.title}
							className='w-32 h-auto mx-auto mt-2 border rounded-md'
						/>
					)}
				</div>
				<div className='space-y-4'>
					{/* Text Line Input */}
					<div>
						<label className='block text-sm font-medium text-gray-700 mb-1'>Text Line</label>
						<input
							type='text'
							value={textLine}
							onChange={(e) => setTextLine(e.target.value)}
							placeholder='Enter your text'
							className='w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-500'
						/>
					</div>

					{/* Font Selection */}
					<div>
						<label className='block text-sm font-medium text-gray-700 mb-1'>Font</label>
						<select
							value={font}
							onChange={(e) => setFont(e.target.value)}
							className='w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-500'>
							<option>Standard</option>
							<option>Serif</option>
							<option>Sans-serif</option>
						</select>
					</div>

					{/* Text Preview */}
					<div>
						<h3 className='text-lg font-semibold mb-2'>Text Preview</h3>
						<div className='bg-black text-center py-3 rounded-md'>
							<span
								className={`px-4 py-2 bg-orange-500 text-white font-bold rounded-md ${fontStyles[font]}`} // Apply selected font
							>
								{textLine || 'Preview Text'}
							</span>
						</div>
						<p className='text-sm text-gray-500 mt-1'>Please note: The black box is for preview purposes only.</p>
					</div>

					{/* Notes */}
					<div>
						<label className='block text-sm font-medium text-gray-700 mb-1'>Notes</label>
						<textarea
							value={notes}
							onChange={(e) => setNotes(e.target.value)}
							placeholder='Leave a message'
							className='w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-500'
						/>
					</div>
				</div>

				{/* Action Buttons */}
				<div className='flex justify-between mt-6'>
					<button
						onClick={onBack}
						className='bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 focus:outline-none'>
						Back
					</button>
					<button
						onClick={handleFinish}
						className={`mt-4 bg-orange-500 text-white  ml-10 py-2 px-4 rounded-lg hover:bg-orange-600 ${
							loading ? 'opacity-50 cursor-not-allowed' : ''
						}`}
						disabled={loading}>
						{loading ? 'Adding...' : 'Finish'}
					</button>
				</div>
			</div>
		</div>
	);
};

export default AddTextLogoPopup;
