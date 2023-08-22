/** Global player state */
export type Player = {
  /** Current playing song. */
  song: MergedSong;
  /** Current playing album. */
  songList: MergedSong[];
  /** Current play state. */
  isPlaying: boolean;
  /** Song is on repeat. */
  isRepeat: boolean;
  /** Songs in album are randomized. */
  isRandomized: boolean;
  /** Length of current song. */
  length: number;
  /** Current time of song. */
  currentTime: number;
  /** Player activity. */
  active: boolean;
  /** Current contentlist inside player. */
  contentListId: string;
};
