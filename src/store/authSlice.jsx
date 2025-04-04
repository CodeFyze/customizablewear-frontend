import { createSlice } from '@reduxjs/toolkit';
const apiUrl = import.meta.env.VITE_API_BASE_URL; 


const initialState = {
	token: null,
	user: null,
	isAuthenticated: null,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		loginSuccess: (state, action) => {
		state.token = action.payload.token;
			state.user = action.payload.user;
			state.isAuthenticated = true;
		},
		logout: (state) => {
			console.log("hello")
			state.token = null;
			state.user = null;
			state.isAuthenticated = false;
		},
	},
});

export const checkAuthStatus = () => async (dispatch) => {
	try {
		const response = await fetch(`${apiUrl}/auth/check`, {
			credentials: 'include', // Sends cookies
		});

		if (response.ok) {
			const userData = await response.json();
			dispatch(loginSuccess({ user: userData }));
		} else {
			dispatch(logout());
		}
	} catch (error) {
		dispatch(logout());
	} 
};
export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
