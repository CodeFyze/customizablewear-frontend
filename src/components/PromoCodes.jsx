import React, { useState, useEffect } from 'react';

const PromoCodes = () => {
	const [promoCodes, setPromoCodes] = useState([]);
	const [code, setCode] = useState('');
	const [discount, setDiscount] = useState('');

	const API_URL = 'http://localhost:5000/api/promocodes/all';

	// useEffect(() => {
	// 	fetchPromoCodes();
	// }, []);

	// const fetchPromoCodes = async () => {
	// 	const token = localStorage.getItem('authToken'); // Retrieve token from localStorage

	// 	if (!token) {
	// 		console.error('No auth token found, redirecting to login');
	// 		return;
	// 	}

	// 	try {
	// 		const response = await fetch(API_URL, {
	// 			method: 'GET',
	// 			headers: {
	// 				'Content-Type': 'application/json',
	// 				Authorization: `Bearer ${token}`, // Attach token
	// 			},
	// 			credentials: 'include', // Ensure cookies are sent (if needed)
	// 		});

	// 		if (!response.ok) {
	// 			console.error('Failed to fetch promo codes');
	// 			return;
	// 		}

	// 		const data = await response.json();
	// 		setPromoCodes(data);
	// 	} catch (error) {
	// 		console.error('Error fetching promo codes:', error);
	// 	}
	// };

	const addPromoCode = async (e) => {
		e.preventDefault();
		const token = localStorage.getItem('authToken');

		if (!token) {
			console.error('No auth token found, redirecting to login');
			return;
		}

		const newCode = { code, discount: parseFloat(discount) };

		try {
			const response = await fetch('http://localhost:5000/api/promocodes/create', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(newCode),
			});

			if (response.ok) {
				fetchPromoCodes(); // Refresh the list after adding
				setCode('');
				setDiscount('');
			} else {
				console.error('Failed to add promo code');
			}
		} catch (error) {
			console.error('Error adding promo code:', error);
		}
	};

	return (
		<div className='p-4'>
			<h2 className='text-xl font-bold mb-4'>Manage Promo Codes</h2>
			<form onSubmit={addPromoCode} className='mb-4'>
				<input
					type='text'
					placeholder='Promo Code'
					value={code}
					onChange={(e) => setCode(e.target.value)}
					className='border p-2 mr-2'
					required
				/>
				<input
					type='number'
					placeholder='Discount %'
					value={discount}
					onChange={(e) => setDiscount(e.target.value)}
					className='border p-2 mr-2'
					required
				/>
				<button type='submit' className='bg-orange-500 text-white p-2'>
					Add Code
				</button>
			</form>

			<ul>
				{promoCodes.map((promo) => (
					<li key={promo.id} className='p-2 border mb-2'>
						{promo.code} - {promo.discount}% Off
					</li>
				))}
			</ul>
		</div>
	);
};

export default PromoCodes;
