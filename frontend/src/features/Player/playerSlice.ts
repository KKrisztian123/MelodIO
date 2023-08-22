import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Player } from "./types";
import { NotPlaying } from "./utils";

const initialState: Player = NotPlaying;

export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    /** Clears player state. */
    clearPlayer: (state) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      state = NotPlaying;
    },
    /** Changes whole player state. */
    setPlayer: (state, action: PayloadAction<Player>) => {
      state = action.payload;
    },
    /** Changes player activity. */
    changeActive: (state, action: PayloadAction<boolean>) => {
      state.active = action.payload;
    },
    /** Changes current song state. */
    setSong: (state, action: PayloadAction<Player["song"]>) => {
      state.song = action.payload;
    },
    /** Changes current album state. */
    setSongList: (
      state,
      action: PayloadAction<{
        songList?: Player["songList"];
        contentListId?: string;
      }>
    ) => {
      if (typeof action.payload.songList !== "undefined") {
        state.songList = action.payload.songList;
      }
      if (typeof action.payload.contentListId !== "undefined") {
        state.contentListId = action.payload.contentListId;
      }
    },
    /** Changes player song repeat state. */
    changeRepeat: (state, action: PayloadAction<boolean>) => {
      state.isRepeat = action.payload;
    },
    /** Changes player song randomization state. */
    changeRandomized: (state, action: PayloadAction<boolean>) => {
      state.isRandomized = action.payload;
    },
    /** Changes player play status. */
    changePlaying: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload;
    },
    /** Changes length and current timestamp of song. */
    changeTime: (
      state,
      action: PayloadAction<Partial<Pick<Player, "currentTime" | "length">>>
    ) => {
      if (typeof action.payload.length === "number") {
        state.length = action.payload.length;
      }
      if (typeof action.payload.currentTime === "number") {
        state.currentTime = action.payload.currentTime;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  changeTime,
  setSongList,
  setPlayer,
  changePlaying,
  changeActive,
  changeRandomized,
  changeRepeat,
  setSong,
  clearPlayer,
} = playerSlice.actions;

export default playerSlice.reducer;
