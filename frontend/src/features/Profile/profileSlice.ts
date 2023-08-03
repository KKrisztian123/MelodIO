import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Profile } from "./types";

const initialState: Omit<Profile, "lastUpdate"> = {
  name: "",
  email: "",
  image: false,
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<Profile>) => {
      if (["string"].includes(typeof action.payload.name)) {
        state.name = action.payload.name;
      }
      if (["string"].includes(typeof action.payload.email)) {
        state.email = action.payload.email;
      }
      if (["boolean", "string"].includes(typeof action.payload.image)) {
        state.image = action.payload.image;
      }
    },
    clearProfile: (state) => {
      state.name = "";
      state.email = "";
      state.image = false;
    },
  },
});

export const { setProfile, clearProfile } = profileSlice.actions;

export default profileSlice.reducer;
