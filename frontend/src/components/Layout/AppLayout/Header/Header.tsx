import { IonHeader, IonTitle, IonToolbar } from "@ionic/react";
import type { PropsWithChildren, ReactNode } from "react";
import "./Header.css";
import { AnimatePresence, motion } from "framer-motion";

export type HeaderProps = {
  /** Optional left side ornament */
  leftOrnament?: ReactNode;
  /** Optional left side ornament */
  rightOrnament?: ReactNode;
  /** If `true` it sets the background color to transparent */
  transparent?: boolean;
};

const Header = ({
  children,
  leftOrnament,
  rightOrnament,
  transparent = false,
}: PropsWithChildren<HeaderProps>) => {
  return (
    <IonHeader
      className={transparent ? "mobile-header transparent" : "mobile-header"}
    >
      <div className="header-backdrop"></div>

      <IonToolbar>
        <AnimatePresence>
          {leftOrnament && (
            <motion.div
              initial={{ opacity: 0, y: 5, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 5, scale: 0.95 }}
              slot="start"
              className="left-ornament"
            >
              {leftOrnament}
            </motion.div>
          )}
        </AnimatePresence>
        <IonTitle className="mobile-header-title">{children}</IonTitle>
        <AnimatePresence>
          {rightOrnament && (
            <motion.div
              initial={{ opacity: 0, y: 5, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 5, scale: 0.95 }}
              slot="end"
              className="right-ornament"
            >
              {rightOrnament}
            </motion.div>
          )}
        </AnimatePresence>
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;

{
  /* <IconButton
icon={faChevronLeft}
type="tertiary"
size="extraLarge"
label="Vissza"
slot="start"
/> */
}

{
  /* <IconButton
icon={faChevronLeft}
type="tertiary"
size="extraLarge"
label="Vissza"
slot="end"
/> */
}
