import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Selection.module.css";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import type { MouseEvent } from "react";
import { IonCol } from "@ionic/react";

export type SelectionItemProps = {
  /** Title of selection item */
  title: string;
  /** Icon of selection item */
  icon: IconProp;
  /** Changes the active state of selection item */
  isActive?: boolean;
  /** Selection item onClick callback function */
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  /** URl path */
  link?: string;
};

/** Selection items are displayed in modals inside a selection grid for choosing between multiple options. */
const SelectionItem = ({
  title,
  icon,
  isActive = false,
  onClick,
  link,
}: SelectionItemProps) => {
  if (link) {
    return (
        <Link to={link} className={styles.selectionLink}>
          <div
            className={
              isActive
                ? `${styles.selectionItem} ${styles.selectionActive}`
                : styles.selectionItem
            }
          >
            <div className={styles.selectionIcon}>
              <FontAwesomeIcon icon={icon} />
            </div>
            <div className={styles.selectionInfo}>
              <span className={styles.selectionTitle}>{title}</span>
              <span className={styles.activeTextWrapper}>
                {" "}
                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.span
                      initial={{ translateY: "-50%", opacity: 0 }}
                      animate={{ translateY: 0, opacity: 1 }}
                      exit={{ translateY: "-50%", opacity: 0 }}
                      className={styles.selectionActiveText}
                    >
                      Aktív
                    </motion.span>
                  )}
                </AnimatePresence>
              </span>
            </div>
          </div>
        </Link>
    );
  }
  return (
      <button onClick={onClick} className={styles.selectionLink}>
        <div
          className={
            isActive
              ? `${styles.selectionItem} ${styles.selectionActive}`
              : styles.selectionItem
          }
        >
          <div className={styles.selectionIcon}>
            <FontAwesomeIcon icon={icon} />
          </div>

          <div className={styles.selectionInfo}>
            <span className={styles.selectionTitle}>{title}</span>
            <span className={styles.activeTextWrapper}>
              {" "}
              <AnimatePresence initial={false}>
                {isActive && (
                  <motion.span
                    initial={{ translateY: "-50%", opacity: 0 }}
                    animate={{ translateY: 0, opacity: 1 }}
                    exit={{ translateY: "-50%", opacity: 0 }}
                    className={styles.selectionActiveText}
                  >
                    Aktív
                  </motion.span>
                )}
              </AnimatePresence>
            </span>
          </div>
        </div>
      </button>
  );
};

export default SelectionItem;
