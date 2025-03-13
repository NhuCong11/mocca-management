/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosResponse } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { callApi, HttpMethod } from '@/utils/apiUtils';
import { ChangeOrderStatus, RejectValueError } from '@/types';
import { OrderStatus } from '@/constants';

export const getOrdersByStatus = createAsyncThunk<any, OrderStatus, RejectValueError>(
  'order/getAll',
  async (status, { rejectWithValue }) => {
    try {
      const res: AxiosResponse = await callApi(HttpMethod.GET, `/v1/shops/orders?status=${status}`, {}, {});
      return res;
    } catch (error: any) {
      return rejectWithValue({ ...error });
    }
  },
);

export const changeStatus = createAsyncThunk<any, ChangeOrderStatus, RejectValueError>(
  'order/changeStatus',
  async ({ orderId, status }, { rejectWithValue }) => {
    try {
      const res: AxiosResponse = await callApi(HttpMethod.PUT, `/v1/orders/${orderId}/status`, {}, { status });
      return res;
    } catch (error: any) {
      return rejectWithValue({ ...error });
    }
  },
);

export const cancelOrder = createAsyncThunk<any, string, RejectValueError>(
  'order/cancel',
  async (orderId, { rejectWithValue }) => {
    try {
      const res: AxiosResponse = await callApi(HttpMethod.POST, `/v1/orders/${orderId}/cancel`, {}, {});
      return res;
    } catch (error: any) {
      return rejectWithValue({ ...error });
    }
  },
);
