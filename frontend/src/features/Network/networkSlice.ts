import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ConnectionStatus } from "@capacitor/network";

const initialState: ConnectionStatus = {
  connectionType: "none",
  connected: false,
};

export const networkSlice = createSlice({
  name: "network",
  initialState,
  reducers: {
    setNetwork: (state, action: PayloadAction<ConnectionStatus>) => {
      state.connected = action.payload.connected;
      state.connectionType = action.payload.connectionType;
    },
  },
});

export const { setNetwork } = networkSlice.actions;

export default networkSlice.reducer;
