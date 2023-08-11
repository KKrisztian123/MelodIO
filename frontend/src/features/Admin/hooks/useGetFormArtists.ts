import { responseHandler } from "@/utils/utils";
import { useAxios } from "@hooks/useFetch";
import { useCallback, useState } from "react";

/** Returns a list of albums based on the provided album id-s. */
const useGetFormArtists = (showError) => {
  const [fetcher, loading] = useAxios("GET", "/artists/");
  const [result, setResult] = useState<Author[]>([]);

  const fetch = useCallback(
    (artistIds: Author["id"][]) =>
      fetcher({}, { artistIds: artistIds })
        .then((res: APIResponse<Author[]>) =>
          responseHandler(res, showError, (payload) => setResult(payload))
        )
        .catch(() => showError(true)),
    [fetcher, showError]
  );

  return { result, fetch, loading };
};
export default useGetFormArtists;
