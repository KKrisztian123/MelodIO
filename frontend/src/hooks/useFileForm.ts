import { createFormData, responseHandler } from "@/utils/utils";
import { Profile, ProfileRequest } from "@features/Profile/types";
import { useAnimatedError } from "@hooks/useError";
import { useAxios } from "@hooks/useFetch";
import { useState } from "react";

/** Hook for creating forms with a single file. */
export const useFileForm = (
  method: httpMethods,
  endpoint: string,
  {
    onSuccess,
    defaultValues,
  }: { onSuccess?: (e: Profile) => void; defaultValues?: object }
) => {
  const [fetcher, isLoading] = useAxios(method, endpoint);
  const { showError, errorContent, ref: errorRef } = useAnimatedError();
  const [preview, setPreview] = useState(defaultValues || {});

  const submit = (v: ProfileRequest) => {
    fetcher(createFormData(v))
      // .then((res: APIResponse<Profile>) =>
      //   res?.status === "success"
      //     ? typeof onSuccess === "function" && onSuccess(res?.payload)
      //     : showError(res?.message || true)
      // )
      .then((res) =>
        responseHandler(
          res,
          showError,
          (res) => onSuccess && onSuccess(res?.payload)
        )
      )
      .catch(() => showError(true));
  };

  return {
    preview,
    errorContent,
    errorRef,
    isLoading,
    submit,
    setPreview,
  };
};
