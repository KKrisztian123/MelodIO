import { responseHandler } from "@/utils/utils";
import useError from "@hooks/useError";
import { useFetch } from "@hooks/useFetch";
import { useEffect, useState } from "react";
import { mutate } from "swr";

/** Returns latest albums. */
export const useLatestAlbums = () => {
  const [data, error, isLoading] = useFetch("GET", "/list/releases");
  const [albums, setAlbums] = useState<MergedAlbum[]>([]);
  const { showError, errorContent } = useError();

  useEffect(() => {
    responseHandler(data, showError, (payload) => setAlbums(payload));
  }, [data, setAlbums, showError]);

  useEffect(() => {
    if (error && !isLoading) {
      showError(true);
      return;
    }
    showError();
  }, [error, isLoading, showError]);

  return { albums, errorContent, isLoading } as {
    albums: typeof albums;
    errorContent: typeof errorContent;
    isLoading: typeof isLoading;
  };
};

/** Triggers a refetch on the latest albums */
export const refetchLatestAlbums = () => mutate("/list/releases");
