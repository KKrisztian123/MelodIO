import { useSession } from "@features/Auth/Index";
import axios from "axios";
import { useCallback, useMemo, useReducer } from "react";
import useSWR, { SWRConfiguration } from "swr";

/** Handler for modifying request data. */
export type dataHandler = (data: object) => unknown;

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
  config: { dataHandler?: dataHandler; headers?: object }
) =>
  axios({ method: method, url: url, data: data, headers: config.headers }).then(
    (res) => (config.dataHandler ? config.dataHandler(res.data) : res.data)
  );

type methods = "GET" | "POST" | "PUT" | "DELETE";

/** Custom hook for sending data without caching. */
export const useAxios = (
  method: methods,
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
    async (data: object) => {
      dispatch({ type: actionKinds.LOADING, payload: true });

      return fetcher(method, url, data, { dataHandler, headers }).finally(
        () => {
          dispatch({ type: actionKinds.LOADING, payload: false });
        }
      );
    },
    [dataHandler, headers, method, url]
  );

  return [fetchWrapper, state.isLoading] as [
    fetch: typeof fetchWrapper,
    loading: typeof state.isLoading
  ];
};

/** Custom hook for fetching and caching data.  */
export const useFetch = (
  method = "GET",
  endpoint: string,
  {
    swrOptions: { ...options },
    dataHandler: dataHandler,
  }: { swrOptions: SWRConfiguration; dataHandler: dataHandler }
) => {
  const { session } = useSession();
  const headers = session ? { Authorization: `Bearer ${session}` } : {};

  const wrappedFetcher = (url: string, data: object) =>
    fetcher(method, url, data, { dataHandler, headers });
  const { data, error, isLoading } = useSWR(endpoint, wrappedFetcher, {
    ...options,
  });
  return [data, error, isLoading];
};

// /** Custom hook for sending data without caching. */
// export const useAxios = (
//   method: methods,
//   url: string,
//   dataHandler?: dataHandler
// ) => {
//   const [state, dispatch] = useReducer(stateReducer, initialConfigState);
//   const [dataState, setData] = useState<APIResponse<object> | false>(false);

//   const fetchWrapper = async (data: object) => {
//     //dispatch({ type: actionKinds.RESET, payload: false });
//     dispatch({ type: actionKinds.LOADING, payload: true });

//     try {
//       const res = await fetcher(method, url, data, dataHandler);
//       dispatch({ type: actionKinds.ERROR, payload: false });
//       setData(res);
//       return res;
//     } catch (error) {
//       dispatch({ type: actionKinds.ERROR, payload: true });
//     } finally {
//       dispatch({ type: actionKinds.LOADING, payload: false });
//     }
//   };

//   return [fetchWrapper, dataState, state.isLoading, state.isError] as [
//     fetch: typeof fetchWrapper,
//     result: typeof dataState,
//     loading: typeof state.isLoading,
//     error: typeof state.isError
//   ];
// };
