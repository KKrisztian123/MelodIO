import { AnimationControls, TargetAndTransition, VariantLabels, motion } from "framer-motion";
import Text, { TextProps } from "./Text";
import { ForwardedRef, PropsWithChildren, forwardRef } from "react";

export type ErrorTextProps = {
    /** Animation controls from error hook. */
    animate: boolean | AnimationControls | TargetAndTransition | VariantLabels | undefined;
};

/** Paragraph for displaying text error. */
export const ErrorText = forwardRef(
  (
    {children,...props}: PropsWithChildren<Omit<TextProps, "classname" | "centered">>,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    return (
      <motion.div ref={ref}>
        <Text className="error" centered {...props} ><b>{children}</b></Text>
      </motion.div>
    );
  }
);

ErrorText.displayName = "ErrorText";
