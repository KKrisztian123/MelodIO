import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Chip.module.css";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

export type ChipProps = {
  /** Text inside Chip */
  text: string;
  /** Font Awesome Icon displayed inside Chip */
  icon: IconProp;
};

/** Chip for displaying additional information */
const Chip = ({ text, icon }: ChipProps) => {
  return (
    <div className={styles.chip}>
      {icon && (
        <span className={styles.chipIcon}>
          <FontAwesomeIcon icon={icon} />
        </span>
      )}
      {text}
    </div>
  );
};

export default Chip;
