/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosResponse } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { callApi, HttpMethod } from '@/utils/apiUtils';
import { DefaultParams, RejectValueError, UpdateUserInfo } from '@/types';

export const getAllUser = createAsyncThunk<any, DefaultParams, RejectValueError>(
  'user/getAll',
  async ({ limit, page }, { rejectWithValue }) => {
    try {
      const res: AxiosResponse = await callApi(HttpMethod.GET, `/v1/users?limit=${limit}&page=${page}`, {}, {});
      return res;
    } catch (error: any) {
      return rejectWithValue({ ...error });
    }
  },
);

export const createUser = createAsyncThunk<any, UpdateUserInfo, RejectValueError>(
  'user/create',
  async (userCredentials, { rejectWithValue }) => {
    try {
      const res: AxiosResponse = await callApi(HttpMethod.POST, '/v1/users', null, userCredentials);
      return res;
    } catch (error: any) {
      return rejectWithValue({ ...error });
    }
  },
);

export const getUserById = createAsyncThunk<any, UpdateUserInfo, RejectValueError>(
  'user/getById',
  async ({ userId }, { rejectWithValue }) => {
    try {
      const res: AxiosResponse = await callApi(HttpMethod.GET, `/v1/users/${userId}`, {}, {});
      return res;
    } catch (error: any) {
      return rejectWithValue({ ...error });
    }
  },
);

export const updateUserById = createAsyncThunk<any, UpdateUserInfo, RejectValueError>(
  'user/updateById',
  async ({ userId, userCredentials }, { rejectWithValue }) => {
    try {
      const res: AxiosResponse = await callApi(HttpMethod.PUT, `/v1/users/${userId}`, {}, userCredentials);
      return res;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const deleteUserById = createAsyncThunk<any, UpdateUserInfo, RejectValueError>(
  'user/deleteById',
  async (userId, { rejectWithValue }) => {
    try {
      const res: AxiosResponse = await callApi(HttpMethod.DELETE, `/v1/users/${userId}`, {}, {});
      return res;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);
