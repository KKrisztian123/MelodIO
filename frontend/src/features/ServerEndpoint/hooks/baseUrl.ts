import axios from "axios";
import { useEffect, useReducer, useState } from "react";
import { getBaseUrl, storeBaseUrl } from "../utils/baseUrlUtils";

type configProps = {
  isValid: boolean;
  isLoading: boolean;
};
/** Global base url. */
export let baseUrl: string;

const initialConfigState: configProps = {
  /** The validity of the server address. */
  isValid: true,
  /** If `true` test is running. */
  isLoading: false,
};

enum actionKinds {
  VALID = "setValid",
  LOADING = "setLoading",
  START = "startLoading",
}

interface Iaction {
  type: actionKinds;
  payload: boolean;
}

const configStateReducer = (state: configProps, action: Iaction) => {
  switch (action.type) {
    case actionKinds.VALID:
      return { ...state, isValid: action.payload };
    case actionKinds.LOADING:
      return { ...state, isLoading: action.payload };
    case actionKinds.START:
      return { isValid: true, isLoading: true };
    default:
      throw new Error();
  }
};

/** Custom hook for configuring the baseURL. */
export const useConfigureBaseURL = (): [
  config: (v: string | false) => void,
  isLoading: boolean,
  isValid: boolean
] => {
  const [state, dispatch] = useReducer(configStateReducer, initialConfigState);

  /** Configures the main endpoint of the app and saves it to storage. */
  const config = (endpoint = false as string | false) => {
    if (endpoint === false) return;

    if (!endpoint.includes("http://") && !endpoint.includes("https://")) {
      endpoint = `https://${endpoint}`;
    }
    endpoint = endpoint.endsWith("/")
      ? endpoint.substring(0, endpoint.length - 1)
      : endpoint;
    endpoint = `${endpoint}/api`

    //start loading
    dispatch({
      type: actionKinds.START,
      payload: false,
    });
    //creating temp instance for testing connection
    const axiosTempInstance = axios.create({
      baseURL: endpoint,
    });

    //checking for valid server instance at the endpoint.
    axiosTempInstance
      .get("/checkConnection")
      .then((res) => {
        const response = res.data.payload;
        //valid address and valid app server
        if (response?.valid === true) {
          storeBaseUrl(endpoint as string);
          baseUrl = endpoint as string;
          axios.defaults.baseURL = endpoint as string;
        } else {
          throw new Error();
        }
      })
      .catch(() => {
        dispatch({ type: actionKinds.VALID, payload: false });
      })
      .finally(() =>
        setTimeout(() => {
          dispatch({ type: actionKinds.LOADING, payload: false });
        }, 1000)
      );
  };

  /** Current state of testing. if `true` the url is being tested. */
  const isLoading = state.isLoading;
  /** Current state of validation. If `true` the given url is valid. */
  const isValid = state.isValid;

  return [config, isLoading, isValid];
};

/** Custom hook for fetching current baseURL. */
export const useGetEndpoint = () => {
  const [endpoint, setEndpoint] = useState("");
  const [isLoading, setLoaded] = useState(true);

  useEffect(() => {
    getBaseUrl()
      .then((res) => {
        if (res) {
          setEndpoint(res);
          baseUrl = res;
        }
      })
      .finally(() => setLoaded(false));
  }, [setEndpoint]);

  return [isLoading, endpoint];
};
