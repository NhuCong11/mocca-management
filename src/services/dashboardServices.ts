/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosResponse } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { callApi, HttpMethod } from '@/utils/apiUtils';
import { RejectValueError, StatisticalProps } from '@/types';

export const getStatisticalData = createAsyncThunk<any, StatisticalProps, RejectValueError>(
  'dashboard/getStatisticalData',
  async (statisticalBy, { rejectWithValue }) => {
    try {
      const res: AxiosResponse = await callApi(HttpMethod.POST, `/v1/dashboards/statistical-data`, null, statisticalBy);
      return res;
    } catch (error: any) {
      return rejectWithValue({ ...error });
    }
  },
);

export const getStatisticalRevenue = createAsyncThunk<any, StatisticalProps, RejectValueError>(
  'dashboard/getStatisticalRevenue',
  async (statisticalBy, { rejectWithValue }) => {
    try {
      const res: AxiosResponse = await callApi(
        HttpMethod.POST,
        `/v1/dashboards/statistical-revenue`,
        {},
        statisticalBy,
      );
      return res;
    } catch (error: any) {
      return rejectWithValue({ ...error });
    }
  },
);

export const getStatisticalPerformance = createAsyncThunk<any, StatisticalProps, RejectValueError>(
  'dashboard/getStatisticalPerformance',
  async (statisticalBy, { rejectWithValue }) => {
    try {
      const res: AxiosResponse = await callApi(
        HttpMethod.POST,
        `/v1/dashboards/statistical-performance`,
        {},
        statisticalBy,
      );
      return res;
    } catch (error: any) {
      return rejectWithValue({ ...error });
    }
  },
);

export const getTopSellingProducts = createAsyncThunk<any, void, RejectValueError>(
  'dashboard/getTopSellingProducts',
  async (_, { rejectWithValue }) => {
    try {
      const res: AxiosResponse = await callApi(HttpMethod.GET, `/v1/dashboard/top-selling-products`, {}, null);
      return res;
    } catch (error: any) {
      return rejectWithValue({ ...error });
    }
  },
);
