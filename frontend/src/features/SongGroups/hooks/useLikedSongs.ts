import {
  mergeAlbumToSong,
  mergeArtistsToSong,
  responseHandler,
} from "@/utils/utils";
import useError from "@hooks/useError";
import { useFetch } from "@hooks/useFetch";
import { useEffect, useState } from "react";

type LikedSongs = {
  songs: Song[];
  albums: Album[];
  artists: Author[];
};

/** Fetches liked songs. */
const useLikedSongs = () => {
  const { errorContent, showError } = useError();
  const [data, error, isLoading] = useFetch("GET", `/songs/like`);
  const [likedSongs, setLikedSongs] = useState<MergedSong[]>(
    [] as MergedSong[]
  );

  useEffect(() => {
    if (error && !isLoading) {
      showError(true);
      return;
    }
    showError();
  }, [error, isLoading, showError]);

  useEffect(() => {
    responseHandler(data, showError, (res: LikedSongs) => {
      const merged = { ...res };
      if (merged) {
        setLikedSongs(
          (merged.songs?.map((song) => {
            const songWithArtist = mergeArtistsToSong(song, res.artists);
            return mergeAlbumToSong(
              songWithArtist as Song & { author: Author[] },
              res.albums
            );
          }) as MergedSong[]) || ([] as MergedSong[])
        );
      }
    });
  }, [data, setLikedSongs, showError]);

  return { likedSongs, setLikedSongs, errorContent, isLoading };
};
export default useLikedSongs;
