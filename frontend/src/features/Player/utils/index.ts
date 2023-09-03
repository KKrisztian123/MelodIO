import { secondsToMinutes } from "date-fns";
import { Player } from "../types";
import { baseUrl } from "@features/ServerEndpoint";

export const NotPlaying: Player = {
  song: {} as MergedSong,
  songList: [] as MergedSong[],
  isPlaying: false,
  isRepeat: false,
  isRandomized: false,
  length: 0,
  currentTime: 0,
  active: false,
  contentListId: "",
};

/** Converts seconds into timeStamp. */
export const secondsToTimeStamp = (seconds: number) => {
  const roundedSeconds = Math.floor(seconds);
  const secondsLeft = roundedSeconds % 60;
  const minutes = secondsToMinutes(roundedSeconds);

  return secondsLeft < 10
    ? `${minutes}:0${secondsLeft}`
    : `${minutes}:${secondsLeft}`;
};

export const createSongUrl = (id, fileType) =>
  `${baseUrl}/play/${id}.${fileType}`;

export const getRandomIndex = (max) => {
  return Math.floor(Math.random() * max);
};

export const getSongsUrlsFromList = (songList: MergedSong[]) => {
  return songList.map((song) => createSongUrl(song.id, song.fileType));
};
