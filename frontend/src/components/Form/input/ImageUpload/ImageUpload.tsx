import { forwardRef, useMemo, useRef } from "react";
import styles from "./ImageUpload.module.css";
import { FieldValues, useFormContext } from "react-hook-form";
import type { RegisterOptions, UseFormRegisterReturn } from "react-hook-form";

type registerConfig = RegisterOptions<FieldValues, any> | undefined;

/** Image upload required configuration props when used in forms. */
export type ImageUploadProps = {
  /** Identifier for the input field in the form response. */
  id: string;
  /** Optional react-hook-form input registration config. */
  config: registerConfig;
};

type ImageUploadHookProps = {
  /** File upload form control register. */
  register: UseFormRegisterReturn;
  /** Opens file upload modal. */
  upload: () => void;
  /** Clears file upload. */
  clear: () => void;
  /** Current value of fileupload. */
  imageState: File[] | false[] | string[];
};

/** Image upload primitive props */
export type ImageUploadPrimitiveProps = Omit<UseFormRegisterReturn, "ref"> & {
  /** Single or multiple file upload. */
  type?: "single" | "multiple";
};

/** Image upload primitive. */
const ImageUploadPrimitive = forwardRef<
  HTMLInputElement,
  ImageUploadPrimitiveProps
>(({ type = "single", ...rest }, ref) => {
  return (
    <input
      type="file"
      ref={ref}
      multiple={type === "multiple"}
      className={styles.imageUpload}
      {...rest}
    />
  );
});
ImageUploadPrimitive.displayName = "ImageUploadPrimitive";

export default ImageUploadPrimitive;

/** Returns controls for Image upload component */
export const useImageUpload = (
  id: string,
  config: registerConfig,
  type?: "single" | "multiple"
) => {
  /** File upload input controls */
  const { register, watch, setValue } = useFormContext<FieldValues>();
  const ref = useRef<HTMLInputElement>(null);
  const { ref: registerRef, ...rest } = register(id, config);
  registerRef(ref.current);
  const imageState = watch(id);
  /** Opens file upload modal. */
  const upload = () => {
    ref.current?.click();
  };
  /** Clears current file. */
  const clear = () => {
    setValue(id, "");
  };
  const memoedState = useMemo(
    () =>
      typeof imageState === "object"
        ? Array.from(imageState)
        : imageState || [false],
    [imageState]
  );
  return {
    register: { ...rest, ref, type },
    upload,
    clear,
    imageState: memoedState,
  } as unknown as ImageUploadHookProps;
};
