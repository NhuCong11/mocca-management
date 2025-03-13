/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UNKNOWN_ERROR } from '@/constants';
import { ActionRejectedType } from '../store';
import { cancelOrder, changeStatus, getOrdersByStatus } from '@/services/ordersServices';

interface OrdersState {
  loading: boolean;
  orders: null;
  error: string | null;
}

const initialState: OrdersState = {
  loading: false,
  orders: null,
  error: null,
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get Orders By Status
      .addCase(getOrdersByStatus.pending, (state) => {
        state.loading = true;
        state.orders = null;
        state.error = null;
      })
      .addCase(getOrdersByStatus.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.orders = action?.payload?.data;
        state.error = null;
      })
      .addCase(getOrdersByStatus.rejected, (state, action: ActionRejectedType) => {
        state.loading = false;
        state.orders = null;
        state.error = action?.payload?.message || UNKNOWN_ERROR;
      })
      // Change Order Status
      .addCase(changeStatus.pending, (state) => {
        state.loading = true;
        state.orders = null;
        state.error = null;
      })
      .addCase(changeStatus.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.orders = action?.payload?.data;
        state.error = null;
      })
      .addCase(changeStatus.rejected, (state, action: ActionRejectedType) => {
        state.loading = false;
        state.orders = null;
        state.error = action?.payload?.message || UNKNOWN_ERROR;
      })
      // Cancel Order
      .addCase(cancelOrder.pending, (state) => {
        state.loading = true;
        state.orders = null;
        state.error = null;
      })
      .addCase(cancelOrder.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.orders = action?.payload?.data;
        state.error = null;
      })
      .addCase(cancelOrder.rejected, (state, action: ActionRejectedType) => {
        state.loading = false;
        state.orders = null;
        state.error = action?.payload?.message || UNKNOWN_ERROR;
      });
  },
});

export default ordersSlice.reducer;
