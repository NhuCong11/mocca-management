/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserInfo } from '@/types';
import { ADMIN_RULES, UNKNOWN_ERROR } from '@/constants';
import { loginUser } from '@/services/authServices';
import { ActionRejectedType } from '../store';

export interface AuthState {
  loading: boolean;
  user: UserInfo | null;
  error: string | null;
  isLogin: boolean;
}

const initialState: AuthState = {
  loading: false,
  user: null,
  error: null,
  isLogin: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,

  reducers: {
    logout: (state) => {
      state.isLogin = false;
      state.user = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // SignIn
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<any>) => {
        const user = action.payload?.data?.user;
        const isAdmin = user && ADMIN_RULES.includes(user.role);

        state.loading = false;
        state.user = isAdmin ? user : null;
        state.error = null;
        state.isLogin = isAdmin ? true : false;
      })
      .addCase(loginUser.rejected, (state, action: ActionRejectedType) => {
        state.loading = false;
        state.user = null;
        state.error = action.payload?.message || UNKNOWN_ERROR;
        state.isLogin = false;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
