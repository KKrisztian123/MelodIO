import { PropsWithChildren } from "react";
import styles from "./NumberBox.module.css";

/** Square box for displaying song numbers in lists */
const NumberBox = ({ children }: PropsWithChildren) => {
  return <div className={styles.numberBox}>{children}</div>;
};

export default NumberBox