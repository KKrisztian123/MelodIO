import { PropsWithChildren } from "react";
import styles from "./CenteredContainer.module.css";

/** A container for centering content on display. */
const CenteredContainer = ({ children }: PropsWithChildren) => (
  <div className={styles.container}>{children}</div>
);

export default CenteredContainer;
