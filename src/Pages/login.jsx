import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Audio } from 'react-loader-spinner';
import { loginSuccess } from '../store/authSlice'; // Import Redux action
import { FaEye, FaEyeSlash, FaTimes } from 'react-icons/fa'; // Import eye and close icons

const LoginPage = () => {
	const [isLogin, setIsLogin] = useState(true);
	const [loading, setLoading] = useState(false); // <-- Added state for loader
	const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
	const dispatch = useDispatch();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const navigate = useNavigate();

	const onSubmit = async (data) => {
		console.log('🚀 Sending login request:', data);

		try {
			setLoading(true); // ✅ Start loading before API call
			const response = await fetch('http://localhost:5000/api/auth/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				credentials: 'include',
				body: JSON.stringify(data),
			});

			const result = await response.json();
			console.log('🚀 Response from server:', result);

			if (response.ok && result.success) {
				toast.success('✅ Login successful!');
				localStorage.setItem('authToken', result.token);
				localStorage.setItem('userId', result.user?.id);

				dispatch(
					loginSuccess({
						token: result.token,
						user: result.user,
					}),
				);

				navigate(result.user?.role === 'seller' ? '/seller' : '/');
			} else {
				toast.error(result.message || 'Invalid email or password.');
			}
		} catch (error) {
			console.error('Login error:', error);
			toast.error('❌ An error occurred during login. Please try again.');
		} finally {
			setLoading(false); // ✅ Stop loading after request finishes
		}
	};


	// Function to handle the close button click
	const handleClose = () => {
		navigate(-1); // Navigate back to the previous page
	};

	return (
		<div className='flex items-center justify-center p-8 min-h-screen bg-gray-100'>
			<div className=' w-full max-w-md bg-white rounded-lg shadow-lg p-8 relative'>
				<div className='flex items-center justify-center min-h-screen bg-gray-100'>
					<div className='w-full max-w-md bg-white rounded-lg shadow-lg p-8 relative'>
						{/* Background overlay when loading */}
						{loading && (
							<div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-lg z-50'>
								<Audio height='100' width='100' color='white' ariaLabel='loading' />
							</div>
						)}

						{/* Close Button */}
						<button onClick={handleClose} className='absolute top-4 right-4 text-gray-500 hover:text-gray-700 p-2'>
							<FaTimes size={20} />
						</button>

						<h2 className='text-2xl font-semibold text-center text-gray-800 mb-6'>{isLogin ? 'Login' : 'Signup'}</h2>
						<form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
							<div className='flex flex-col'>
								<label className='text-sm font-medium text-gray-600'>Email</label>
								<input
									type='email'
									placeholder='Enter your email'
									className='mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500'
									{...register('email', { required: 'Email is required' })}
								/>
								{errors.email && <span className='text-sm text-red-500 mt-1'>{errors.email.message}</span>}
							</div>

							<div className='flex flex-col relative'>
								<label className='text-sm font-medium text-gray-600'>Password</label>
								<input
									type={showPassword ? 'text' : 'password'} // Toggle between text and password
									placeholder='Enter your password'
									className='mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500'
									{...register('password', { required: 'Password is required' })}
								/>
								{/* Eye icon to toggle password visibility */}
								<button
									type='button'
									onClick={() => setShowPassword(!showPassword)}
									className='absolute right-3 top-10 text-gray-500 hover:text-gray-700'>
									{showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
								</button>
								{errors.password && <span className='text-sm text-red-500 mt-1'>{errors.password.message}</span>}
							</div>

							<button type='submit' className='w-full bg-[#fc8019] text-white py-2  rounded-md hover:bg-[#e57312] focus:shadow-lg focus:border-orange-600 focus:ring focus:ring-orange-400 focus:ring-opacity-50 outline-none duration-500'>
								Login
							</button>
						</form>

						<div className='mt-4 text-center'>
							<span className='text-sm text-gray-600'>Don't have an account?</span>
							<button onClick={() => navigate('/signup')} className='ml-2 text-[#fc8019] hover:underline duration-700'>
								Sign up
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
