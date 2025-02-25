import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart: (state, action) => {
      console.log("✅ Cart data in Redux (Final Check):", action.payload);
      state.items = action.payload; // Set the cart items from the API response
    },
    
    addItem: (state, action) => {
      const { productId, size, color, method, position, textLine, font, notes, quantity } = action.payload;

      // Check if the item already exists in the cart
      const existingItem = state.items.find(
        (item) =>
          item.productId === productId &&
          item.size === size &&
          item.color === color &&
          item.method === method &&
          item.position === position
      );

      if (existingItem) {
        // Increase quantity if the same product exists
        existingItem.quantity += quantity || 1;
      } else {
        // Add new item to the cart
        state.items.push({
          ...action.payload,
          textLine: textLine || "",  // ✅ Ensure these fields are stored
          font: font || "",
          notes: notes || "",
          quantity: quantity || 1
        });
      }
    },

    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.productId !== action.payload);
    },

    increaseQuantity: (state, action) => {
      const item = state.items.find((item) => item.productId === action.payload);
      if (item) item.quantity += 1;
    },

    decreaseQuantity: (state, action) => {
      const item = state.items.find((item) => item.productId === action.payload);
      if (item && item.quantity > 1) item.quantity -= 1;
    },
  },
});

export const { setCart, addItem, removeItem, increaseQuantity, decreaseQuantity } = cartSlice.actions;

export default cartSlice.reducer;
