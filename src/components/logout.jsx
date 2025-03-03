import { FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../store/authSlice.jsx'; // Use react-router for navigation

export default function Logout() {
	const navigate = useNavigate(); // Initialize navigation function
const dispatch = useDispatch();
	const handleLogout = async () => {
		try {
			const response = await fetch('http://localhost:5000/api/auth/logout', {
				method: 'POST',
				credentials: 'include', // Ensures cookies are sent with the request
				headers: {
					'Content-Type': 'application/json',
				},
			});

      if (response.ok) {
        // Remove token from localStorage or cookies if necessary
				localStorage.removeItem('authToken');
      dispatch(logout());

				// Redirect user to login page
				navigate('/login');
			} else {
				console.error('Logout failed');
			}
		} catch (error) {
			console.error('Error during logout:', error);
		}
	};

	return (
		<div>
			<button
				onClick={handleLogout}
				className='flex items-center p-2 w-full text-left text-gray-700 hover:text-red-600 hover:bg-gray-100 rounded-lg transition'>
				<FaSignOutAlt className='mr-2' /> Logout
			</button>
		</div>
	);
}
