import styles from "./Logo.module.css";
import logo from "@assets/Logo.svg"

const Logo = () => <img className={styles.logo} src={logo} alt="Logó" />
export default Logo;