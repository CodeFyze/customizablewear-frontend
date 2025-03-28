import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCart, increaseQuantity, decreaseQuantity, removeItem } from '../store/cartSlice';
import { useNavigate } from 'react-router-dom';
import img from '../assets/images/empty-cart.png';

const apiUrl = import.meta.env.VITE_API_BASE_URL;

const Cart = () => {
	const cart = useSelector((state) => state.cart.items || []);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchCartData = async () => {
			const token = localStorage.getItem('authToken');

			if (!token) {
				console.error('❌ No auth token found! Redirecting to login.');
				navigate('/login');
				return;
			}

			try {
				const response = await fetch(`${apiUrl}/cart`, {
					method: 'GET',
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'application/json',
					},
					credentials: 'include',
				});

				if (!response.ok) {
					throw new Error(`HTTP error! Status: ${response.status}`);
				}

				const data = await response.json();
				dispatch(setCart(data.cart?.products || data.cart || []));
			} catch (error) {
				console.error('❌ Error fetching cart data:', error.message);
			} finally {
				setLoading(false);
			}
		};

		fetchCartData();
	}, [dispatch, navigate]);

	// Optimistic UI Update for increasing quantity
const handleIncrease = async (item) => {
	const token = localStorage.getItem('authToken');

	if (!token) {
		console.error('You need to log in first!');
		navigate('/login');
		return;
	}

	try {
		// Make API call first
		const response = await fetch(`${apiUrl}/cart/increase/${item._id}`, {
			method: 'PUT',
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
			credentials: 'include',
		});

		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}

		const updatedCartItem = await response.json();
		console.log('Response after increase:', updatedCartItem);

		// Only update UI after success
		 dispatch(increaseQuantity(updatedCartItem?.updatedCart?._id || item._id));
	} catch (error) {
		console.error('❌ Error increasing quantity:', error.message);
	}
};

	// Optimistic UI Update for decreasing quantity
	const handleDecrease = async (item) => {
		const token = localStorage.getItem('authToken');

		if (!token) {
			console.error('You need to log in first!');
			navigate('/login');
			return;
		}


		try {
			const response = await fetch(`${apiUrl}/cart/decrease/${item._id}`, {
				method: 'PUT',
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json',
				},
				credentials: 'include',
			});

			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
		dispatch(decreaseQuantity(item._id));

			console.log('Response after decrease:', await response.json());
		} catch (error) {
			console.error('❌ Error decreasing quantity:', error.message);
			// dispatch(increaseQuantity(item._id));
		}
	};

	// Function to handle removal of an item from the cart
	const handleRemove = async (productId) => {
		const token = localStorage.getItem('authToken');

		if (!token) {
			console.error('You need to log in first!');
			navigate('/login');
			return;
		}

		try {
			const response = await fetch(`${apiUrl}/cart/remove/${productId}`, {
				method: 'DELETE',
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json',
				},
				credentials: 'include',
			});

			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}

			const data = await response.json();
			const deletedCartId = data?.deletedProduct?._id;
			console.log('Response after removal:', data?.deletedProduct?._id);

			// Dispatch the removeItem action to instantly remove the item from Redux
			dispatch(removeItem(deletedCartId));
		} catch (error) {
			console.error('❌ Error removing item:', error.message);
		}
	};

	if (loading) {
		return <p className='text-center text-gray-500'>Loading cart...</p>;
	}

	if (!Array.isArray(cart)) {
		console.error('❌ Cart data is not an array:', cart);
		return <p className='text-center text-gray-500'>Error loading cart.</p>;
	}

	const totalAmount = cart.reduce((total, item) => total + (item.price || 0) * (item.quantity || 1), 0);
	const shippingCost = 50;
	const totalWithShipping = totalAmount + shippingCost;

	const handleCheckout = () => {
		navigate('/checkout');
	};

	return (
		<div className='mx-16 my-8'>
			<h1 className='text-2xl font-bold mb-4'>Shopping Cart</h1>
			<div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
				<div className='lg:col-span-2'>
					{cart.length === 0 ? (
						<div className='text-center'>
							<img src={img} alt='emptycart' className='w-96 mx-auto' />
							<p className='text-gray-500 mt-4'>Your cart is empty.</p>
						</div>
					) : (
						cart.map((item, index) => (
							<div
								key={item.productId || index}
								className='cart-item flex items-center space-x-4 bg-white shadow-md rounded-md p-4'>
								<img
									src={item.frontImage || 'default-image.jpg'}
									alt={item.title}
									className='w-20 h-20 object-cover rounded-md'
									onError={(e) => {
										e.target.src = 'default-image.jpg';
									}}
								/>

								<div className='flex-1'>
									<h2 className='text-lg font-bold'>{item.title}</h2>
									<p className='text-gray-600 text-sm'>Size: {item.size || 'Not selected'}</p>
									<p className='text-gray-600 text-sm flex items-center'>
										Color:
										<span
											className='w-5 h-5 ml-2 inline-block border border-gray-400 rounded-full'
											style={{ backgroundColor: item.color || '#ccc' }}></span>
									</p>

									{/* Show method and position only if method is not "Not selected" */}
									{item.method !== 'Not selected' && (
										<>
											<p className='text-gray-600 text-sm'>Method: {item.method}</p>
											<p className='text-gray-600 text-sm'>Position: {item.position || 'Not selected'}</p>
										</>
									)}

									{/* Conditional Display for Logo OR Text Customization */}
									{item.logo ? (
										<div className='mt-3'>
											<p className='text-sm text-gray-600'>Uploaded Logo:</p>
											<img
												src={item.logo}
												alt='Uploaded Logo'
												className='w-16 h-16 object-cover border border-gray-300 rounded-md'
											/>
										</div>
									) : (
										item.method === 'print' && (
											<div>
												<p className='text-gray-600 text-sm'>Text Line: {item.textLine || 'Not provided'}</p>
												<p className='text-gray-600 text-sm'>Font: {item.font || 'Not provided'}</p>
												<p className='text-gray-600 text-sm'>Notes: {item.notes || 'Not provided'}</p>
											</div>
										)
									)}

									{/* Quantity Control */}
									<div className='flex items-center mt-2'>
										<button
											onClick={() => handleDecrease(item)}
											className='bg-red-500 text-white px-2 py-1 rounded-md'
											disabled={item.quantity <= 1}>
											−
										</button>
										<p className='text-gray-600 text-sm mx-4'>{item.quantity}</p>
										<button
											onClick={() => handleIncrease(item)}
											className='bg-blue-500 text-white px-2 py-1 rounded-md'>
											+
										</button>
									</div>

									<button
										onClick={() => handleRemove(item._id)} // Pass the product._id correctly
										className='mt-2 text-red-500 text-sm underline hover:text-red-700'>
										Remove
									</button>
								</div>
							</div>
						))
					)}
				</div>

				<div className='p-4 bg-white shadow-lg shadow-gray-300 rounded-md'>
					<h2 className='text-lg font-bold text-gray-800 mb-4'>The total amount of</h2>
					<p className='text-gray-600 text-sm'>Total amount: Rs. {totalAmount.toFixed(2)}</p>
					<p className='text-gray-600 text-sm'>Shipping: Rs. {shippingCost.toFixed(2)}</p>
					<p className='text-gray-800 font-bold text-lg mt-2'>Total: Rs. {totalWithShipping.toFixed(2)}</p>
					<button
						className='mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600'
						onClick={handleCheckout}>
						Go to Checkout
					</button>
				</div>
			</div>
		</div>
	);
};

export default Cart;
