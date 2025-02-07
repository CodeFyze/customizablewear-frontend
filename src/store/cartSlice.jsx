import { createSlice } from "@reduxjs/toolkit";

// Initial state for the cart slice
const initialState = [];

// Create a slice for managing the cart state
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Action to add an item to the cart
    add(state, action) {
      // Check if the item is already in the cart
      const existingItem = state.find(item => item.id === action.payload.id);
      if (existingItem) {
        // If the item exists, increase its quantity
        existingItem.quantity += 1;
      } else {
        // If the item doesn't exist, add it to the cart with a quantity of 1
        state.push({ ...action.payload, quantity: 1 });
      }
    },
    // Action to remove an item from the cart
    remove(state, action) {
      // Filter out the item with the provided ID from the cart
      return state.filter(item => item.id !== action.payload);
    },
    // Action to increase the quantity of an item in the cart
    increaseQuantity(state, action) {
      const item = state.find(item => item.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },
    // Action to decrease the quantity of an item in the cart
    decreaseQuantity(state, action) {
      const item = state.find(item => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },
  },
});

// Extract the action creators
export const { add, remove, increaseQuantity, decreaseQuantity } = cartSlice.actions;

// Export the reducer function
export default cartSlice.reducer;
