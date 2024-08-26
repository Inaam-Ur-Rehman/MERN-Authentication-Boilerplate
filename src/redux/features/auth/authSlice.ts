import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  loading: boolean;
  error: string | null;
  user: {
    id: string;
    email: string;
    role: [string];
    name: string;
  } | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signInStart(state) {
      // set loading to true and clear the error
      state.loading = true;
      state.error = null;
    },
    signInSuccess(state, action: PayloadAction<AuthState>) {
      // set the user and token in the state
      state.user = action.payload.user;
      state.loading = false;
      state.error = null;
    },
    signInFailure(state, action: PayloadAction<string>) {
      // set loading to false and display the error
      state.user = null;
      state.loading = false;
      state.error = action.payload;
    },
    signOut(state) {
      // clear the user and token
      state.user = null;
      state.loading = false;
      state.error = null;
    },
  },
});

export const { signInStart, signInSuccess, signInFailure, signOut } =
  authSlice.actions;

export default authSlice.reducer;
