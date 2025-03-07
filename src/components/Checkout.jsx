import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Audio } from 'react-loader-spinner';
import Swal from 'sweetalert2';
import { applyPromoCode } from '../store/promoCodeSlice'; // ✅ Fixed import

const Checkout = () => {
	const cart = useSelector((state) => state.cart.items) || [];
	const promoCode = useSelector((state) => state.promoCode);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		companyName: '',
		address: '',
		email: '',
		phone: '',
		additionalInfo: '',
		sameAsShipping: true,
		paymentMode: 'Cash on Delivery',
	});

	const [enteredPromoCode, setEnteredPromoCode] = useState('');
	const [loading, setLoading] = useState(false);

	const totalAmount = cart.reduce((total, item) => total + (item.price || 0) * (item.quantity || 1), 0);

	const discountedAmount = totalAmount - (totalAmount * (promoCode.discount || 0)) / 100;

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
	};

	const handleApplyPromo = async () => {
		if (!enteredPromoCode) {
			toast.error('Please enter a promo code.');
			return;
		}

		try {
			const response = await fetch('http://localhost:5000/api/promo/validate', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ code: enteredPromoCode }),
			});

			const data = await response.json();

			if (response.ok) {
				dispatch(applyPromoCode(data)); // ✅ Fixed: Ensure data contains { code, discount }
				toast.success('Promo code applied successfully!');
			} else {
				toast.error(data.message || 'Invalid promo code.');
			}
		} catch (error) {
			console.error('Error applying promo code:', error);
			toast.error('Something went wrong.');
		}
	};

	return (
		<div className='checkout-container mx-4 my-8'>
			<div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
				{loading && (
					<div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-lg z-50'>
						<Audio height='100' width='100' color='white' ariaLabel='loading' />
					</div>
				)}
				<div>
					<h2 className='text-2xl font-bold mb-4'>Shipping Address</h2>
					<form>
						<div className='grid grid-cols-2 gap-4 mb-4'>
							<input
								type='text'
								name='firstName'
								placeholder='First Name'
								value={formData.firstName}
								onChange={handleChange}
								className='p-2 border rounded'
							/>
							<input
								type='text'
								name='lastName'
								placeholder='Last Name'
								value={formData.lastName}
								onChange={handleChange}
								className='p-2 border rounded'
							/>
						</div>
						<input
							type='text'
							name='companyName'
							placeholder='Company Name'
							value={formData.companyName}
							onChange={handleChange}
							className='p-2 border rounded w-full mb-4'
						/>
						<input
							type='text'
							name='address'
							placeholder='Address'
							value={formData.address}
							onChange={handleChange}
							className='p-2 border rounded w-full mb-4'
						/>
						<input
							type='email'
							name='email'
							placeholder='Email'
							value={formData.email}
							onChange={handleChange}
							className='p-2 border rounded w-full mb-4'
						/>
						<input
							type='tel'
							name='phone'
							placeholder='Phone'
							value={formData.phone}
							onChange={handleChange}
							className='p-2 border rounded w-full mb-4'
						/>
						<textarea
							name='additionalInfo'
							placeholder='Additional Information'
							value={formData.additionalInfo}
							onChange={handleChange}
							className='p-2 border rounded w-full mb-4'
						/>
					</form>
				</div>
				<div>
					<h2 className='text-lg font-bold text-gray-800 mb-4'>The Total Amount</h2>
					<div className='bg-white shadow-lg rounded-md p-4 mb-4'>
						<p className='text-gray-600 text-sm'>Total Amount: ${totalAmount.toFixed(2)}</p>
						{promoCode.code && (
							<p className='text-green-600 text-sm'>
								Promo Code Applied: {promoCode.code} ({promoCode.discount || 0}% off)
							</p>
						)}
						<p className='text-gray-800 font-bold text-lg mt-2'>
							Total (Including VAT): ${discountedAmount.toFixed(2)}
						</p>

						{/* Promo Code Input Field */}
						<div className='flex items-center mt-4'>
							<input
								type='text'
								placeholder='Enter Promo Code'
								value={enteredPromoCode}
								onChange={(e) => setEnteredPromoCode(e.target.value)}
								className='p-2 border rounded w-full'
							/>
							<button
								onClick={handleApplyPromo}
								className='ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300'>
								Apply
							</button>
						</div>

						<button
							onClick={() => toast.info('Order placed successfully!')}
							disabled={loading}
							className='mt-4 w-full bg-yellow-500 text-white py-2 rounded-md hover:bg-yellow-600 transition duration-300'>
							{loading ? 'Placing Order...' : 'PLACE ORDER'}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Checkout;
