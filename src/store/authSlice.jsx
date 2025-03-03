import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	token: localStorage.getItem('authToken') || null,
	userId: localStorage.getItem('userId') || null,
	isAuthenticated: !!localStorage.getItem('authToken'), // Checks if token exists
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		loginSuccess: (state, action) => {
			state.token = action.payload.token;
			state.userId = action.payload.userId;
			state.isAuthenticated = true;
		},
		logout: (state) => {
			console.log("hello")
			state.token = null;
			state.userId = null;
			state.isAuthenticated = false;
			localStorage.removeItem('authToken'); // Ensure token is removed
			localStorage.removeItem('userId');
			localStorage.clear()
		},
	},
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
