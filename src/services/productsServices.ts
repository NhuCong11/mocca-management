/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosResponse } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { callApi, HttpMethod } from '@/utils/apiUtils';
import { DefaultParams, RejectValueError, UpdateProductInfo } from '@/types';

export const getAllProduct = createAsyncThunk<any, DefaultParams, RejectValueError>(
  'product/getAll',
  async ({ limit, page }, { rejectWithValue }) => {
    try {
      const customHeaders = {
        'Cache-Control': 'no-cache',
      };
      const res: AxiosResponse = await callApi(
        HttpMethod.GET,
        `/v1/products?limit=${limit}&page=${page}`,
        {},
        customHeaders,
      );
      return res;
    } catch (error: any) {
      return rejectWithValue({ ...error });
    }
  },
);

export const createProduct = createAsyncThunk<any, UpdateProductInfo, RejectValueError>(
  'product/create',
  async ({ productData, image }, { rejectWithValue }) => {
    try {
      const customHeaders = {
        'Content-Type': 'multipart/form-data',
      };
      const formData = new FormData();
      if (productData) {
        Object.entries(productData).forEach(([key, value]) => {
          formData.append(key, String(value));
        });
      }
      if (image) {
        formData.append('image', image);
      }
      const res: AxiosResponse = await callApi(HttpMethod.POST, `v1/products`, null, formData, customHeaders);
      return res;
    } catch (error: any) {
      return rejectWithValue({ ...error });
    }
  },
);

export const getProductById = createAsyncThunk<any, UpdateProductInfo, RejectValueError>(
  'product/getById',
  async ({ productId }, { rejectWithValue }) => {
    try {
      const res = await callApi(HttpMethod.GET, `/v1/products/${productId}`, {}, {});
      return res;
    } catch (error: any) {
      return rejectWithValue({ ...error });
    }
  },
);

export const updateProductById = createAsyncThunk<any, UpdateProductInfo, RejectValueError>(
  'product/updateById',
  async ({ productData, image, productId }, { rejectWithValue }) => {
    try {
      const customHeaders = {
        'Content-Type': 'multipart/form-data',
      };
      const formData = new FormData();
      if (productData) {
        Object.entries(productData).forEach(([key, value]) => {
          formData.append(key, String(value));
        });
      }
      if (image) {
        formData.append('image', image);
      }
      const res: AxiosResponse = await callApi(
        HttpMethod.PUT,
        `v1/products/${productId}`,
        null,
        formData,
        customHeaders,
      );
      return res;
    } catch (error: any) {
      return rejectWithValue({ ...error });
    }
  },
);

export const deleteProductById = createAsyncThunk<any, UpdateProductInfo, RejectValueError>(
  'product/deleteById',
  async ({ productId }, { rejectWithValue }) => {
    try {
      const res: AxiosResponse = await callApi(HttpMethod.DELETE, `/v1/products/${productId}`, {}, {});
      return res;
    } catch (error: any) {
      return rejectWithValue({ ...error });
    }
  },
);
