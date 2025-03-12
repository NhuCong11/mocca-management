/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosResponse } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { callApi, HttpMethod } from '@/utils/apiUtils';
import { DefaultParams, RejectValueError } from '@/types';

export const getAllContacts = createAsyncThunk<any, DefaultParams, RejectValueError>(
  'contact/getAll',
  async ({ limit, page }, { rejectWithValue }) => {
    try {
      const res: AxiosResponse = await callApi(HttpMethod.GET, `/v1/contacts?limit=${limit}&page=${page}`, {}, {});
      return res;
    } catch (error: any) {
      return rejectWithValue({ ...error });
    }
  },
);

export const getContactById = createAsyncThunk<any, string, RejectValueError>(
  'contact/getById',
  async (contactId, { rejectWithValue }) => {
    try {
      const res: AxiosResponse = await callApi(HttpMethod.GET, `/v1/contacts/${contactId}`, {}, {});
      return res;
    } catch (error: any) {
      return rejectWithValue({ ...error });
    }
  },
);

export const deleteContactById = createAsyncThunk<any, string, RejectValueError>(
  'contact/deleteById',
  async (contactId, { rejectWithValue }) => {
    try {
      const res: AxiosResponse = await callApi(HttpMethod.DELETE, `/v1/Contacts/${contactId}`, {}, {});
      return res;
    } catch (error: any) {
      return rejectWithValue({ ...error });
    }
  },
);
