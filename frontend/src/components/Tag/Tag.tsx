import type { PropsWithChildren } from "react";
import styles from "./Tag.module.css";

/** Small information tag for displaying short texts like file extension types. */
const Tag = ({ children }: PropsWithChildren) => (
  <div className={styles.tag}>{children}</div>
);

export type TagContainerProps = {
  /** When `true` it centers the tags inside the container. */
  center?: boolean;
};

/** A container for displaying multiple tags. */
export const TagContainer = ({
  children,
  center = false,
}: PropsWithChildren<TagContainerProps>) => (
  <div
    className={
      center ? `${styles.tagContainer} ${styles.center}` : styles.tagContainer
    }
  >
    {children}
  </div>
);

export default Tag;
