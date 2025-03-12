import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes, FaHome, FaBoxOpen, FaShoppingCart, FaInfoCircle } from 'react-icons/fa';
import logo from '../assets/images/logo.jpeg';
import { useSelector } from 'react-redux';
import { logout } from '../store/authSlice';

const Navigation = () => {
	const [isOpen, setIsOpen] = useState(false);
	const cartItems = useSelector((state) => state.cart.items);
	const totalCartQuantity = cartItems.reduce((total, item) => total + (item.quantity || 1), 0);
	const { token, userId, isAuthenticated } = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	// Toggle menu for mobile view
	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};
	console.log(isAuthenticated);

	return (
		<nav className='bg-white shadow-lg'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 '>
				<div className='flex items-center justify-between h-16  w-full'>
					<div className='flex-shrink-0 '>
						<Link to='/'>
							<div className=''>
								<img className=' h-7 md:h-7 lg:h-7 xl:h-7' src={logo} alt='logo' />
							</div>
							<span className='font-bold items-center border-b-[3px] hover:border-[#e57312] transition duration-500'>
								rofessoR
							</span>
							<span className=' font-bold border-b-[3px] hover:border-[#4bf6d4] transition duration-800'>Store</span>
						</Link>
					</div>

					{/* Desktop Menu */}
					<div className='hidden sm:block sm:ml-6'>
						<div className='flex space-x-2 md:space-x-8'>
							<NavLink to='/' icon={<FaHome />} text='Home' className='text-red-300' />
							<NavLink to='/products' text='Products' className='text-red-300' />
							<NavLink to='/about' text='About' className='text-red-300' />
							<NavLink to='/contact' text='Contact' className='text-red-300' />
							{!isAuthenticated && (
								<>
									<NavLink to='/signup' text='Sign Up' />
									<NavLink to='/login' text='Login' />
								</>
							)}
						</div>
					</div>

					{/* Cart Icon */}
					<div className={`absolute right-14 flex items-center pr-2 sm:static  sm:ml-6 sm:pr-0`}>
						<Link to='/cart' className='items-center   '>
							<div className='relative right-0 sm:right-4 md:top-0 lg:top-0  xl:top-0 '>
								<FaShoppingCart className='h-6 w-6 sm:h-8 sm:w-8 md:w-6 text-gray-700' />

								{totalCartQuantity > 0 && (
									<span className='absolute top-0 right-0 inline-flex items-center justify-center px-1 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full'>
										{totalCartQuantity}

									</span>
								)}
							</div>
						</Link>
					</div>

					{/* Mobile Menu Button */}
					<div className='flex sm:hidden'>
						<button
							onClick={toggleMenu}
							className='inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out'>
							<FaBars className='h-6 w-6' />
						</button>
					</div>
				</div>
			</div>

			{/* Mobile Menu */}
			<div className={`fixed top-0 right-0 z-10 h-full w-2/3 bg-white shadow-lg transform ${isOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 ease-in-out sm:hidden`}>
				<div className='flex justify-end p-4'>
					

					<button onClick={toggleMenu} className='text-gray-600'>
						<FaTimes className='h-6 w-6' />
					</button>
				</div>
				<div className='px-2 pt-2 pb-3 mx-auto space-y-1'>
					<NavLinkMobile to='/' text='Home' onClick={toggleMenu} />
					<NavLinkMobile to='/products' text='Products' onClick={toggleMenu} />
					<NavLinkMobile to='/about' text='About' onClick={toggleMenu} />
					<NavLinkMobile to='/contact' text='Contact' onClick={toggleMenu} />
					<NavLinkMobile to='/login' text='Login' onClick={toggleMenu} />
					<NavLinkMobile to='/Signup' text='Sign up' onClick={toggleMenu} />
					{/* <NavLinkMobile to='/cart' text='Cart' onClick={toggleMenu}  /> */}
				</div>
			</div>
		</nav>
	);
};

// NavLink for Desktop
const NavLink = ({ to, icon, text }) => (
	<Link
		to={to}
		className='flex items-center font-semibold text-gray-700 hover:text-orange-500 transition duration-300 relative group'>
		<span className='mr-2'>{icon}</span>
		<span>{text}</span>
		<span className='absolute bottom-0 left-0 w-full bg-[#4bf6d4] h-0.5 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left'></span>
	</Link>
);

// NavLink for Mobile
const NavLinkMobile = ({ to, text, onClick }) => (
	<Link
		to={to}
		onClick={onClick}
		className='block py-2 px-3 text-base font-medium text-gray-700  relative group'>
		<span>{text}</span>
		<span className='absolute bottom-0 left-0 w-full border-[1px] h-0.5   origin-left'></span>
	</Link>
);

export default Navigation;
