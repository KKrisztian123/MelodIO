import { type PropsWithChildren } from "react";
import styles from "./BottomNavigation.module.css";
import { useMainLocation } from "../../../../hooks/locationHooks";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { useSessionValidation } from "@features/Auth/Index";

const BottomNavigation = ({ children }: PropsWithChildren) => {
  const isValid = useSessionValidation();
  return isValid && <div className={styles.bottomNavigation}>{children}</div>;
};

export const BottomNavigationContainer = ({ children }: PropsWithChildren) => {
  return <div className={styles.bottomNavigationItems}>{children}</div>;
};

export type BottomNavigationButtonProps = {
  /** Url to navigate to. */
  to: string;
  /** Accessible label for the navigation button. */
  label: string;
  /** Displayed icon inside the button */
  icon: IconProp;
};

export const BottomNavigationButton = ({
  to,
  label,
  icon,
}: BottomNavigationButtonProps) => {
  const location = useMainLocation();

  return (
    <Link
      to={to}
      className={
        location === to.replaceAll("/", "")
          ? `${styles.navigationButton} ${styles.navigationButtonActive}`
          : styles.navigationButton
      }
      aria-label={label}
    >
      <motion.div
        animate={
          location === to.replaceAll("/", "") ? { scale: 1.25 } : { scale: 1 }
        }
        transition={{ duration: 0.25 }}
      >
        <FontAwesomeIcon icon={icon} />
      </motion.div>
    </Link>
  );
};

export default BottomNavigation;
