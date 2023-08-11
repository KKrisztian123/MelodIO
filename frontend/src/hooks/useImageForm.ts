import {
  createFormData,
  getImageFromList,
  responseHandler,
} from "@/utils/utils";
import { Profile, ProfileRequest } from "@features/Profile/types";
import { useAnimatedError } from "@hooks/useError";
import { useAxios } from "@hooks/useFetch";
import useImageCompression from "@hooks/useImageCompression";
import { useState } from "react";

/** Hook for creating forms with a single image. */
export const useImageForm = (
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
  const [isCompressing, , compress] = useImageCompression();

  const submit = (v: ProfileRequest) => {
    const { image: images, ...rest } = v;
    compress(images).then(async (res) => {
      const image = getImageFromList(res);
      fetcher(createFormData({ ...rest, image: image }))
        .then((res) =>
          responseHandler(
            res,
            showError,
            (res) => onSuccess && onSuccess(res?.payload)
          )
        )
        .catch(() => showError(true));
    });
  };

  return {
    isCompressing,
    preview,
    errorContent,
    errorRef,
    isLoading,
    submit,
    setPreview,
  };
};