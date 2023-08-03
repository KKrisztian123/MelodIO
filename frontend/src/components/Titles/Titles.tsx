import type { HTMLAttributes, PropsWithChildren } from "react";
import styles from "./Titles.module.css";

export type TitleProps = {
  /** Aligns the contents of the title to the center. */
  centered?: boolean;
  /** Sets the colour scheme for the title. */
  colours?: "auto" | "light" | "dark";
  /** Toggles text shadow */
  hasShadow?: boolean;
  /** className prop of H1 title. */
  className?: string;
} & HTMLAttributes<HTMLHeadingElement>;

/** H1 title compontent */
export const H1 = ({
  children,
  centered = false,
  colours = "auto",
  hasShadow = false,
  className,
  ...rest
}: PropsWithChildren<TitleProps>) => (
  <h1
    {...rest}
    className={[
      styles.title,
      centered ? styles.centered : null,
      styles[colours],
      hasShadow ? styles.shadow : null,
      className,
    ].join(" ")}
  >
    {children}
  </h1>
);

/** H2 title compontent */
export const H2 = ({
  children,
  centered = false,
  colours = "auto",
  hasShadow = false,
  ...rest
}: PropsWithChildren<TitleProps>) => (
  <h2
    {...rest}
    className={[
      styles.title,
      centered ? styles.centered : null,
      styles[colours],
      hasShadow ? styles.shadow : null,
    ].join(" ")}
  >
    {children}
  </h2>
);

/** H3 title compontent */
export const H3 = ({
  children,
  centered = false,
  colours = "auto",
  hasShadow = false,
  ...rest
}: PropsWithChildren<TitleProps>) => (
  <h3
    {...rest}
    className={[
      styles.title,
      centered ? styles.centered : null,
      styles[colours],
      hasShadow ? styles.shadow : null,
    ].join(" ")}
  >
    {children}
  </h3>
);

/** H4 title compontent */
export const H4 = ({
  children,
  centered = false,
  colours = "auto",
  hasShadow = false,
  ...rest
}: PropsWithChildren<TitleProps>) => (
  <h4
    {...rest}
    className={[
      styles.title,
      centered ? styles.centered : null,
      styles[colours],
      hasShadow ? styles.shadow : null,
    ].join(" ")}
  >
    {children}
  </h4>
);
