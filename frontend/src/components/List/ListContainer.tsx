import type { PropsWithChildren } from "react";
import styles from "./List.module.css";
import { IonList } from "@ionic/react";

/** A container for displaying multiple list items */
const ListContainer = ({ children }: PropsWithChildren) => {
  return <IonList className={styles.ListContainer}>{children}</IonList>;
};

export default ListContainer;
