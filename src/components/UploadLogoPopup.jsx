import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '../store/cartSlice';
import PropTypes from 'prop-types';
import { FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';

const apiUrl = import.meta.env.VITE_API_BASE_URL;

const UploadLogoPopup = ({
	onBack,
	onClose,
	selectedProduct,
	selectedSize,
	selectedPosition,
	selectedMethod,
	selectedColor,
	resetSelectedSize,
	resetSelectedColor,
}) => {
	const [userId, setUserId] = useState(null);
	const [selectedFile, setSelectedFile] = useState(null);
	const [previewURL, setPreviewURL] = useState(null);
	const [previousLogo, setPreviousLogo] = useState(null);
	const [usePreviousLogo, setUsePreviousLogo] = useState(false);
	const [loading, setLoading] = useState(false); // State for loader
	const dispatch = useDispatch();
	const {id} = useSelector((state) => state.auth.user || []);

	useEffect(() => {
		const fetchPreviousLogo = async () => {
			try {
				// const storedUserId = localStorage.getItem('userId');
				setUserId(id);

				if (!id) {
					toast.error('User ID is missing! Please login.');
					return;
				}

				const response = await fetch(`${apiUrl}/orders/order-user/${id}`, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
					},
					credentials: 'include',
				});

				const data = await response.json();
				if (response.ok && data.orders) {
					console.log('✅ Orders Fetched:', data.orders);

					const lastOrderWithLogo = data.orders.find((order) =>
						order.products.some((product) => product.logo && product.logo !== ''),
					);

					if (lastOrderWithLogo) {
						const productWithLogo = lastOrderWithLogo.products.find((product) => product.logo && product.logo !== '');

						if (productWithLogo) {
							console.log('✅ Previous Logo Found:', productWithLogo.logo);
							setPreviousLogo(productWithLogo.logo);
						}
					}
				} else {
					toast.error(data.message || 'No orders found.');
				}
			} catch (error) {
				toast.error('Error fetching previous logo. Please try again.');
				console.error('❌ Error fetching previous logo:', error.message);
			} finally {
				setLoading(false); // Stop loading
			}
		};

		fetchPreviousLogo();
	}, []);

	const handleFileChange = (event) => {
		const file = event.target.files[0];
		if (file) {
			setSelectedFile(file);
			setUsePreviousLogo(false); // Switch to the new file upload

			// ✅ Generate preview URL for the new logo
			const reader = new FileReader();
			reader.onload = () => {
				setPreviewURL(reader.result);
			};
			reader.readAsDataURL(file);
		}
	};

	const handleRemoveFile = () => {
		setSelectedFile(null);
		setPreviewURL(null);
	};

	const handleUsePreviousLogo = () => {
		if (previousLogo) {
			setUsePreviousLogo(true);
			setSelectedFile(null);
			setPreviewURL(null); // Clear the new logo preview
		} else {
			toast.error('No previous logo found.');
		}
	};

	const handleFinish = async () => {
		console.log('Selected Size:', selectedSize);
		console.log('Selected Color:', selectedColor);
		console.log('Selected Method:', selectedMethod);
		console.log('Selected Position:', selectedPosition);
		console.log('Selected File:', selectedFile);
		console.log('Using Previous Logo:', usePreviousLogo ? 'Yes' : 'No');

		if (!selectedFile && !usePreviousLogo) {
			toast.error('Please upload a logo or use your previous logo before finishing.');
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

		try {
			setLoading(true); // Start loading

			const formData = new FormData();
			formData.append('productId', selectedProduct._id);
			formData.append('title', selectedProduct?.title || 'Custom T-Shirt');
			formData.append('size', selectedSize?.size);
			formData.append('color', selectedColor);
			formData.append('quantity', quantity);
			formData.append('price', selectedProduct?.price || 200);
			formData.append('usePreviousLogo', usePreviousLogo);

			if (usePreviousLogo) {
				formData.append('logo', previousLogo);
			} else {
				formData.append('logo', selectedFile);
			}

			formData.append('method', selectedMethod);
			formData.append('position', selectedPosition);

			const response = await fetch(`${apiUrl}/cart/add`, {
				method: 'POST',
				// headers: { Authorization: `Bearer ${token}` },
				credentials: 'include',
				body: formData,
			});

			const data = await response.json();
			console.log('🛒 API Response:', data);
			dispatch(
				addItem({
					productId: selectedProduct._id,
					title: selectedProduct?.title || 'Custom T-Shirt',
					size: selectedSize?.size,
					color: selectedColor,
					quantity: quantity,
					price: selectedProduct?.price || 200,
					usePreviousLogo: usePreviousLogo,
				}),
			);
			// Dispatch after successful API call
			console.log('formData-->', formData);

			if (response.ok) {
				Swal.fire({
					title: 'Added!',
					text: 'Item successfully added to cart!',
					icon: 'success',
					confirmButtonText: 'OK',
				});
				onClose();
				// Reset selected color and size
				resetSelectedColor();
				resetSelectedSize();
			} else {
				toast.error(data.message || 'Failed to add item to cart.');
			}
		} catch (error) {
			toast.error('An error occurred while adding to the cart.');
			console.error('❌ Error adding to cart:', error.message);
		} finally {
			setLoading(false); // Stop loading
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
					<h2 className='text-2xl font-bold mb-2'>Upload Your Logo</h2>
					<p className='text-gray-600 mb-4'>Upload with confidence, we have no setup fees!</p>
					<p className='text-gray-600'>Currently Selected Shirt: {selectedProduct?.title}</p>
					{selectedProduct?.frontImage && (
						<img src={selectedProduct.frontImage} alt='Selected Shirt' className='w-32 h-auto mx-auto mt-2' />
					)}
				</div>

				<div className='space-y-4'>
					{/* Upload New Logo */}
					<label htmlFor='file-upload' className='cursor-pointer'>
						<div className='bg-orange-500 text-white py-2 px-6 rounded-md hover:bg-orange-600 flex items-center justify-center mx-auto mb-3'>
							Upload New Logo
						</div>
						<input
							id='file-upload'
							type='file'
							accept='.jpg,.png,.eps,.ai,.pdf'
							className='hidden'
							onChange={handleFileChange}
						/>
					</label>

					{previewURL && (
						<div className='text-center'>
							<img src={previewURL} alt='New Logo' className='w-32 h-auto mx-auto border rounded-md' />
							<p className='text-red-500 text-sm mt-2'>An additional $5 will be charged for this new logo.</p>
						</div>
					)}

					{/* Use Previous Logo */}
					{previousLogo && (
						<button
							onClick={handleUsePreviousLogo}
							className='mt-3 text-blue-500 underline text-sm hover:text-blue-700'>
							Use Previous Logo
						</button>
					)}

					{usePreviousLogo && previousLogo && (
						<img src={previousLogo} alt='Previous Logo' className='w-32 h-auto mx-auto mt-2 border rounded-md' />
					)}
				</div>

				<div className='flex justify-between mt-6'>
					<button onClick={onBack} className='bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600'>
						Back
					</button>
					<button
						onClick={handleFinish}
						className={`bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 ${
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

UploadLogoPopup.propTypes = {
	onBack: PropTypes.func.isRequired,
	onClose: PropTypes.func.isRequired,
	selectedProduct: PropTypes.object,
	selectedSize: PropTypes.object,
	selectedPosition: PropTypes.string,
	selectedMethod: PropTypes.string,
	selectedColor: PropTypes.string,
};

export default UploadLogoPopup;
