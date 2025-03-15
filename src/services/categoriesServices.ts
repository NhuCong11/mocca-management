/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosResponse } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { callApi, HttpMethod } from '@/utils/apiUtils';
import { CategoryUpdateInfo, DefaultParams, RejectValueError } from '@/types';

export const getAllCategory = createAsyncThunk<any, DefaultParams, RejectValueError>(
  'category/getAll',
  async ({ limit, page }, { rejectWithValue }) => {
    try {
      const customHeaders = {
        'Cache-Control': 'no-cache',
      };
      const res: AxiosResponse = await callApi(
        HttpMethod.GET,
        `/v1/categories?limit=${limit}&page=${page}`,
        {},
        customHeaders,
      );
      return res;
    } catch (error: any) {
      return rejectWithValue({ ...error });
    }
  },
);

export const createCategory = createAsyncThunk<any, CategoryUpdateInfo, RejectValueError>(
  'category/create',
  async ({ name, image }, { rejectWithValue }) => {
    try {
      const customHeaders = {
        'Content-Type': 'multipart/form-data',
      };
      const formData = new FormData();
      if (name) {
        formData.append('name', name);
      }
      if (image) {
        formData.append('image', image);
      }
      const response = await callApi(HttpMethod.POST, `v1/categories`, null, formData, customHeaders);
      return response;
    } catch (error: any) {
      return rejectWithValue({ ...error });
    }
  },
);

export const getCategoryById = createAsyncThunk<any, CategoryUpdateInfo, RejectValueError>(
  'category/getById',
  async ({ categoryId }, { rejectWithValue }) => {
    try {
      const res = await callApi(HttpMethod.GET, `/v1/categories/${categoryId}`, {}, {});
      return res;
    } catch (error: any) {
      return rejectWithValue({ ...error });
    }
  },
);

export const updateCategoryById = createAsyncThunk<any, CategoryUpdateInfo, RejectValueError>(
  'category/updateById',
  async ({ categoryId, name, image }, { rejectWithValue }) => {
    try {
      const customHeaders = {
        'Content-Type': 'multipart/form-data',
      };
      const formData = new FormData();
      if (name) {
        formData.append('name', name);
      }
      if (image) {
        formData.append('image', image);
      }
      const res = await callApi(HttpMethod.PUT, `/v1/categories/${categoryId}`, null, formData, customHeaders);
      return res;
    } catch (error: any) {
      return rejectWithValue({ ...error });
    }
  },
);

export const deleteCategoryById = createAsyncThunk<any, CategoryUpdateInfo, RejectValueError>(
  'category/deleteById',
  async ({ categoryId }, { rejectWithValue }) => {
    try {
      const res = await callApi(HttpMethod.DELETE, `/v1/categories/${categoryId}`, {}, {});
      return res;
    } catch (error: any) {
      return rejectWithValue({ ...error });
    }
  },
);
