import styles from "./ProgressBar.module.css";
import { motion } from "framer-motion";

export type ProgressBarProps = {
  /** Size of the progress bar. */
  size?: "small" | "large";
  /** Optional Percentage value for stateful progress. */
  percentage?: number | false;
  /** Optional animation time between changes in miliseconds. */
  transitionTime?: number;
};

/** A progress bar displaying song progress and upload progress. */
const ProgressBar = ({
  size = "large",
  percentage = false,
  transitionTime = 1000,
}: ProgressBarProps) => {
  const style =
    percentage === false
      ? { animationDuration: transitionTime + "ms" }
      : undefined;
  return (
    <div className={`${styles.progressBar} ${styles[size]}`}>
      <motion.div
        className={
          percentage === false
            ? `${styles.progress} ${styles.progressAnimation}`
            : styles.progress
        }
        style={style}
        animate={percentage !== false ? { width: percentage + "%" } : undefined}
        transition={{ duration: transitionTime / 1000 }}
      ></motion.div>
    </div>
  );
};

export default ProgressBar;
