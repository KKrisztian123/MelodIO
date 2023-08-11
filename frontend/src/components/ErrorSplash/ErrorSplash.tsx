import CenteredContainer from "@components/Layout/Frame/CenteredContainer/CenteredContainer";
import { ErrorText } from "@components/Text/ErrorText";
import errorSvg from "@assets/error.svg";
import styles from "./ErrorSplash.module.css";
import { motion } from "framer-motion";

export type ErrorSplashProps = {
  /** Error text displayed under splash image. */
  text: string;
  /** Visibility of splash error. */
  visible: boolean;
};

/** Full page error display. */
const ErrorSplash = ({ text, visible }: ErrorSplashProps) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={
      visible
        ? { opacity: 1, display: "block" }
        : {
            opacity: 0,
            transitionEnd: {
              display: "none",
            },
          }
    }
  >
    <CenteredContainer>
      <img src={errorSvg} className={styles.errorSplash} alt="" />
      <ErrorText>{text}</ErrorText>
    </CenteredContainer>
  </motion.div>
);

export default ErrorSplash;
