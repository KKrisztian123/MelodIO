import { PropsWithChildren } from "react";
import styles from "./Content.module.css";

export type ContentProps = {
  /** Optional prop. When set to `true` it centers the its contents vertically. */
  center?: boolean;
  /** When `true` it adds padding to the sides of the container. This props counteract the PageContent component's `fullWidth` property. */
  sidePadded?: boolean;
};

/** A container for content groups. */
const Content = ({
  children,
  center = false,
  sidePadded = false,
}: PropsWithChildren<ContentProps>) => {
  return (
    <div
      className={[
        styles.content,
        center ? styles.center : undefined,
        sidePadded ? styles.sidePadded : undefined,
      ].join(" ")}
    >
      {children}
    </div>
  );
};
export default Content;
