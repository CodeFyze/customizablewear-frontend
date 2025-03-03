import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OrderDetails = () => {
	const [orders, setOrders] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const navigate = useNavigate();
	const API_URL = 'http://localhost:5000/api/orders';

	useEffect(() => {
		const fetchOrders = async () => {
			try {
				const token = localStorage.getItem('authToken');
				if (!token) {
					setError('Unauthorized - Please log in.');
					setLoading(false);
					return;
				}

				const response = await fetch(API_URL, {
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
	}, []);

	// ✅ Function to navigate to order details
	const viewOrderDetails = (orderId) => {
		navigate(`/orders/${orderId}`);
	};

	return (
		<div className='p-4'>
			<h1 className='text-2xl font-semibold text-gray-800 mb-6'>Orders</h1>

			{loading && <p className='text-center text-gray-500'>Loading...</p>}
			{error && <p className='text-center text-red-500'>{error}</p>}

			{!loading && !error && orders.length > 0 && (
				<div className='overflow-x-auto bg-white shadow rounded-lg'>
					<table className='w-full table-auto'>
						<thead className='bg-gray-600 text-white'>
							<tr>
								<th className='px-4 py-3 text-left text-sm font-medium'>Order ID</th>
								<th className='px-4 py-3 text-left text-sm font-medium'>Date</th>
								<th className='px-4 py-3 text-left text-sm font-medium'>Status</th>
								<th className='px-4 py-3 text-left text-sm font-medium'>Total Amount</th>
							</tr>
						</thead>
						<tbody>
							{orders.map((order, index) => (
								<tr
									key={order._id}
									className={`$ {index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100 cursor-pointer`}
									onClick={() => viewOrderDetails(order._id)} // ✅ Navigate on click
								>
									<td className='px-4 py-3 text-gray-700 text-sm'>{order._id}</td>
									<td className='px-4 py-3 text-gray-700 text-sm'>{new Date(order.createdAt).toLocaleDateString()}</td>
									<td
										className={`px-4 py-3 text-sm font-medium ${
											order.status === 'Delivered'
												? 'text-green-600'
												: order.status === 'Shipped'
												? 'text-blue-600'
												: order.status === 'Cancelled'
												? 'text-red-600'
												: 'text-yellow-600'
										}`}>
										{order.status}
									</td>
									<td className='px-4 py-3 text-gray-700 text-sm'>${order.finalAmount.toFixed(2)}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}

			{!loading && !error && orders.length === 0 && <p className='text-center text-gray-500'>No orders found.</p>}
			<ToastContainer position='top-right' autoClose={3000} />
		</div>
	);
};

export default OrderDetails;
