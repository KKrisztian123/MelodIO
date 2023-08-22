import { useDispatch, useSelector } from "react-redux";
import {
  changeActive,
  changePlaying,
  changeRandomized,
  changeRepeat,
  changeTime,
  setSong,
  setSongList,
} from "../playerSlice";
import { RootState } from "@/store";
import { Howl } from "howler";
import { createSongUrl, getRandomIndex } from "../utils";
import { Player } from "../types";
import { useCallback, useEffect } from "react";
import { usePlayHistory } from "@features/PlayHistory";

export let PlayerState: typeof Howl;
let playId: number;
let playedSongs: string[] = [];

export const usePlayerContext = () => {
  const songList = useSelector((state: RootState) => state.player.songList);
  const isPlaying = useSelector((state: RootState) => state.player.isPlaying);
  const song = useSelector((state: RootState) => state.player.song);
  const isRepeat = useSelector((state: RootState) => state.player.isRepeat);
  const active = useSelector((state: RootState) => state.player.active);
  const length = useSelector((state: RootState) => state.player.length);
  const contentListId = useSelector(
    (state: RootState) => state.player.contentListId
  );
  const isRandomized = useSelector(
    (state: RootState) => state.player.isRandomized
  );
  return {
    songList,
    isPlaying,
    song,
    isRepeat,
    active,
    length,
    contentListId,
    isRandomized,
  };
};

export const usePlayerContextWithSeek = () => {
  return useSelector((state: RootState) => state.player);
};

/** Custom hook for managing music player. */
export const usePlayer = () => {
  const { add } = usePlayHistory();
  const {
    songList,
    isPlaying,
    song,
    contentListId,
    isRepeat: loop,
    active: isActive,
    isRandomized: randomized,
  } = usePlayerContext();
  const dispatch = useDispatch();

  useEffect(() => {
    const interval =
      isPlaying &&
      setInterval(() => {
        isPlaying &&
          dispatch(changeTime({ currentTime: Math.round(PlayerState.seek()) }));
      }, 1000);
    return () => clearInterval(interval as unknown as number);
  }, [isPlaying, dispatch]);

  const loadSong = useCallback(
    (songId: string, songListAlt?: MergedSong[]) => {
      const songs = songListAlt || songList;
      const song = songs.find((song) => song.id === songId);
      if (!song) return;
      if (randomized)
        playedSongs.includes(song?.id) || playedSongs.push(song?.id);
      const url = createSongUrl(song.id, song.fileType);
      PlayerState?.unload();
      PlayerState = new Howl({
        src: [url],
        preload: true,
        html5: true,
        autoplay: false,
        loop: false,
        volume: 1,
        onload: () => {
          setTimeout(() => {
            dispatch(
              changeTime({ length: PlayerState.duration(), currentTime: 0 })
            );
          }, 50);
        },
      });
      dispatch(setSong(song));
      playId = PlayerState.play();
      !isActive && dispatch(changeActive(true));
      !isPlaying && dispatch(changePlaying(true));
    },
    [dispatch, isPlaying, randomized, songList, isActive]
  );

  const changeSong = useCallback(
    (direction: "prev" | "next") => {
      const songs = randomized
        ? playedSongs.map((songId) => songList.find((s) => s.id === songId))
        : songList;
      const songIndex = songs.findIndex((s) => s.id === song.id);
      if (
        randomized &&
        direction === "next" &&
        songs.length <= songIndex + 1 &&
        songs.length !== songList.length
      ) {
        const uniqueSongs = songList.filter(
          (song) => !playedSongs.includes(song.id)
        );
        const randomIndex =
          uniqueSongs.length > 1 ? getRandomIndex(uniqueSongs.length) : 0;
        loadSong(uniqueSongs[randomIndex]?.id);
        return;
      }
      if (
        direction === "next" &&
        songIndex !== -1 &&
        songIndex < songs.length - 1
      ) {
        loadSong(songList[songIndex + 1]?.id);
      } else if (loop && direction === "next") {
        loadSong(songs[0]?.id);
      }

      if (direction === "prev" && songIndex !== -1 && songIndex > 0) {
        loadSong(songs[songIndex - 1]?.id);
      }
    },
    [randomized, songList, loop, song, loadSong]
  );

  useEffect(() => {
    PlayerState?.on("end", () => changeSong("next"));
  }, [song, changeSong]);

  const changeContentList = useCallback(
    (contentListId: string, songList: Player["songList"]) => {
      playedSongs = [];
      add(contentListId);
      dispatch(setSongList({ songList, contentListId }));
    },
    [dispatch, add]
  );

  const play = useCallback(
    (id: string, songList: Player["songList"], songId: string) => {
      if (contentListId !== id) {
        changeContentList(id, songList);
        loadSong(songId, songList);
      } else {
        loadSong(songId);
      }
    },
    [changeContentList, contentListId, loadSong]
  );

  const seek = (seconds: number) => {
    PlayerState.seek(seconds, playId);
  };

  return { play, loadSong, changeSong, seek };
};

/** Music player controls. */
export const usePlayerControls = () => {
  const dispatch = useDispatch();
  const { changeSong, seek } = usePlayer();
  const playerState = usePlayerContext();

  /** Changes play state of player */
  const changePlay = (value?: boolean) => {
    const newPlayState =
      typeof value === "boolean" ? value : !playerState.isPlaying;
    if (newPlayState) {
      playId = PlayerState.play();
    } else {
      PlayerState.pause();
    }
    dispatch(changePlaying(newPlayState));
  };

  /** Changes current time stamp or length of song in player. */
  const changeTimeStamp = (value: number) => {
    dispatch(changeTime({ currentTime: value }));
    seek(value);
  };

  const skip = () => {
    changeSong("next");
  };

  const back = () => {
    changeSong("prev");
  };

  /** Toggles song repeat state in player. */
  const repeat = (value?: boolean) => {
    const newRepeatState =
      typeof value === "boolean" ? value : !playerState.isRepeat;
    if (newRepeatState) {
      PlayerState.loop(true);
    } else {
      PlayerState.loop(false);
    }
    dispatch(changeRepeat(newRepeatState));
  };
  /** Toggles song randomizing in player. */
  const randomize = (value?: boolean) => {
    const newRandomizeState =
      typeof value === "boolean" ? value : !playerState.isRandomized;
    dispatch(changeRandomized(newRandomizeState));
    if (newRandomizeState) {
      playedSongs.includes(playerState.song?.id) ||
        playedSongs.push(playerState.song?.id);
    } else {
      playedSongs = [];
    }
  };

  return { changePlay, changeTimeStamp, skip, back, repeat, randomize };
};