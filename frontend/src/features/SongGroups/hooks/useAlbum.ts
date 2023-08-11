import {
  mergeArtistsToAlbums,
  mergeArtistsToSong,
  responseHandler,
} from "@/utils/utils";
import useError from "@hooks/useError";
import { useFetch } from "@hooks/useFetch";
import { useEffect, useState } from "react";

/** Fetches album with corresponding id. */
const useAlbum = (id: string) => {
  const { errorContent, showError } = useError();
  const [data, error, isLoading] = useFetch("GET", `/list/album/${id}`);
  const [album, setAlbum] = useState({});

  useEffect(() => {
    if (error && !isLoading) {
      showError(true);
      return;
    }
    showError();
  }, [error, isLoading, showError]);

  useEffect(() => {
    responseHandler(data, showError, (res) => {
      const merged = mergeArtistsToAlbums([res.album], res.authorList);
      if (merged?.[0]) {
        merged[0].songs = merged[0].songs?.map((song) => mergeArtistsToSong(song, res.authorList))
        merged && setAlbum(merged[0]);
      }
    });
  }, [data, setAlbum, showError]);

  return { album,setAlbum, errorContent, isLoading };
};
export default useAlbum;
