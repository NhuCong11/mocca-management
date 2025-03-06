/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosResponse } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getCookie } from 'typescript-cookie';
import { callApi, HttpMethod } from '@/utils/apiUtils';
import { LoginInfo, RejectValueError } from '@/types';

export const loginUser = createAsyncThunk<any, LoginInfo, RejectValueError>(
  'auth/login',
  async (userCredentials: LoginInfo, { rejectWithValue }) => {
    try {
      const customHeaders = {
        'accept-language': `${getCookie('lang')}`,
      };
      const res: AxiosResponse = await callApi(HttpMethod.POST, `/v1/auth/login`, null, userCredentials, customHeaders);
      return res;
    } catch (error: any) {
      return rejectWithValue({ ...error });
    }
  },
);
