/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UNKNOWN_ERROR } from '@/constants';
import { ActionRejectedType } from '../store';
import { getStatisticalData, getStatisticalPerformance, getStatisticalRevenue } from '@/services/dashboardServices';

export interface DashboardState {
  loading: boolean;
  dashboard: null;
  error: string | null;
}

const initialState: DashboardState = {
  loading: false,
  dashboard: null,
  error: null,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Statistical Data
      .addCase(getStatisticalData.pending, (state) => {
        state.loading = true;
        state.dashboard = null;
        state.error = null;
      })
      .addCase(getStatisticalData.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.dashboard = action?.payload?.data;
        state.error = null;
      })
      .addCase(getStatisticalData.rejected, (state, action: ActionRejectedType) => {
        state.loading = false;
        state.dashboard = null;
        state.error = action?.payload?.message || UNKNOWN_ERROR;
      })
      // Statistical Revenue
      .addCase(getStatisticalRevenue.pending, (state) => {
        state.loading = true;
        state.dashboard = null;
        state.error = null;
      })
      .addCase(getStatisticalRevenue.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.dashboard = action?.payload?.data;
        state.error = null;
      })
      .addCase(getStatisticalRevenue.rejected, (state, action: ActionRejectedType) => {
        state.loading = false;
        state.dashboard = null;
        state.error = action?.payload?.message || UNKNOWN_ERROR;
      })
      // Statistical Performance
      .addCase(getStatisticalPerformance.pending, (state) => {
        state.loading = true;
        state.dashboard = null;
        state.error = null;
      })
      .addCase(getStatisticalPerformance.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.dashboard = action?.payload?.data;
        state.error = null;
      })
      .addCase(getStatisticalPerformance.rejected, (state, action: ActionRejectedType) => {
        state.loading = false;
        state.dashboard = null;
        state.error = action?.payload?.message || UNKNOWN_ERROR;
      });
  },
});

export default dashboardSlice.reducer;
