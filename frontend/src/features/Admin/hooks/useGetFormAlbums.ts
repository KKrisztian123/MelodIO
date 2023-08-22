import { useAxios } from "@hooks/useFetch";
import { useCallback, useMemo, useState } from "react";
import { responseHandler } from "@/utils/utils";
import { getArtistIdsFromAlbums } from "../utils/utils";
import { mergeArtistsToAlbums } from "@/utils/utils";

/** Returns a list of albums based on the provided album id-s. */
const useGetFormAlbums = (showError) => {
  const [fetcher, loading] = useAxios("GET", "/albums");
  const [artistfetcher, artistLoading] = useAxios("GET", "/artists");
  const [result, setResult] = useState<any[]>([]);

  const fetch = useCallback(
    (albumIds: Album["id"][]) =>
      fetcher({}, { albumIds: albumIds })
        .then((res: APIResponse<Album[]>) =>
          responseHandler(res, showError, (albumResponse: Album[]) => {
            const ids = getArtistIdsFromAlbums(albumResponse);

            artistfetcher({}, { artistIds: ids }).then((res) =>
              responseHandler(res, showError, (artistResponse: Author[]) => {
                const mergreResult = mergeArtistsToAlbums(
                  albumResponse,
                  artistResponse
                );
                mergreResult && setResult(mergreResult);
              })
            );
          })
        )
        .catch(() => showError(true)),
    [artistfetcher, fetcher, showError]
  );

  const loadState = useMemo(
    () => loading || artistLoading,
    [loading, artistLoading]
  );

  return { result, fetch, loading: loadState };
};
export default useGetFormAlbums;
