/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UNKNOWN_ERROR } from '@/constants';
import { ActionRejectedType } from '../store';
import { createUser, deleteUserById, getAllUser, getUserById, updateUserById } from '@/services/usersServices';

interface UsersState {
  loading: boolean;
  users: null;
  error: string | null;
}

const initialState: UsersState = {
  loading: false,
  users: null,
  error: null,
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get All User
      .addCase(getAllUser.pending, (state) => {
        state.loading = true;
        state.users = null;
        state.error = null;
      })
      .addCase(getAllUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.users = action?.payload?.data;
        state.error = null;
      })
      .addCase(getAllUser.rejected, (state, action: ActionRejectedType) => {
        state.loading = false;
        state.users = null;
        state.error = action?.payload?.message || UNKNOWN_ERROR;
      })
      // Create User
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.users = null;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.users = action?.payload?.data;
        state.error = null;
      })
      .addCase(createUser.rejected, (state, action: ActionRejectedType) => {
        state.loading = false;
        state.users = null;
        state.error = action?.payload?.message || UNKNOWN_ERROR;
      })
      // Delete User By Id
      .addCase(deleteUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUserById.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteUserById.rejected, (state, action: ActionRejectedType) => {
        state.loading = false;
        state.error = action?.payload?.message || UNKNOWN_ERROR;
      })
      // Update User By Id
      .addCase(updateUserById.pending, (state) => {
        state.loading = true;
        state.users = null;
        state.error = null;
      })
      .addCase(updateUserById.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.users = action.payload.data;
        state.error = null;
      })
      .addCase(updateUserById.rejected, (state, action: ActionRejectedType) => {
        state.loading = false;
        state.users = null;
        state.error = action?.payload?.message || UNKNOWN_ERROR;
      })
      // Get User By Id
      .addCase(getUserById.pending, (state) => {
        state.loading = true;
        state.users = null;
        state.error = null;
      })
      .addCase(getUserById.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.users = action.payload.data;
        state.error = null;
      })
      .addCase(getUserById.rejected, (state, action: ActionRejectedType) => {
        state.loading = false;
        state.users = null;
        state.error = action?.payload?.message || UNKNOWN_ERROR;
      });
  },
});

export default userSlice.reducer;
