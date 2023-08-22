import { IonHeader, IonTitle, IonToolbar } from "@ionic/react";
import {
  type PropsWithChildren,
  type ReactNode,
} from "react";
import "./Header.css";
import { AnimatePresence, motion } from "framer-motion";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

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
  const scrolled = useSelector((state: RootState) => state.app.scrolled);
  const isTransparent = transparent ? transparent : !scrolled;
  return (
    <IonHeader
      className={isTransparent ? "mobile-header transparent" : "mobile-header"}
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
