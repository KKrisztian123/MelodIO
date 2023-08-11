import { Link } from "react-router-dom";
import styles from "./TextBox.module.css";
import type { ReactNode } from "react";
import { H3 } from "@components/Titles/Titles";

export type TextBoxProps = {
  /** Text box title */
  title: string;
  /** Text box description */
  description?: string | ReactNode;
  /** Optional className. */
  className?: string;
};

/** Title description combo Text box. */
const TextBox = ({ title, description, className }: TextBoxProps) => {
  return (
    <div
      className={className ? `${styles.textBox} ${className}` : styles.textBox}
    >
      <p className={styles.textBoxTitle}>{title}</p>
      {description && (
        <p className={styles.textBoxDescription}>{description}</p>
      )}
    </div>
  );
};
/** Large title description combo Text box. */
export const LargeTextBox = ({
  title,
  description,
  className,
}: TextBoxProps) => {
  return (
    <div
      className={
        className
          ? `${styles.textBox} ${styles.textBoxLarge} ${className}`
          : `${styles.textBox} ${styles.textBoxLarge}`
      }
    >
      <H3 className={styles.textBoxTitle}>{title}</H3>
      {description && (
        <p className={styles.textBoxDescription}>{description}</p>
      )}
    </div>
  );
};

export default TextBox;

export type LinkTextBoxProps = TextBoxProps & {
  /** Disables the link */
  isDisabled?: boolean;
  to: string;
};

/** A title discription combo text box that can be used for a list of menu navigations. */
export const LinkTextBox = ({
  isDisabled = false,
  to,
  ...rest
}: LinkTextBoxProps) => {
  return !isDisabled ? (
    <Link className={styles.linkTextBox} to={to}>
      <div className={styles.linkTextBoxContent}>
        <TextBox {...rest} />
      </div>
    </Link>
  ) : (
    <div className={`${styles.linkTextBox} ${styles.textBoxDisabled}`}>
      <TextBox {...rest} />
    </div>
  );
};
