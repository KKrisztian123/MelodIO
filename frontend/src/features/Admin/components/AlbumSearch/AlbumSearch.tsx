import { responseHandler } from "@/utils/utils";
import { createArtistList } from "@components/MusicalText/MusicalText";
import { Search, useFilter } from "@features/Search";
import { wordFilter } from "@features/Search/utils/utils";
import { useFetch } from "@hooks/useFetch";
import { PropsWithChildren, useEffect, useState } from "react";

const filterFunction = (value: MergedAlbum, condition: string) =>
  wordFilter(value.name, condition) ||
  wordFilter(
    createArtistList(value.author.map((author) => author.name)),
    condition
  );

const AlbumSearch = ({ children }: PropsWithChildren) => {
  const filter = useFilter("filter", {
    filterFunc: filterFunction,
  });
  const { setResult, setResponse } = filter;
  const showError = filter.errorHandler.showError;

  const [albums, error1, loading1] = useFetch("GET", "/albums");
  const [artists, error2, loading2] = useFetch("GET", "/artists");
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

    showError();
  }, [error1, error2, loading1, loading2, showError]);

  useEffect(() => {
    setLoading(loading1 || loading2);
  }, [loading1, loading2]);

  useEffect(() => {
    const albumsResponse = responseHandler(albums, showError);
    const artistsResponse = responseHandler(artists, showError);
    if (!albumsResponse || !artistsResponse) return;

    const result = albumsResponse?.map(
      ({ author, ...rest }: StatelessAlbum) => {
        return {
          author: author.map((authorId) =>
            artistsResponse.find((artist: Author) => authorId === artist.id)|| {}
          ),
          ...rest,
        };
      }
    );

    result && setResponse(result);
    result && setResult(result);
  }, [albums, artists, setResponse, setResult, showError]);

  return (
    <Search
      emptyText="Nincs találat"
      emptyDescription={"Nem találtunk ilyen albumot."}
      placeholder="Album vagy előadó"
      loading={loading}
      {...filter}
    >
      {children}
    </Search>
  );
};

export default AlbumSearch;
