import CenteredContainer from "@components/Layout/Frame/CenteredContainer/CenteredContainer";
import { ErrorText } from "@components/Text/ErrorText";
import errorSvg from "@assets/error.svg";
import styles from "./ErrorSplash.module.css";
import { AnimatePresence, motion } from "framer-motion";

export type ErrorSplashProps = {
  /** Error text displayed under splash image. */
  text: string;
  /** Visibility of splash error. */
  visible: boolean;
};

/** Full page error display. */
const ErrorSplash = ({ text, visible }: ErrorSplashProps) => (
  <AnimatePresence initial={false}>
    {visible && (
      <motion.div
      key={"errorSplash"}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, display: "block" }}
        exit={{ opacity: 0 }}
      >
        <CenteredContainer>
          <img src={errorSvg} className={styles.errorSplash} alt="" />
          <ErrorText>{text}</ErrorText>
        </CenteredContainer>
      </motion.div>
    )}
  </AnimatePresence>
);

export default ErrorSplash;
