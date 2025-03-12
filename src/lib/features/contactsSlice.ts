/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UNKNOWN_ERROR } from '@/constants';
import { ActionRejectedType } from '../store';
import { deleteContactById, getAllContacts, getContactById } from '@/services/contactsServices';

interface ContactsState {
  loading: boolean;
  contacts: null;
  error: string | null;
}

const initialState: ContactsState = {
  loading: false,
  contacts: null,
  error: null,
};

const contactSlide = createSlice({
  name: 'contact',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get All Contacts
      .addCase(getAllContacts.pending, (state) => {
        state.loading = true;
        state.contacts = null;
        state.error = null;
      })
      .addCase(getAllContacts.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.contacts = action?.payload?.data;
        state.error = null;
      })
      .addCase(getAllContacts.rejected, (state, action: ActionRejectedType) => {
        state.loading = false;
        state.contacts = null;
        state.error = action?.payload?.message || UNKNOWN_ERROR;
      })
      // Get Contact By Id
      .addCase(getContactById.pending, (state) => {
        state.loading = true;
        state.contacts = null;
        state.error = null;
      })
      .addCase(getContactById.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.contacts = action?.payload?.data;
        state.error = null;
      })
      .addCase(getContactById.rejected, (state, action: ActionRejectedType) => {
        state.loading = false;
        state.contacts = null;
        state.error = action?.payload?.message || UNKNOWN_ERROR;
      })
      // Delete Contact By Id
      .addCase(deleteContactById.pending, (state) => {
        state.loading = true;
        state.contacts = null;
        state.error = null;
      })
      .addCase(deleteContactById.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.contacts = action?.payload?.data;
        state.error = null;
      })
      .addCase(deleteContactById.rejected, (state, action: ActionRejectedType) => {
        state.loading = false;
        state.contacts = null;
        state.error = action?.payload?.message || UNKNOWN_ERROR;
      });
  },
});

export default contactSlide.reducer;
