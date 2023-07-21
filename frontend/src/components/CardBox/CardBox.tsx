import { AnimatePresence, motion } from "framer-motion";
import styles from "./CardBox.module.css";
import { ReactNode } from "react";

export type CardBoxProps = {
  /** Optional right ornament */
  rightOrnament?: ReactNode;
  /** Box content */
  content: ReactNode;
  /** Changes the visibility of the component */
  isVisible: boolean;
};

/** A floating container for displaying content in the card */
const CardBox = ({
  content,
  rightOrnament,
  isVisible = false,
}: CardBoxProps) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ translateY: "100%", opacity: 0 }}
          animate={{ translateY: 0, opacity: 1 }}
          exit={{ translateY: "100%", opacity: 0 }}
          className={styles.container}
        >
          <div className={styles.boxContent}>{content}</div>
          {rightOrnament && (
            <div className={styles.rightOrnament}>{rightOrnament}</div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CardBox;
