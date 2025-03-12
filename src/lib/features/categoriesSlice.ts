/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UNKNOWN_ERROR } from '@/constants';
import { ActionRejectedType } from '../store';
import { CategoryInfo } from '@/types';
import {
  createCategory,
  deleteCategoryById,
  getAllCategory,
  getCategoryById,
  updateCategoryById,
} from '@/services/categoriesServices';

interface CategoriesState {
  loading: boolean;
  categories: CategoryInfo[] | null;
  error: string | null;
}

const initialState: CategoriesState = {
  loading: false,
  categories: null,
  error: null,
};

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get All Category
      .addCase(getAllCategory.pending, (state) => {
        state.loading = true;
        state.categories = null;
        state.error = null;
      })
      .addCase(getAllCategory.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.categories = action?.payload?.data;
        state.error = null;
      })
      .addCase(getAllCategory.rejected, (state, action: ActionRejectedType) => {
        state.loading = false;
        state.categories = null;
        state.error = action?.payload?.message || UNKNOWN_ERROR;
      })
      // Create Category
      .addCase(createCategory.pending, (state) => {
        state.loading = true;
        state.categories = null;
        state.error = null;
      })
      .addCase(createCategory.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.categories = action?.payload?.data;
        state.error = null;
      })
      .addCase(createCategory.rejected, (state, action: ActionRejectedType) => {
        state.loading = false;
        state.categories = null;
        state.error = action?.payload?.message || UNKNOWN_ERROR;
      })
      // Get Category By Id
      .addCase(getCategoryById.pending, (state) => {
        state.loading = true;
        state.categories = null;
        state.error = null;
      })
      .addCase(getCategoryById.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.categories = action?.payload?.data;
        state.error = null;
      })
      .addCase(getCategoryById.rejected, (state, action: ActionRejectedType) => {
        state.loading = false;
        state.categories = null;
        state.error = action?.payload?.message || UNKNOWN_ERROR;
      })
      // Update Category By Id
      .addCase(updateCategoryById.pending, (state) => {
        state.loading = true;
        state.categories = null;
        state.error = null;
      })
      .addCase(updateCategoryById.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.categories = action?.payload?.data;
        state.error = null;
      })
      .addCase(updateCategoryById.rejected, (state, action: ActionRejectedType) => {
        state.loading = false;
        state.categories = null;
        state.error = action?.payload?.message || UNKNOWN_ERROR;
      })
      // Delete Category By Id
      .addCase(deleteCategoryById.pending, (state) => {
        state.loading = true;
        state.categories = null;
        state.error = null;
      })
      .addCase(deleteCategoryById.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.categories = action?.payload?.data;
        state.error = null;
      })
      .addCase(deleteCategoryById.rejected, (state, action: ActionRejectedType) => {
        state.loading = false;
        state.categories = null;
        state.error = action?.payload?.message || UNKNOWN_ERROR;
      });
  },
});

export default categorySlice.reducer;
