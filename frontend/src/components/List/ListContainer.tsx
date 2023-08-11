import type { PropsWithChildren } from "react";
import styles from "./List.module.css";
import { IonList } from "@ionic/react";
import { AnimatePresence } from "framer-motion";

/** A container for displaying multiple list items */
const ListContainer = ({ children }: PropsWithChildren) => {
  return (
    <IonList className={styles.ListContainer}>
      <AnimatePresence>{children}</AnimatePresence>
    </IonList>
  );
};

export default ListContainer;
