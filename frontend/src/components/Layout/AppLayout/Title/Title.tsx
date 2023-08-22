import { AnimatePresence, motion } from "framer-motion";
import styles from "./Title.module.css";
import { ReactNode } from "react";

/** Animated Title */
const Title = ({
  title,
  letterKeys = "",
}: {
  title?: string;
  letterKeys?: string;
}) => (
  <span
    className={styles.title}
    style={{ display: "inline-block", overflow: "hidden" }}
  >
    <AnimatePresence key={"headerTitle"} mode="wait">
      {title?.split("").map((char, key) => (
        <Character
          character={char === " " ? <>&nbsp;</> : char}
          key={char + key + letterKeys}
          delay={key * 0.01}
        />
      ))}
    </AnimatePresence>
  </span>
);

/** Characters of animated title text. */
const Character = ({
  character,
  delay = 0,
}: {
  character: string | ReactNode;
  delay?: number;
}) => {
  return (
    <motion.span
      initial={{ y: "30%", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: "-30%", opacity: 0 }}
      className={styles.character}
      transition={{ duration: 0.15, delay: delay }}
    >
      {character}
    </motion.span>
  );
};

export default Title;
