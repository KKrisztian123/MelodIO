import { Link } from "react-router-dom";
import styles from "./TitleRow.module.css";
import { H3 } from "@components/Titles/Titles";

export type TitleRowProps = {
  /** Text of title */
  title: string;
  /** Optional link */
  link?: string;
  /** Optional text of link. */
  linkText?: string;
};

/** Main content block title with optional link. */
const TitleRow = ({ title, link, linkText }: TitleRowProps) => (
  <div className={styles.titleRow}>
    <H3>{title}</H3>
    {link && linkText && (
      <Link to={link} className={styles.link}>
        {linkText}
      </Link>
    )}
  </div>
);

export default TitleRow;
