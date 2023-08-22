import { RootState } from "@/store";
import { useMemo } from "react";
import { useSelector } from "react-redux";

/** Returns currently playing album and song id. */
const usePlaying = () => {
  const song = useSelector((state: RootState) => state.player.song);
  const albumId = useMemo(() => song.album?.id || false, [song]);
  const songId = useMemo(() => song.id || false, [song]);
  
  return { albumId, songId };
};

export default usePlaying;
