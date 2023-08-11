import {
  HTMLProps,
  PropsWithChildren,
  ReactNode,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { UseFormRegisterReturn } from "react-hook-form";

type Props = {
  /** Accessible description of inputfield. This can be used to add helping text to an inputfield. */
  description?: string;
  /** Value of inputfield */
  value?: string;
  /** Optional right side decorator ornament. */
  rightOrnament?: ReactNode;
  /** Displayed error text. */
  error?: { errMessage: string };
};

export type HiddenInput = PropsWithChildren<Props> &
  Partial<HTMLProps<HTMLInputElement>> &
  Omit<UseFormRegisterReturn<string>, "ref">;

/** Hidden form input component. Useful for making custom stateful form compontents. */
const HiddenInput = forwardRef<HTMLInputElement, HiddenInput>(
  ({ description, error, children, ...rest }, ref) => {
    const spanRef = useRef<HTMLSpanElement>(null);
    const [height, setHeight] = useState(15);
    const errMessage = error?.errMessage;

    useEffect(() => {
      const calc = spanRef.current?.getBoundingClientRect()?.height || 30;
      setHeight((current) => (calc > 0 ? calc : current));
    }, [description, errMessage]);
    return (
      <>
        <input {...rest} ref={ref} type="hidden" />
        <div className="inp-wrapper">
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
            </span>
          </motion.p>
        </div>

        {children}
      </>
    );
  }
);

HiddenInput.displayName = "HiddenInput";
export default HiddenInput;
