import { responseHandler } from "@/utils/utils";
import { createArtistList } from "@components/MusicalText/MusicalText";
import { Search, useFilter } from "@features/Search";
import { wordFilter } from "@features/Search/utils/utils";
import { useFetch } from "@hooks/useFetch";
import { PropsWithChildren, useEffect, useState } from "react";

const filterFunction = (value: MergedSong, condition: string) =>
  wordFilter(value.name, condition) ||
  wordFilter(value.album.name, condition) ||
  wordFilter(
    createArtistList(value.author.map((author: Author) => author.name)),
    condition
  );

const SongSearch = ({ children }: PropsWithChildren) => {
  const filter = useFilter("filter", {
    filterFunc: filterFunction,
  });
  const { setResult, setResponse } = filter;
  const showError = filter.errorHandler.showError;

  const [songs, error1, loading1] = useFetch("GET", "/songs");
  const [albums, error2, loading2] = useFetch("GET", "/albums");
  const [artists, error3, loading3] = useFetch("GET", "/artists");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (error1 && !loading1) {
      showError(true);
      return;
    }
    if (error2 && !loading2) {
      showError(true);
      return;
    }
    if (error3 && !loading3) {
      showError(true);
      return;
    }

    showError();
  }, [error1, error2, error3, loading1, loading2, loading3, showError]);

  useEffect(() => {
    setLoading(loading1 || loading2 || loading3);
  }, [loading1, loading2, loading3]);

  useEffect(() => {
    const songsResponse = responseHandler(songs, showError);
    const albumsResponse = responseHandler(albums, showError);
    const artistsResponse = responseHandler(artists, showError);
    if (!songsResponse || !albumsResponse || !artistsResponse) return;

    const result = songsResponse?.map(
      ({ author, album: albumId, ...rest }: StatelessSong) => {
        return {
          author: author.map(
            (songAuthor: Author["id"]) =>
              artistsResponse.find(
                (artist: Author) => artist.id === songAuthor
              ) || {}
          ),
          album:
            albumsResponse.find(
              (albumItem: StatelessAlbum) => albumItem.id === albumId
            ) || {},
          ...rest,
        };
      }
    );

    result && setResponse(result);
    result && setResult(result);
  }, [songs, albums, artists, setResponse, setResult, showError]);

  return (
    <Search
      emptyText="Nincs találat"
      emptyDescription={"Nem találtunk ilyen dalt."}
      placeholder="Dal, album vagy előadó"
      loading={loading}
      {...filter}
    >
      {children}
    </Search>
  );
};

export default SongSearch;
