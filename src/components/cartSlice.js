import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
addToCart: (state, action) => {
    const existingItem = state.find(item => item.id === action.payload.id);
    if (existingItem) {
      existingItem.count += 1;
    } else {
      state.push({ ...action.payload }); // ✅ Keeps title, id, price, count
    }
  },
    increaseQuantity: (state, action) => {
      const item = state.find(item => item.id === action.payload);
      if (item) {
        item.count += 1;
      }
  },
    decreaseQuantity: (state, action) => {
      const item = state.find(item => item.id === action.payload);
      if (item) {
        item.count -= 1;
        if (item.count <= 0) {
          state.splice(state.indexOf(item), 1);
        }
      }
    },
    removeFromCart: (state, action) => {
      return state.filter(item => item.id !== action.payload);
    },
    clearCart: (state) => {
      return [];
    }
  },
});

export const { addToCart, increaseQuantity, decreaseQuantity, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
