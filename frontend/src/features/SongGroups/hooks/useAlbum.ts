import {
  mergeAlbumToSong,
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
  const [album, setAlbum] = useState<MergedAlbumWithSongList>(
    {} as MergedAlbumWithSongList
  );

  useEffect(() => {
    if (error && !isLoading) {
      showError(true);
      return;
    }
    showError();
  }, [error, isLoading, showError]);

  useEffect(() => {
    responseHandler(data, showError, (res) => {
      const merged = mergeArtistsToAlbums(
        [res.album as AlbumWithSongList],
        res.authorList
      ) as unknown as MergedAlbumWithSongList;

      if (merged?.[0] && "songs" in merged[0]) {
        const { id, name, author, type, favorite, image } = merged[0];

        setAlbum({
          id,
          name,
          author,
          type,
          favorite,
          image,
          songs: merged[0].songs?.map((song: Song) =>
            mergeAlbumToSong(
              mergeArtistsToSong(song, res.authorList) as Song & {
                author: Author[];
              },
              [
                {
                  id,
                  name,
                  author,
                  type,
                  favorite,
                  image,
                },
              ]
            )
          ),
        });
      }
    });
  }, [data, setAlbum, showError]);

  return { album, setAlbum, errorContent, isLoading };
};
export default useAlbum;
