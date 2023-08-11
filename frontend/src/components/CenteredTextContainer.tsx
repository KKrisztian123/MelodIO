import { FC } from "react";
import styles from "./CenteredTextContainer.module.css";
import TextBox, { TextBoxProps } from "./TextBox/TextBox";
import { AnimatePresence, motion } from "framer-motion";

export type CenteredTextContainer = TextBoxProps & {
  /** Changes visibility of the contanier. */
  visible?: boolean;
};

/** A centered container for displaying text information. */
const CenteredTextContainer: FC<CenteredTextContainer> = ({
  title,
  description,
  visible = true,
}) => {
  return (
    <AnimatePresence initial={false}>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className={styles.container}
        >
            <TextBox
              title={title}
              description={
                <span className={styles.containerTextDescription}>
                  {description}
                </span>
              }
              className={styles.containerText}
            />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CenteredTextContainer;
