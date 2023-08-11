import useError from "@hooks/useError";
import { Dispatch, SetStateAction, useContext } from "react";
import { SearchContext } from "../components/Search";

export type searchConfig = {
  /** Search loading state. */
  loading: boolean;
  /** Searching callback function. */
  fetch: (v: string) => void;
  /** Search error handler. */
  errorHandler: ReturnType<typeof useError>;
  /** Search result. */
  result: false | object[];
  /** Search result setter. */
  setResult: Dispatch<SetStateAction<false | object[]>>;
};

export const useSearchProvider = (
  mode: "search" | "filter",
  { loading, fetch, errorHandler, result, setResult }: searchConfig
) => {
  const { showError, ...rest } = errorHandler;

  const fetchResult = (e: { target: { value: string } }) => {
    const value = e.target.value.trim();

    if (!value && mode === "search") {
      showError();
      setResult(false);
      return;
    }
    fetch(value);
  };

  return {
    fetch: fetchResult,
    isLoading: loading,
    result,
    setResult,
    error: { ...rest, showError },
  };
};

/** Returns search context */
export const useSearchContext = () => {
  return useContext(SearchContext);
};
