import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	user: JSON.parse(localStorage.getItem('user')) || null,
	token: localStorage.getItem('authToken') || null,
	isAuthenticated: !!localStorage.getItem('authToken'),
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		loginSuccess: (state, action) => {
			state.user = action.payload.user;
			state.token = action.payload.token;
			state.isAuthenticated = true;

			// Persist token & user in localStorage
			localStorage.setItem('authToken', action.payload.token);
			localStorage.setItem('user', JSON.stringify(action.payload.user));
		},
		
	},
});


export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
