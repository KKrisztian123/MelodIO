import { responseHandler } from "@/utils/utils";
import { useAnimatedError } from "@hooks/useError";
import { dataHandler, useFetch } from "@hooks/useFetch";
import { useEffect, useState } from "react";

type filterType = {
  method: httpMethods;
  endpoint: string;
  filterFunc: (v: any, comparableValue: string) => boolean;
  dataHandler?: dataHandler;
};

export const useFilterWithFetch = (
  id: string,
  { method, endpoint, filterFunc, dataHandler }: filterType
) => {
  const { setResult, setResponse, ...rest } = useFilter(id, {
    filterFunc,
  } as filterType);
  const showError = rest.errorHandler.showError;
  const [fetchResponse, error, loading] = useFetch(method, endpoint, {
    dataHandler,
  });

  useEffect(() => {
    responseHandler(
      fetchResponse,
      showError,
      (payload) => (setResponse(payload), setResult(payload))
    );
  }, [fetchResponse, setResponse, setResult, showError]);

  useEffect(() => {
    if (error && !loading) {
      showError(true);
      return;
    }
    showError();
  }, [error, loading, showError]);

  return { setResult, setResponse, ...rest, loading } as ReturnType<
    typeof useFilter
  > & { loading: typeof loading };
};

/** Converts search field into a filtering field. */
const useFilter = (
  id: string,
  { filterFunc }: Pick<filterType, "filterFunc">
) => {
  const [response, setResponse] = useState<false | object[]>(false);
  const [result, setResult] = useState<false | object[]>(false);
  const { showError, ...rest } = useAnimatedError();

  const filter = (value: string) => {
    if (response) {
      if (value === "") {
        setResult(response);
        return;
      }
      const filteredResult = response.filter((v) => filterFunc(v, value));
      filteredResult && setResult(filteredResult);
    }
  };

  return {
    mode: "filter" as "search" | "filter",
    errorHandler: { showError, ...rest },
    fetch: filter,
    result,
    setResult,
    setResponse,
  } as {
    mode: "search" | "filter";
    errorHandler: ReturnType<typeof useAnimatedError>;
    fetch: typeof filter;
    result: typeof result;
    setResult: typeof setResult;
    setResponse: typeof setResponse;
  };
};
export default useFilter;