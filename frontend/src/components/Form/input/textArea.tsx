import "./fields.css";
import { HTMLProps, useId } from "react";
import { FieldValues, RegisterOptions, useFormContext } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { forwardRef } from "react";

type BasicTextAreaProps = {
  /** Displayed name of the textarea. */
  label: string;
  /** Displayed accessible error message. */
  error: { errMessage?: string };
  /** Acessible description or helper text. */
  description?: string;
} & Omit<Partial<HTMLProps<HTMLTextAreaElement>>, "ref">;

const BasicTextArea = forwardRef<HTMLTextAreaElement, BasicTextAreaProps>(
  ({ label, description, error: { errMessage }, ...rest }, ref) => {
    const id = useId();
    const spanRef = useRef<HTMLSpanElement>(null);
    const [height, setHeight] = useState(15);

    useEffect(() => {
      const calc = spanRef.current?.getBoundingClientRect()?.height || 30;
      setHeight((current) => (calc > 0 ? calc : current));
    }, [description, errMessage]);

    return (
      <div className="inp-wrapper">
        <label htmlFor={`${id}-${label}`} className="inp">
          <textarea
            ref={ref}
            {...rest}
            id={`${id}-${label}`}
            aria-invalid={errMessage ? "true" : "false"}
            placeholder="&nbsp;"
          />
          <span className="label">{label}</span>
          <span className="focus-bg"></span>
        </label>
        <motion.p
          animate={{ height: errMessage || description ? height : 0 }}
          className="inp-desc"
        >
          <span
            ref={spanRef}
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
            {(errMessage || description) && <br />}
          </span>
        </motion.p>
      </div>
    );
  }
);

BasicTextArea.displayName = "BasicTextArea";

type FormProps = {
  /** Identifier for the textarea in the form response. */
  id: string;
  /** Optional react-hook-form input registration config */
  config?: RegisterOptions<FieldValues, string> | undefined;
};

export type TextAreaProps = FormProps & BasicTextAreaProps;

const TextArea = ({ id, config, ...rest }: TextAreaProps) => {
  const { register } = useFormContext();
  return <BasicTextArea {...rest} {...register(id, config)} />;
};
export default TextArea;
