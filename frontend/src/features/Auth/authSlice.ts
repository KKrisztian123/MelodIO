import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Auth } from "./types";

const initialState: Auth = {
  session: "false",
  authLevel: "user",
  userId: -1,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<Auth>) => {
      if (["boolean", "string"].includes(typeof action.payload.session)) {
        state.session = action.payload.session;
      }
      if (["boolean", "string"].includes(typeof action.payload.authLevel)) {
        state.authLevel = action.payload.authLevel;
      }
      if (["boolean", "number"].includes(typeof action.payload.userId)) {
        state.userId = action.payload.userId;
      }
    },
    clearAuth: (state) => {
      state.authLevel = false;
      state.session = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAuth, clearAuth } = authSlice.actions;

export default authSlice.reducer;
