import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		email: '',
		phone: '',
		password: '',
		role: 'user',
	});

	const navigate = useNavigate();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch('http://localhost:5000/api/auth/signup', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			});
			console.log(response);
			if (response.ok) {
				alert('Sign Up Successful');
				//   navigate("/otp");
				navigate('/login');
			} else {
				alert('Error during sign up');
			}
		} catch (error) {
			console.error('Error:', error);
			alert('An error occurred while signing up');
		}
	};

	return (
		<div className='h-full flex justify-center items-center'>
			<div className='p-8 w-full max-w-6xl'>
				<h2 className='text-2xl font-semibold text-center text-gray-700 mb-6'>Sign Up</h2>
				<form onSubmit={handleSubmit} className='space-y-6'>
					<div>
						<label htmlFor='firstName' className='block text-sm font-medium text-gray-600'>
							First Name
						</label>
						<input
							type='text'
							name='firstName'
							id='firstName'
							value={formData.firstName}
							onChange={handleChange}
							required
							className='mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600'
						/>
					</div>
					<div>
						<label htmlFor='lastName' className='block text-sm font-medium text-gray-600'>
							Last Name
						</label>
						<input
							type='text'
							name='lastName'
							id='lastName'
							value={formData.lastName}
							onChange={handleChange}
							required
							className='mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600'
						/>
					</div>
					<div>
						<label htmlFor='email' className='block text-sm font-medium text-gray-600'>
							Email Address
						</label>
						<input
							type='email'
							name='email'
							id='email'
							value={formData.email}
							onChange={handleChange}
							required
							className='mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600'
						/>
					</div>
					<div>
						<label htmlFor='phone' className='block text-sm font-medium text-gray-600'>
							Phone Number
						</label>
						<input
							type='number'
							name='phone'
							id='phone'
							value={formData.phone}
							onChange={handleChange}
							required
							className='mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600'
						/>
					</div>
					<div>
						<label htmlFor='password' className='block text-sm font-medium text-gray-600'>
							Password
						</label>
						<input
							type='password'
							name='password'
							id='password'
							value={formData.password}
							onChange={handleChange}
							required
							className='mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600'
						/>
					</div>
					<div>
						<label htmlFor='role' className='block text-sm font-medium text-gray-600'>
							Role
						</label>
						<select
							name='role'
							id='role'
							value={formData.role}
							onChange={handleChange}
							className='mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600'>
							<option value='user'>User</option>
							<option value='seller'>Seller</option>
						</select>
					</div>
					<div className='flex justify-center'>
						<button
							type='submit'
							className='w-full bg-indigo-600 text-white p-3 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600'>
							Sign Up
						</button>
					</div>
				</form>

				<div className='mt-4 text-center text-sm text-gray-600'>
					<p>
						Already have an account?{' '}
						<a href='/login' className='text-indigo-600 hover:text-indigo-700'>
							Login here
						</a>
					</p>
				</div>
			</div>
		</div>
	);
};

export default SignUp;
