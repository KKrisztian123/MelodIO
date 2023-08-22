import {
  mergeAlbumToSong,
  mergeArtistsToSong,
  responseHandler,
} from "@/utils/utils";
import useError from "@hooks/useError";
import { useFetch } from "@hooks/useFetch";
import { useEffect, useState } from "react";

/** Fetches liked songs. */
const useLikedSongs = () => {
  const { errorContent, showError } = useError();
  const [data, error, isLoading] = useFetch("GET", `/songs/like`);
  const [likedSongs, setLikedSongs] = useState({});

  useEffect(() => {
    if (error && !isLoading) {
      showError(true);
      return;
    }
    showError();
  }, [error, isLoading, showError]);

  useEffect(() => {
    responseHandler(data, showError, (res) => {
      const merged = { ...res };
      if (merged) {
        merged.songs = merged.songs?.map((song) => {
          const songWithArtist = mergeArtistsToSong(song, res.artists);
          return mergeAlbumToSong(songWithArtist, res.albums);
        });
        merged && setLikedSongs(merged);
      }
    });
  }, [data, setLikedSongs, showError]);

  return { likedSongs, setLikedSongs, errorContent, isLoading };
};
export default useLikedSongs;
