/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UNKNOWN_ERROR } from '@/constants';
import { ActionRejectedType } from '../store';
import { ProductInfo } from '@/types';
import {
  createProduct,
  deleteProductById,
  getAllProduct,
  getProductById,
  updateProductById,
} from '@/services/productsServices';

interface ProductsState {
  loading: boolean;
  products: ProductInfo[] | null;
  error: string | null;
}

const initialState: ProductsState = {
  loading: false,
  products: null,
  error: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get All Product
      .addCase(getAllProduct.pending, (state) => {
        state.loading = true;
        state.products = null;
        state.error = null;
      })
      .addCase(getAllProduct.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.products = action?.payload?.data;
        state.error = null;
      })
      .addCase(getAllProduct.rejected, (state, action: ActionRejectedType) => {
        state.loading = false;
        state.products = null;
        state.error = action?.payload?.message || UNKNOWN_ERROR;
      })
      // Create Product
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.products = null;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.products = action?.payload?.data;
        state.error = null;
      })
      .addCase(createProduct.rejected, (state, action: ActionRejectedType) => {
        state.loading = false;
        state.products = null;
        state.error = action?.payload?.message || UNKNOWN_ERROR;
      })
      // Get Product By Id
      .addCase(getProductById.pending, (state) => {
        state.loading = true;
        state.products = null;
        state.error = null;
      })
      .addCase(getProductById.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.products = action?.payload?.data;
        state.error = null;
      })
      .addCase(getProductById.rejected, (state, action: ActionRejectedType) => {
        state.loading = false;
        state.products = null;
        state.error = action?.payload?.message || UNKNOWN_ERROR;
      })
      // Update Product By Id
      .addCase(updateProductById.pending, (state) => {
        state.loading = true;
        state.products = null;
        state.error = null;
      })
      .addCase(updateProductById.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.products = action?.payload?.data;
        state.error = null;
      })
      .addCase(updateProductById.rejected, (state, action: ActionRejectedType) => {
        state.loading = false;
        state.products = null;
        state.error = action?.payload?.message || UNKNOWN_ERROR;
      })
      // Delete Product By Id
      .addCase(deleteProductById.pending, (state) => {
        state.loading = true;
        state.products = null;
        state.error = null;
      })
      .addCase(deleteProductById.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.products = action?.payload?.data;
        state.error = null;
      })
      .addCase(deleteProductById.rejected, (state, action: ActionRejectedType) => {
        state.loading = false;
        state.products = null;
        state.error = action?.payload?.message || UNKNOWN_ERROR;
      });
  },
});

export default productsSlice.reducer;
