import React, { useState } from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
	const apiUrl = import.meta.env.VITE_API_BASE_URL; 
const Contact = () => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		message: '',
	});
	const [loading, setLoading] = useState(false); // Loading state
	const navigate = useNavigate();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!formData.name || !formData.email || !formData.message) {
			toast.error('All fields are required!');
			return;
		}

		setLoading(true); // Show loader

		try {
			const response = await fetch(`${apiUrl}/contact`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(formData),
			});

			const result = await response.json();
			setLoading(false); // Hide loader after response

			if (!response.ok) {
				throw new Error(result.error || 'Failed to send message');
			}

			// Handle  user response
				Swal.fire({
					title: 'Success!',
					text: 'Your message has been submitted!',
					icon: 'success',
					confirmButtonColor: '#fc8019',
				});
				// Swal.fire({
				// 	title: 'Submitted Again!',
				// 	text: 'Your response has been submitted again!',
				// 	icon: 'info',
				// 	confirmButtonColor: '#fc8019',
				// });

			setFormData({ name: '', email: '', message: '' });

			if (result.token) {
				navigate(`/verify-email/${result.token}`);
			}
		} catch (error) {
			setLoading(false);
			toast.error('Something went wrong. Please try again.');
		}
	};

	return (
		<div className='bg-gray-100 py-16'>
			<div className='max-w-7xl mx-auto px-6 lg:px-8'>
				<h2 className='text-3xl font-bold text-gray-800 text-center mb-12'>Contact Us</h2>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
					<div className='bg-white p-8 shadow-lg rounded-lg'>
						<h3 className='text-2xl font-bold text-gray-800 mb-4'>Get in Touch</h3>
						<form className='space-y-4' onSubmit={handleSubmit}>
							<div>
								<label htmlFor='name' className='block text-gray-600'>
									Name
								</label>
								<input
									type='text'
									id='name'
									name='name'
									value={formData.name}
									onChange={handleChange}
									className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-[#fc8019]'
									placeholder='Your Name'
									disabled={loading}
								/>
							</div>
							<div>
								<label htmlFor='email' className='block text-gray-600'>
									Email
								</label>
								<input
									type='email'
									id='email'
									name='email'
									value={formData.email}
									onChange={handleChange}
									className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-[#fc8019]'
									placeholder='Your Email'
									disabled={loading}
								/>
							</div>
							<div>
								<label htmlFor='message' className='block text-gray-600'>
									Message
								</label>
								<textarea
									id='message'
									name='message'
									value={formData.message}
									onChange={handleChange}
									className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-[#fc8019]'
									rows='4'
									placeholder='Your Message'
									disabled={loading}></textarea>
							</div>
							<button
								type='submit'
								className='w-full py-3 bg-[#fc8019] text-white rounded-lg hover:bg-[#e57312] transition duration-300 flex items-center justify-center'
								disabled={loading}>
								{loading ? (
									<span className='flex items-center'>
										<svg
											className='animate-spin h-5 w-5 mr-2 text-white'
											viewBox='0 0 24 24'
											fill='none'
											xmlns='http://www.w3.org/2000/svg'>
											<circle
												className='opacity-25'
												cx='12'
												cy='12'
												r='10'
												stroke='currentColor'
												strokeWidth='4'></circle>
											<path
												className='opacity-75'
												fill='currentColor'
												d='M4 12a8 8 0 018-8v4l4-4-4-4v4a8 8 0 00-8 8H4z'></path>
										</svg>
										Sending...
									</span>
								) : (
									'Send Message'
								)}
							</button>
						</form>
					</div>
					<div className='space-y-8'>
						<div className='bg-white p-8 shadow-lg rounded-lg'>
							<h3 className='text-2xl font-bold text-gray-800 mb-4'>Contact Information</h3>
							<ul className='text-gray-600'>
								<li className='mb-4'>
									<strong>Address:</strong> 123 Main Street, Nawabshah, Pakistan
								</li>
								<li className='mb-4'>
									<strong>Phone:</strong> +92300-1234567
								</li>
								<li className='mb-4'>
									<strong>Email:</strong> majidalijkhion@gmail.com
								</li>
							</ul>
						</div>
						<div className='bg-white p-8 shadow-lg rounded-lg'>
							<h3 className='text-2xl font-bold text-gray-800 mb-4'>Follow Us</h3>
							<div className='flex space-x-4'>
								<a
									href='https://www.facebook.com'
									target='_blank'
									rel='noopener noreferrer'
									className='p-3 bg-gray-200 rounded-full hover:bg-gray-300 transition duration-300'>
									<FaFacebookF />
								</a>
								<a
									href='https://www.twitter.com'
									target='_blank'
									rel='noopener noreferrer'
									className='p-3 bg-gray-200 rounded-full hover:bg-gray-300 transition duration-300'>
									<FaTwitter />
								</a>
								<a
									href='https://www.instagram.com'
									target='_blank'
									rel='noopener noreferrer'
									className='p-3 bg-gray-200 rounded-full hover:bg-gray-300 transition duration-300'>
									<FaInstagram />
								</a>
								<a
									href='https://www.linkedin.com'
									target='_blank'
									rel='noopener noreferrer'
									className='p-3 bg-gray-200 rounded-full hover:bg-gray-300 transition duration-300'>
									<FaLinkedinIn />
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Contact;
