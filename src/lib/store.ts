import { configureStore, PayloadAction } from '@reduxjs/toolkit';
import authSlice from './features/authSlice';
import dashboardSlice from './features/dashboardSlice';

interface MessagePayload {
  message: string;
  code?: number;
}

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authSlice,
      dashboard: dashboardSlice,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
export type ActionRejectedType = PayloadAction<MessagePayload | undefined>;
