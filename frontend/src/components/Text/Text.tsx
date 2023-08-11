import { PropsWithChildren } from "react";
import styles from "./Text.module.css";

export type TextProps = {
  /** Centers the content horizontally. */
  centered?: boolean;
  /** Optional className of the text. */
  className?: string;
  /** When true it removes all margin from text. */
  marginless?: boolean;
};

/** Paragraph text component */
const Text = ({
  centered = false,
  marginless = false,
  children,
  className = "",
}: PropsWithChildren<TextProps>) => (
  <p
    className={[
      styles.text,
      centered ? styles.centered : undefined,
      className,
      marginless ? styles.marginless : undefined
    ].join(" ")}
  >
    {children}
  </p>
);

export default Text;
