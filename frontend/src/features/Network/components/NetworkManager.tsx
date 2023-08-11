import Chip from "@components/Chip/Chip";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import useNetworkManager from "../hooks/networkHooks";
import styles from "./NetworkManager.module.css";
import { motion } from "framer-motion";

/** Manages network state */
const NetworkManager = () => {
  const [network] = useNetworkManager();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={
        network.connected
          ? {
              opacity: 0,
              transitionEnd: { display: "none" },
              scale: 0.8,
              y: 15,
              x: "-50%",
            }
          : { opacity: 1, display: "block", scale: 1, y: 0, x: "-50%" }
      }
      className={styles.networkStatus}
    >
      <Chip icon={faGlobe} text="Nincs internet" />
    </motion.div>
  );
};

export default NetworkManager;
