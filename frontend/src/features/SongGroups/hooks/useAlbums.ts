import { responseHandler } from "@/utils/utils";
import useError from "@hooks/useError";
import { useFetch } from "@hooks/useFetch";
import { useEffect, useState } from "react";
import { mutate } from "swr";

/** Fetches all albums grouped by artists. */
const useAlbums = () => {
  const { errorContent, showError } = useError();
  const [data, error, isLoading] = useFetch("GET", `/albums`);
  const [data2, error2, isLoading2] = useFetch("GET", `/artists`);
  const [loading, setLoading] = useState(true);
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    if (error && !isLoading) {
      showError(true);
      return;
    }
    if (error2 && !isLoading2) {
      showError(true);
      return;
    }

    showError();
  }, [error, error2, isLoading, isLoading2, showError]);

  useEffect(() => {
    setLoading(isLoading || isLoading2);
  }, [isLoading, isLoading2]);

  useEffect(() => {
    const albumsResponse = responseHandler(data, showError);
    const artistsResponse = responseHandler(data2, showError);
    const result = artistsResponse?.map((artist) => {
      const artistAlbums = albumsResponse.filter((album) =>
        album.author.includes(artist.id)
      );

      return {
        ...artist,
        albums: artistAlbums.map((album) => {
          return {
            ...album,
            author: album.author.map(
              (authorId) =>
                artistsResponse.find((artist) => artist.id === authorId) || {}
            ),
          };
        }),
      };
    });
    result && setAlbums(result.filter((artist) => artist.albums.length > 0));
  }, [data, data2, setAlbums, showError]);

  return { albums, errorContent, isLoading: loading };
};
export default useAlbums;

export const refetchAlbums = () => (mutate("/albums"), mutate("/artists"));
