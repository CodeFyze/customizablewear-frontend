import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { setCart, increaseQuantity, decreaseQuantity, removeItem } from '../store/cartSlice';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify'; // ✅ Import Toastify
import 'react-toastify/dist/ReactToastify.css'; // ✅ Import Toastify styles
import img from '../assets/images/empty-cart.png';

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
				const response = await fetch('http://localhost:5000/api/cart', {
					method: 'GET',
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'application/json',
					},
					credentials: 'include',
				});

				console.log('✅ Cart data received:', data);

				if (!response.ok) {
					throw new Error(`HTTP error! Status: ${response.status}`);
				}

				const data = await response.json();
				console.log('✅ Cart data fetched successfully:', data);
                    

				dispatch(setCart(data.cart?.products || data.cart || []));
			} catch (error) {
				console.error('❌ Error fetching cart data:', error.message);
			} finally {
				setLoading(false);
			}
		};

		fetchCartData();
	}, [dispatch, navigate]);

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

const handleIncrease = async (item) => {
	const token = localStorage.getItem('authToken'); // Get auth token

	if (!token) {
		toast.error('You need to log in first!');
		navigate('/login');
		return;
	}

	try {
		const response = await axios.post(
			'http://localhost:5000/api/cart/add',
      {
				productId:  item.product?._id, // ✅ Ensure correct ID
				quantity: item.quantity + 1, // ✅ Rename from quantity to finalQuantity
				size: item.size,
				color: item.color,
				method: item.method,
				position: item.position,
			},
			{
				headers: {
					Authorization: `Bearer ${token}`, // ✅ Include token in headers
					'Content-Type': 'application/json',
				},
				withCredentials: true, // ✅ If using cookies for auth
			},
		);

		dispatch(increaseQuantity(item.product?._id)); // Update Redux state

		toast.success(`${item.title} added to cart!`, {
			position: 'top-right',
			autoClose: 2000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			theme: 'colored',
    });
    
let    count = 0
    const arr = response.data.cart.products;

    for (let { quantity } of arr) {
      if (quantity > 1) {
        console.log("barhe ha")
        count++
        arr[quantity]
        
      }
    }
    console.log(count)
	} catch (error) {
		console.error('❌ Error adding to cart:', error.response?.data?.message || error.message);

		toast.error(error.response?.data?.message || 'Failed to add product to cart. Try again!', {
			position: 'top-right',
			autoClose: 2000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			theme: 'colored',
		});
	}
};



	return (
		<div className='mx-16 my-8'>
			<ToastContainer /> {/* ✅ Toast container for notifications */}
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
									<p className='text-gray-600 text-sm'>Method: {item.method || 'Not selected'}</p>
									<p className='text-gray-600 text-sm'>Position: {item.position || 'Not selected'}</p>

									{/* Quantity Control */}
									<div className='flex items-center mt-2'>
										<button
											onClick={() => dispatch(decreaseQuantity(item.productId))}
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
										onClick={() => dispatch(removeItem(item.productId))}
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
