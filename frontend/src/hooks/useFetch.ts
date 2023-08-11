import { useSession } from "@features/Auth/Index";
import axios from "axios";
import { useCallback, useMemo, useReducer } from "react";
import useSWR, { SWRConfiguration } from "swr";

/** Handler for modifying request data. */
export type dataHandler = (data: APIResponse<any>) => any;

type configProps = {
  isError: boolean;
  isLoading: boolean;
};

const initialConfigState: configProps = {
  isError: false,
  isLoading: false,
};

enum actionKinds {
  ERROR = "setError",
  LOADING = "setLoading",
  RESET = "reset",
}

interface Iaction {
  type: actionKinds;
  payload: boolean;
}

const stateReducer = (state: configProps, action: Iaction) => {
  switch (action.type) {
    case actionKinds.ERROR:
      return { ...state, isError: action.payload };
    case actionKinds.LOADING:
      return { ...state, isLoading: action.payload };
    case actionKinds.RESET:
      return {
        isError: action.payload,
        isLoading: action.payload,
        isStarted: action.payload,
      };
    default:
      throw new Error();
  }
};

const fetcher = (
  method: string,
  url: string,
  data: object,
  config: { dataHandler?: dataHandler; headers?: object; params?: object }
) =>
  axios({
    method: method,
    url: url,
    data: data,
    headers: config.headers,
    params: config.params,
  }).then((res) =>
    config.dataHandler ? config.dataHandler(res.data) : res.data
  );

/** Custom hook for sending data without caching. */
export const useAxios = (
  method: httpMethods,
  url: string,
  dataHandler?: dataHandler
) => {
  const [state, dispatch] = useReducer(stateReducer, initialConfigState);
  const { session } = useSession();
  const headers = useMemo(
    () => (session ? { Authorization: `Bearer ${session}` } : {}),
    [session]
  );

  const fetchWrapper = useCallback(
    async (data: object, params?: object, urlAlt?: string) => {
      dispatch({ type: actionKinds.LOADING, payload: true });

      return fetcher(method, url, data, {
        dataHandler,
        headers,
        params,
      }).finally(() => {
        dispatch({ type: actionKinds.LOADING, payload: false });
      });
    },
    [dataHandler, headers, method, url]
  );

  return [fetchWrapper, state.isLoading] as [
    fetch: typeof fetchWrapper,
    loading: typeof state.isLoading
  ];
};

/** Custom hook for sending data without caching. */
export const useAxiosWithUrl = (
  method: httpMethods,
  dataHandler?: dataHandler
) => {
  const [state, dispatch] = useReducer(stateReducer, initialConfigState);
  const { session } = useSession();
  const headers = useMemo(
    () => (session ? { Authorization: `Bearer ${session}` } : {}),
    [session]
  );

  const fetchWrapper = useCallback(
    async (url: string, data: object, params?: object) => {
      dispatch({ type: actionKinds.LOADING, payload: true });

      return fetcher(method, url, data, {
        dataHandler,
        headers,
        params,
      }).finally(() => {
        dispatch({ type: actionKinds.LOADING, payload: false });
      });
    },
    [dataHandler, headers, method]
  );

  return [fetchWrapper, state.isLoading] as [
    fetch: typeof fetchWrapper,
    loading: typeof state.isLoading
  ];
};

/** Custom hook for fetching and caching data.  */
export const useFetch = (
  method: httpMethods,
  endpoint: string,
  {
    swrOptions: { ...options } = {},
    dataHandler: dataHandler,
  }: { swrOptions?: SWRConfiguration; dataHandler?: dataHandler } = {}
) => {
  const { session } = useSession();
  const headers = session ? { Authorization: `Bearer ${session}` } : {};

  const wrappedFetcher = (url: string, data: object) =>
    fetcher(method, url, data, { dataHandler, headers });
  const { data, error, isLoading } = useSWR(endpoint, wrappedFetcher, {
    ...options,
  });

  return [data, error, isLoading] as [
    typeof data,
    typeof error,
    typeof isLoading
  ];
};
