import { PropsWithChildren } from "react";
import styles from "./Text.module.css";

export type TextProps = {
  /** Centers the content horizontally. */
  centered?: boolean;
  /** Optional className of the text. */
  className?: string;
};

/** Paragraph text component */
const Text = ({
  centered = false,
  children,
  className = "",
}: PropsWithChildren<TextProps>) => (
  <p
    className={
      centered
        ? `${styles.text} ${styles.centered} ${className}`
        : `${styles.text} ${className}`
    }
  >
    {children}
  </p>
);



export default Text;
