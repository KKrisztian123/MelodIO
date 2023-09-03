import "./fields.css";
import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState, useEffect, useId, useCallback } from "react";
import { forwardRef } from "react";
import type { HTMLProps, PropsWithChildren, ReactNode } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

type Props = {
  /** Field input type. */
  type: string;
  /** Display name of inputfield */
  label: string;
  /** Accessible description of inputfield. This can be used to add helping text to an inputfield. */
  description?: string;
  /** Value of inputfield */
  value?: string;
  /** Optional right side decorator ornament. */
  rightOrnament?: ReactNode;
  /** Displayed error text. */
  error?: { errMessage: string };
};

export type InputFieldWithButtonProps = PropsWithChildren<Props> &
  Partial<HTMLProps<HTMLInputElement>> &
  Omit<UseFormRegisterReturn<string>, "ref">;

const InputFieldWithButton = forwardRef<
  HTMLInputElement,
  InputFieldWithButtonProps
>(
  (
    {
      type,
      label,
      description,
      error,
      value,
      children,
      rightOrnament,
      ...rest
    },
    ref
  ) => {
    const id = useId();
    const spanRef = useRef<HTMLSpanElement>();
    const [height, setHeight] = useState(15);
    const errMessage = error?.errMessage;

    const measure = useCallback(
      (span: HTMLSpanElement) => {
        const calc = span?.getBoundingClientRect()?.height;
        setHeight((current) => (calc > 0 ? calc : current));
      },
      [setHeight]
    );

    useEffect(() => {
      spanRef.current && measure(spanRef.current);
    }, [description, errMessage, measure]);

    return (
      <div className="inp-wrapper">
        <div className="inp-block-wrapper">
          <label htmlFor={`${id}-${label}`} className="inp">
            <input
              ref={ref}
              id={`${id}-${label}`}
              value={value}
              aria-invalid={errMessage ? "true" : "false"}
              type={type}
              {...rest}
              placeholder="&nbsp;"
            />
            <span className="label">{label}</span>
            <span className="focus-bg"></span>
            {rightOrnament && (
              <span className="right-ornament">{rightOrnament}</span>
            )}
          </label>
        </div>
        <motion.p
          animate={{ height: errMessage || description ? height : 0 }}
          className="inp-desc"
        >
          <span
            ref={(ref) => {
              if (!ref) return;
              measure(ref);
              spanRef.current = ref;
            }}
            role={errMessage && "alert"}
            className={errMessage && "inp-error"}
          >
            <AnimatePresence>
              {(errMessage || description) && (
                <motion.b
                  initial={{ opacity: 0, translateY: 10 }}
                  animate={{ opacity: 1, translateY: 0 }}
                  exit={{ opacity: 0, translateY: 10 }}
                >
                  {" "}
                  {errMessage ? errMessage : description}{" "}
                </motion.b>
              )}
            </AnimatePresence>
          </span>
        </motion.p>
        {children}
      </div>
    );
  }
);

InputFieldWithButton.displayName = "InputFieldWithButton";

export default InputFieldWithButton;
