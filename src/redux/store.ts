import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";

export const store = configureStore({
  reducer: {
    // Add the auth slice to the store
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
