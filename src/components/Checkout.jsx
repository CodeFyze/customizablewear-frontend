import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const Checkout = () => {
	const cart = useSelector((state) => state.cart.items) || [];
	console.log(cart);
	const promoCode = useSelector((state) => state.promoCode);
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

	const [loading, setLoading] = useState(false);

	const totalAmount = cart.reduce((total, item) => total + (item.price || 0) * (item.quantity || 1), 0);

	const discountedAmount = totalAmount - (totalAmount * (promoCode.discount || 0)) / 100;

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
	};

	const getGroupedProducts = () => {
		return cart.reduce((acc, item) => {
			const productId = item._id?.toString() || item.id?.toString() || 'UNKNOWN_ID';
			const existingProduct = acc.find((p) => p.productId === productId);
			if (existingProduct) {
				existingProduct.quantity += item.quantity || 1;
			} else {
				acc.push({
					productId,
					title: item.title || 'Untitled Product',
					frontImage: item.frontImage || '',
					price: item.price || 0,
					size: item.size || 'Default',
					color: item.color || 'Default',
					logo: item.logo || '',
					quantity: item.quantity || 1,
					method: item.method || 'Not selected',
					position: item.position || 'Not selected',
				});
			}
			return acc;
		}, []);
	};

	const handlePlaceOrder = async () => {
		if (!formData.firstName || !formData.address || !formData.email || !formData.phone) {
			toast.error('Please fill in all required fields.');
			console.log('Missing Fields:', formData);
			return;
		}

		setLoading(true);
		const token = localStorage.getItem('authToken');

		if (!token) {
			console.error('No auth token found! Redirecting to login.');
			toast.error('Session expired. Please log in again.');
			navigate('/login');
			return;
		}

		const orderData = {
			shippingAddress: {
				firstName: formData.firstName,
				lastName: formData.lastName || 'N/A',
				companyName: formData.companyName || 'N/A',
				address: formData.address,
				email: formData.email,
				phone: formData.phone,
				additionalInfo: formData.additionalInfo || '',
				sameAsBilling: formData.sameAsShipping,
			},
			products: getGroupedProducts(),
			totalAmount,
			promoCode: promoCode.code || '',
			discount: promoCode.discount || 0,
			finalAmount: discountedAmount,
			paymentMode: formData.paymentMode,
		};

		console.log('🚀 Sending Order Data:', JSON.stringify(orderData, null, 2));

		try {
			const response = await fetch('http://localhost:5000/api/orders/create', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				credentials: 'include',
				body: JSON.stringify(orderData),
			});

			const responseData = await response.json();

			if (response.status === 401) {
				console.error('Unauthorized access - Token expired.');
				toast.error('Session expired. Please log in again.');
				localStorage.removeItem('authToken');
				navigate('/login');
				return;
			}

			if (response.ok) {
				Swal.fire({
					icon: 'success',
					title: 'Order Placed Successfully!',
					text: 'Thank you for your purchase.',
				});
				navigate('/success');
			} else {
				console.error('Order placement failed:', responseData);
				toast.error(responseData.message || 'Failed to place order.');
			}
		} catch (error) {
			console.error('Error placing order:', error);
			toast.error('An error occurred while placing the order.');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='checkout-container mx-4 my-8'>
			<div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
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
						<button
							onClick={handlePlaceOrder}
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
