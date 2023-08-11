import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type AppState =  {
    /** Page is past the scroll trigger point. */
    scrolled: boolean;
}

const initialState: AppState = {
  scrolled: false,
};

export const networkSlice = createSlice({
  name: "network",
  initialState,
  reducers: {
    setScroll: (state, action: PayloadAction<boolean>) => {
      state.scrolled = action.payload;
    },
  },
});

export const { setScroll } = networkSlice.actions;

export default networkSlice.reducer;
