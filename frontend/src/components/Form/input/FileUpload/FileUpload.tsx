import { HTMLProps, forwardRef, useEffect, useMemo, useRef, useState } from "react";
import styles from "./FileUpload.module.css";
import { FieldValues, useFormContext } from "react-hook-form";
import type { RegisterOptions, UseFormRegisterReturn } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";

type registerConfig = RegisterOptions<FieldValues, any> | undefined;

/** File upload required configuration props when used in forms. */
export type FileUploadProps = {
  /** Identifier for the input field in the form response. */
  id: string;
  /** Optional react-hook-form input registration config. */
  config: registerConfig;
};

type FileUploadHookProps = {
  /** File upload form control register. */
  register: UseFormRegisterReturn;
  /** Opens file upload modal. */
  upload: () => void;
  /** Clears file upload. */
  clear: () => void;
  /** Current value of fileupload. */
  fileState: File[] | false[] | string[];
};

/** File upload primitive props */
export type FileUploadPrimitiveProps = Omit<UseFormRegisterReturn, "ref"> &
  Partial<HTMLProps<HTMLInputElement>> & {
    /** Single or multiple file upload. */
    type?: "single" | "multiple";
    /** Displayed error text. */
    error?: { errMessage: string };
  };

/** File upload primitive. */
const FileUploadPrimitive = forwardRef<
  HTMLInputElement,
  FileUploadPrimitiveProps
>(({ type = "single", error, ...rest }, ref) => {
  const spanRef = useRef<HTMLSpanElement>(null);
  const [height, setHeight] = useState(15);
  const errMessage = error?.errMessage;

  useEffect(() => {
    const calc = spanRef.current?.getBoundingClientRect()?.height || 30;
    setHeight((current) => (calc > 0 ? calc : current));
  }, [errMessage]);

  return (
    <>
      <input
        type="file"
        ref={ref}
        multiple={type === "multiple"}
        className={styles.fileUpload}
        {...rest}
      />
      <motion.p
        animate={{ height: errMessage ? height - 20 : 0 }} //offset height calculation to fix padding
        className="inp-desc"
        style={{ margin: 0 }}
      >
        <span
          ref={spanRef}
          role={errMessage && "alert"}
          className={errMessage && "inp-error"}
          style={{ paddingTop: 30 }}
        >
          <AnimatePresence>
            {errMessage && (
              <motion.b
                initial={{ opacity: 0, translateY: 10 }}
                animate={{ opacity: 1, translateY: 0 }}
                exit={{ opacity: 0, translateY: 10 }}
              >
                {" "}
                {errMessage && errMessage}{" "}
              </motion.b>
            )}
          </AnimatePresence>
        </span>
      </motion.p>
    </>
  );
});
FileUploadPrimitive.displayName = "FileUploadPrimitive";

export default FileUploadPrimitive;

/** Returns controls for File upload component */
export const useFileUpload = (
  id: string,
  config: registerConfig,
  type?: "single" | "multiple"
) => {
  /** File upload input controls */
  const { register, watch, setValue } = useFormContext<FieldValues>();
  const ref = useRef<HTMLInputElement>(null);
  const { ref: registerRef, ...rest } = register(id, config);
  registerRef(ref.current);
  const fileState = watch(id);
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
      typeof fileState === "object"
        ? Array.from(fileState)
        : fileState || [false],
    [fileState]
  );
  return {
    register: { ...rest, ref, type },
    upload,
    clear,
    fileState: memoedState,
  } as unknown as FileUploadHookProps;
};
