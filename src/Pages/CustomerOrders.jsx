import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const CustomerOrders = () => {
	const { customerId } = useParams();
	const [orders, setOrders] = useState([]);
	const [loading, setLoading] = useState(true);
	const [ error, setError ] = useState(null);
	
		const apiUrl = import.meta.env.VITE_API_BASE_URL; 

	useEffect(() => {
		const fetchOrders = async () => {
			try {
				const token = localStorage.getItem('authToken');
				if (!token) {
					setError('Unauthorized - Please log in.');
					setLoading(false);
					return;
				}

				const response = await fetch(`${apiUrl}/orders/order-user/${customerId}`, {
					method: 'GET',
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'application/json',
					},
				});

				const data = await response.json();
				if (!response.ok) throw new Error(data.message || 'Failed to fetch orders');

				setOrders(data.orders);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		fetchOrders();
	}, [customerId]);

	return (
		<div className='p-6 max-w-6xl mx-auto'>
			<h1 className='text-3xl font-bold text-gray-800 mb-6 text-center'>Customer Order History</h1>

			{loading && <p className='text-center text-gray-500'>Loading...</p>}
			{error && <p className='text-center text-red-500'>{error}</p>}

			{!loading && !error && orders.length > 0 && (
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
					{orders.map((order) => (
						<div key={order._id} className='bg-white shadow-lg rounded-lg p-6 border border-gray-200'>
							{/* Order Header */}
							<div className='flex justify-between items-center border-b pb-4'>
								<div>
									<h2 className='text-xl font-bold'>Order #{order._id.slice(-6).toUpperCase()}</h2>
									<p className='text-gray-500'>Placed on: {new Date(order.createdAt).toLocaleDateString()}</p>
								</div>
								<span
									className={`px-3 py-1 rounded-full text-sm font-semibold ${
										order.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
									}`}>
									{order.status}
								</span>
							</div>

							{/* Order Details */}
							<div className='mt-4'>
								<p className='text-gray-600'>
									<strong>Total Amount:</strong> ${order.finalAmount.toFixed(2)}
								</p>
								<p className='text-gray-600'>
									<strong>Payment:</strong> {order.paymentMode} ({order.paymentStatus})
								</p>
							</div>

							{/* Products */}
							<div className='mt-6'>
								<h3 className='text-lg font-semibold text-gray-700 border-b pb-2'>Products Ordered</h3>
								<div className='grid grid-cols-1 gap-4 mt-4'>
									{order.products.map((product) => (
										<div
											key={product.productId}
											className='bg-gray-50 p-4 rounded-lg shadow-sm border flex items-center gap-4'>
											<img src={product.frontImage} alt={product.title} className='w-24 h-24 object-cover rounded-md' />
											<div>
												<h4 className='text-md font-semibold'>{product.title}</h4>
												<p className='text-gray-500'>${product.price.toFixed(2)}</p>
												<p className='text-gray-500'>Size: {product.size}</p>
												<p className='text-gray-500 flex items-center'>
													Color:
													<span
														className='ml-2 w-4 h-4 rounded-full inline-block'
														style={{ backgroundColor: product.color }}></span>
												</p>
												{product.logo && <img src={product.logo} alt='Logo' className='w-10 h-10 rounded-md mt-1' />}
											</div>
										</div>
									))}
								</div>
							</div>
						</div>
					))}
				</div>
			)}

			{!loading && !error && orders.length === 0 && (
				<p className='text-center text-gray-500'>No orders found for this customer.</p>
			)}
		</div>
	);
};

export default CustomerOrders;
