import { PropsWithChildren } from "react";
import styles from "./Content.module.css";

export type ContentProps = {
    /** Optional prop. When set to `true` it centers the its contents vertically. */
    center?: boolean;
}

/** A container for content groups. */
const Content = ({ children, center = false }: PropsWithChildren<ContentProps>) => {
  return (
    <div
      className={center ? `${styles.content} ${styles.center}` : styles.content}
    >{children}</div>
  );
};
export default Content;
