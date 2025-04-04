import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCart, increaseQuantity, decreaseQuantity, removeItem } from '../store/cartSlice';
import { useNavigate } from 'react-router-dom';
import img from '../assets/images/empty-cart.png';
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import { RiDeleteBin4Line } from "react-icons/ri";
import { BiCheckShield } from "react-icons/bi";


const apiUrl = import.meta.env.VITE_API_BASE_URL;

const Cart = () => {
	const cart = useSelector((state) => state.cart.items || []);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchCartData = async () => {
		
			try {
				const response = await fetch(`${apiUrl}/cart`, {
					method: 'GET',
					headers: {
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
				navigate("/login")
			} finally {
				setLoading(false);
			}
		};

		fetchCartData();
	}, [dispatch, navigate]);

	// Optimistic UI Update for increasing quantity
const handleIncrease = async (item) => {
	

	try {
		// Make API call first
		const response = await fetch(`${apiUrl}/cart/increase/${item._id}`, {
			method: 'PUT',
			headers: {
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
			dispatch(decreaseQuantity(item._id));
	}
};

	// Optimistic UI Update for decreasing quantity
	const handleDecrease = async (item) => {
		
		try {
			const response = await fetch(`${apiUrl}/cart/decrease/${item._id}`, {
				method: 'PUT',
				headers: {
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
			dispatch(increaseQuantity(item._id));

}
	};

	// Function to handle removal of an item from the cart
	const handleRemove = async (productId) => {
	

		try {
			const response = await fetch(`${apiUrl}/cart/remove/${productId}`, {
				method: 'DELETE',
				headers: {
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
		<div className='mx-auto my-8 container min-h-96 px-6 md:px-10 pt-8'>
			<h1 className='text-2xl font-bold mb-4'>Shopping Cart</h1>
			<div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3  '>
				<div className=' md:col-span-2 lg:col-span-2 flex flex-col '>
					{cart.length === 0 ? (
						<div className='text-center'>
							<img src={img} alt='emptycart' className='w-96 mx-auto' />
							<p className='text-gray-500 mt-4'>Your cart is empty.</p>
						</div>
					) : (
						cart.map((item, index) => (
							<div
								key={item.productId || index}
								className='cart-item flex items-center m-2 bg-white shadow-md rounded-md'>
								<div className=' m-3 w-20 rounded-md '>
									<img
										src={item.frontImage || 'default-image.jpg'}
										alt={item.title}
										className=' object-cover rounded-md'
										onError={(e) => {
											e.target.src = 'default-image.jpg';
										}}
									/>
								</div>

								<div className='  my-2 flex justify-between items-center w-full h-full '>
									<div className=''>
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
									</div>

									{/* Quantity Control */}
									<div className='flex  flex-col sm:flex-row items-center gap-x-2 mx-2'>
										<div className=' border-gray-300 border-[1px] flex items-center  rounded-full'>

											<button
												onClick={() => handleDecrease(item)}
												className={`${item.quantity <= 1 ? 'border-gray-300 text-gray-400 bg-gray-200' : 'border-gray-300 text-gray-600'}  px-3 py-2 rounded-full border-[1px] `}
												disabled={item.quantity <= 1}>
												<FaMinus className='inline-block  text-gray-600' />
											</button>
											<p className='text-gray-600 text-sm  px-4'>{item.quantity}</p>
											<button
												onClick={() => handleIncrease(item)}
												className='  px-3 py-2 rounded-full border-[1px] border-gray-300'>
												<FaPlus className='inline-block text-gray-600' />
											</button>
										</div>
										<div className='flex items-center'>
											<p className='inline-block font-semibold'> {item.price}:00</p>
										</div>

										<button
											onClick={() => handleRemove(item._id)} // Pass the product._id correctly
											className=' text-xl text-red-500  underline hover:text-red-700'>
											<RiDeleteBin4Line className='inline-block' />
										</button>
									</div>
								</div>

							</div>
						))
					)}
				</div>
				<div className='md:col-span-1 lg:col-span-1 '>
					<div className='static  md:fixed md:w-2/6 xl:w-auto  p-4 bg-white h-auto  px-10  shadow-lg shadow-gray-300 rounded-md'>
						
						<h2 className='text-xl md:text-md font-bold text-nowrap text-black mb-4 mx-7'>Order Summary</h2>
						<div className='flex justify-between'>
						<p className='text-gray-800 text-sm'>Total amount: </p>
						<p className='text-gray-800 text-md font-bold'>Rs. {totalAmount.toFixed(2)}</p>
						</div>
						<div className='flex justify-between mb-3'>
						<p className='text-gray-800 text-sm'>Shipping: </p>
						<p className='text-gray-800 text-md font-bold'>Rs. {shippingCost.toFixed(2)}</p>
						</div>
						<hr className='border-gray-700'/>
						<div className='flex justify-between mt-3'>
						<p className='text-gray-800 font-bold text-lg mt-2'>Total: </p>
						<p className='mt-2 font-bold'>Rs. {totalWithShipping.toFixed(2)}</p>
						</div>
						
						<button
							className='mt-4 w-full bg-[#091638] text-white py-2 rounded-full flex items-center justify-center gap-2'
							onClick={handleCheckout}>
							<BiCheckShield  className='inline-block'/> Checkout
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Cart;
