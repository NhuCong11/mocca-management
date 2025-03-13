import { configureStore, PayloadAction } from '@reduxjs/toolkit';
import authSlice from './features/authSlice';
import dashboardSlice from './features/dashboardSlice';
import usersSlice from './features/usersSlice';
import categoriesSlice from './features/categoriesSlice';
import contactsSlice from './features/contactsSlice';
import productsSlice from './features/productsSlice';
import ordersSlice from './features/ordersSlice';

interface MessagePayload {
  message: string;
  code?: number;
}

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authSlice,
      dashboard: dashboardSlice,
      users: usersSlice,
      categories: categoriesSlice,
      contacts: contactsSlice,
      products: productsSlice,
      orders: ordersSlice,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
export type ActionRejectedType = PayloadAction<MessagePayload | undefined>;
