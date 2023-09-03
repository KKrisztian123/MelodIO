import { imageToB64 } from "@/utils/utils";
import { useEffect, useState } from "react";

/** Custom hook for converting image files to base64. */
export const useImageConversion = (imageState: string | false | File) => {
  const [state, setState] = useState<string | false>(false);

  useEffect(() => {
    const convertImage = async () => {
      if (typeof imageState === "string" || !imageState) {
        setState(imageState as string | false);
        return;
      }
      setState(await imageToB64(imageState));
    };
    convertImage();
  }, [imageState, setState]);

  return state;
};
