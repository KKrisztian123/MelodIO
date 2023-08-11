import { responseHandler } from "@/utils/utils";
import useError from "@hooks/useError";
import { useFetch } from "@hooks/useFetch";
import { useEffect, useState } from "react";
import { mutate } from "swr";

/** Fetches liked albums. */
const useLikedAlbums = () => {
  const { errorContent, showError } = useError();
  const [data, error, isLoading] = useFetch("GET", `/albums/like`);
  const [likedAlbums, setLikedAlbums] = useState([]);

  useEffect(() => {
    responseHandler(
      data,
      showError,
      (payload) => (console.log(payload), setLikedAlbums(payload))
    );
  }, [data, setLikedAlbums, showError]);

  useEffect(() => {
    if (error && !isLoading) {
      showError(true);
      return;
    }
    showError();
  }, [error, isLoading, showError]);

  return { likedAlbums, setLikedAlbums, errorContent, isLoading };
};
export default useLikedAlbums;

export const refetchLikedAlbums = () => mutate("/albums/like");
