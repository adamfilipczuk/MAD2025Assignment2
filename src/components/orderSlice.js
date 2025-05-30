import { createSlice } from '@reduxjs/toolkit';

const orderSlice = createSlice({
  name: 'orders',
  initialState: [],
  reducers: {
    setOrders: (state, action) => action.payload,
    updateOrderStatus: (state, action) => {
      const { orderID, isPaid, isDelivered } = action.payload;
      const order = state.find(order => order.id === orderID);
      if (order) {
        order.isPaid = isPaid;
        order.isDelivered = isDelivered;
      }
    },
    addOrder: (state, action) => {
      state.push(action.payload);
    },
    deleteOrder: (state, action) => {
      const index = state.findIndex(order => order.id === action.payload);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
  },
});

export const { setOrders, updateOrderStatus, addOrder, deleteOrder } = orderSlice.actions;
export default orderSlice.reducer;
