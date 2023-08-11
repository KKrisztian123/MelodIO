import { Link } from "react-router-dom";
import styles from "./TitleRow.module.css";
import { H3 } from "@components/Titles/Titles";

const TitleRow = ({ title, link, linkText }) => (
  <div className={styles.titleRow}>
    <H3>{title}</H3>
    {link && linkText && <Link to={link} className={styles.link}>{linkText}</Link>}
  </div>
);

export default TitleRow;
