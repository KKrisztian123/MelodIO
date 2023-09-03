import {
  createFormData,
  getImageFromList,
  responseHandler,
} from "@/utils/utils";
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
  }: { onSuccess?: (e: any) => void; defaultValues?: object }
) => {
  const [fetcher, isLoading] = useAxios(method, endpoint);
  const { showError, errorContent, ref: errorRef } = useAnimatedError();
  const [preview, setPreview] = useState(defaultValues || {});

  const submit = ({ file: files, ...rest }: any) => {
    fetcher(createFormData({ file: getImageFromList(files), ...rest }))
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
