import styles from "./PlayerWidget.module.css";
import useToggle from "@hooks/useToggle";
import FullScreenModal from "@components/Modal/FullScreenModal";
import FullScreenPlayer from "../FullScreenPlayer/FullScreenPlayer";
import WidgetContent from "./WidgetContent";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const PlayerWidget = () => {
  const [toggle, changeToggle] = useToggle();
  const isActive = useSelector((state: RootState) => state.player.active);

  return (
    <>
      <FullScreenModal
        isOpen={toggle}
        changeOpen={changeToggle}
        title="Lejátszó"
      >
        <FullScreenPlayer changeOpen={changeToggle} />
      </FullScreenModal>
      <motion.div
        className={styles.playerWidgetWrapper}
        initial={{ opacity: 0, maxHeight: 0 }}
        animate={
          isActive
            ? { opacity: 1, maxHeight: 100 }
            : { opacity: 1, maxHeight: 0 }
        }
      >
        <div className={styles.playerWidgetContainer}>
          <button
            onClick={() => changeToggle()}
            className={styles.playerWidgetFullScreen}
          ></button>
          <WidgetContent />
        </div>
      </motion.div>
    </>
  );
};

export default PlayerWidget;
