import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { setCart, increaseQuantity, decreaseQuantity, removeItem } from '../store/cartSlice';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Cart = () => {
	const cart = useSelector((state) => state.cart.items || []);

	const navigate = useNavigate();
	const [ loading, setLoading ] = useState(true);
	const dispatch = useDispatch();

	useEffect(() => {
		const fetchCartData = async () => {
			const token = localStorage.getItem('authToken');

			if (!token) {
				console.error('❌ No auth token found! Redirecting to login.');
				navigate('/login');
				return;
			}

			try {
				const response = await fetch('http://localhost:5000/api/cart', {
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
				dispatch(setCart(data.cart || []));
			} catch (error) {
				console.error('❌ Error fetching cart data:', error.message);
				toast.error('Failed to fetch cart data. Please try again later.');
			} finally {
				setLoading(false);
			}
		};

		fetchCartData();
	}, [dispatch,navigator]);

	if (loading) {
		return <p className='text-center text-gray-500'>Loading cart...</p>;
	}

	if (cart.length === 0) {
		return (
			<div className='text-center'>
				<img src={img} alt='emptycart' className='w-96 mx-auto' />
				<p className='text-gray-500 mt-4'>Your cart is empty.</p>
			</div>
		);
	}

	const totalAmount = cart.reduce((total, item) => total + (item.price || 0) * (item.quantity || 1), 0);
	const shippingCost = 50;
	const totalWithShipping = totalAmount + shippingCost;

	const handleCheckout = (e) => {
		e.preventDefault();
		navigate('/checkout');
	};

	const handleIncrease = async (item) => {
		const token = localStorage.getItem('authToken');

		if (!token) {
			toast.error('You need to log in first!');
			navigate('/login');
			return;
		}

		try {
			const response = await axios.post(
				'http://localhost:5000/api/cart/add',
				{
					productId: item.product?._id,
					quantity: item.quantity + 1,
					size: item.size,
					color: item.color,
					method: item.method,
					position: item.position,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'application/json',
					},
					withCredentials: true,
				},
			);

			dispatch(increaseQuantity(item.product?._id));
			toast.success(`${item.title} added to cart!`);
		} catch (error) {
			console.error('❌ Error adding to cart:', error.response?.data?.message || error.message);
			toast.error(error.response?.data?.message || 'Failed to add product to cart. Try again!');
		}
	};

	return (
		<div className='mx-16 my-8'>
			<ToastContainer />
			<h1 className='text-2xl font-bold mb-4'>Shopping Cart</h1>
			<div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
				<div className='lg:col-span-2'>
					{cart.map((item, index) => (
						<div
							key={item._id || index}
							className='cart-item flex items-center space-x-4 bg-white shadow-md rounded-md p-4'>
							<img
								src={item.frontImage || item.image || 'default-image.jpg'}
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
								{item.method && <p className='text-gray-600 text-sm'>Method: {item.method}</p>}
								{item.textLine && <p className='text-gray-600 text-sm'>Text line: {item.textLine}</p>}
								{item.font && <p className='text-gray-600 text-sm'>Font: {item.font}</p>}
								{item.notes && <p className='text-gray-600 text-sm'>Notes: {item.notes}</p>}
								{item.position && <p className='text-gray-600 text-sm'>Position: {item.position}</p>}
								{item.logo && (
									<div className='mt-2'>
										<p className='text-gray-600 text-sm'>Selected Logo:</p>
										<img
											src={URL.createObjectURL(item.logo)}
											alt='Selected Logo'
											className='w-12 h-12 object-contain border rounded-md'
											onError={(e) => {
												console.error('Image failed to load:', e.target.src);
												e.target.style.display = 'none';
											}}
										/>
									</div>
								)}

								<div className='flex items-center mt-2'>
									<button
										onClick={() => dispatch(decreaseQuantity(item.product?._id))}
										className='bg-red-500 text-white px-2 py-1 rounded-md'
										disabled={item.quantity <= 1}>
										−
									</button>
									<p className='text-gray-600 text-sm mx-4'>{item.quantity}</p>
									<button onClick={() => handleIncrease(item)} className='bg-blue-500 text-white px-2 py-1 rounded-md'>
										+
									</button>
								</div>

								<button
									onClick={() => dispatch(removeItem(item.product?._id))}
									className='mt-2 text-red-500 text-sm underline hover:text-red-700'>
									Remove
								</button>
							</div>
						</div>
					))}
				</div>

				<div className='p-4 bg-white shadow-lg shadow-gray-300 rounded-md'>
					<h2 className='text-lg font-bold text-gray-800 mb-4'>The total amount of</h2>
					<p className='text-gray-600 text-sm'>Total amount: Rs. {totalAmount.toFixed(2)}</p>
					<p className='text-gray-600 text-sm'>Shipping: Rs. {shippingCost.toFixed(2)}</p>
					<p className='text-gray-800 font-bold text-lg mt-2'>Total: Rs. {totalWithShipping.toFixed(2)}</p>
					<button
						onClick={handleCheckout}
						className='mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600'>
						Go to Checkout
					</button>
				</div>
			</div>
		</div>
	);
};

export default Cart;
