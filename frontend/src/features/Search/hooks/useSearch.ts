import { responseHandler } from "@/utils/utils";
import { useAnimatedError } from "@hooks/useError";
import { useAxios } from "@hooks/useFetch";
import { useState } from "react";

type searchType = {
  method: httpMethods;
  endpoint: string;
};

/** Converts search field into a filtering field. */
const useFilter = (id: string, { method, endpoint }: searchType) => {
  const [result, setResult] = useState<false | object[]>(false);
  const { showError, ...rest } = useAnimatedError();
  const [fetch, loading] = useAxios(method, endpoint);

  const search = (value: string) => {
    const sparams = method === "GET" ? { [id]: value } : {};
    const sdata = method !== "GET" ? { [id]: value } : {};
    fetch(sdata, sparams)
      .then((res: APIResponse<object[]>) =>
        responseHandler(res, showError, setResult)
      )
      .catch(() => showError(true));
  };

  return {
    mode: "search" as "search" | "filter",
    errorHandler: { showError, ...rest },
    fetch: search,
    loading,
    result,
    setResult,
  };
};
export default useFilter;
