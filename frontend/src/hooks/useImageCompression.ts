/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useCallback, useEffect, useState } from "react";
import useToggle from "./useToggle";
import Compressor from "compressorjs";
import { isFile } from "@/utils/utils";

type configType = {
  quality?: number;
  mimeType?: string;
};

/** Image compressor. */
const compressor = (image: File, { quality, mimeType = "image/webp" }: configType = {}) => {
  return new Promise<Blob>((resolve, reject) => {
    new Compressor(image, {
      quality,
      mimeType,
      success(file: Blob) {
        resolve(file);
      },
      error: reject,
    });
  });
};

const compressFiles = async (
  files: ImageListOptional,
  { quality, mimeType }: configType = {}
) => {
  const compressedFiles: ImageListOptional = [];
  for (const blob of files) {
    compressedFiles.push(
      isFile(blob)
        ? new File(
            [await compressor(blob as File, { quality, mimeType })],
            //@ts-ignore
            blob.name,
            {type:mimeType}
          )
        : blob
    );
  }
  return compressedFiles;
};

/** Custom hook for compressing form images. */
const useImageCompression = ({
  quality = 0.6,
  mimeType = "image/webp",
}: configType = {}) => {
  const [loading, changeLoading] = useToggle();
  const [result, setResult] = useState<ImageListOptional>([false]);

  const compress = useCallback(
    async (images: ImageListOptional) => {
      if (!images || typeof images === "string") {
        setResult(images);
        return images;
      }

      changeLoading(true);
      const result = await compressFiles(images, { quality, mimeType });

      setResult(result);
      changeLoading(false);

      return result;
    },
    [changeLoading, quality, mimeType, setResult]
  );

  return [loading, result, compress] as [
    typeof loading,
    typeof result,
    typeof compress
  ];
};

/** Custom hook for compressing images from state. */
export const useStatefulImageCompression = (
  image: ImageListOptional,
  config = {}
) => {
  const [loading, result, compress] = useImageCompression(config);

  useEffect(() => {
    image && compress(image);
  }, [image, compress]);

  return [loading, result] as [typeof loading, typeof result];
};

export default useImageCompression;