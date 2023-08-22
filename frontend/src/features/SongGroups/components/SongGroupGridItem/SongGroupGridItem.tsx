import GridImageItem from "@components/GridImageItem/GridImageItem";
import { SmallLoader } from "@components/Loaders/Loaders";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./SongGroupGridItem.module.css";

/** Displays Grouped song information in grid item */
const SongGroupGridItem = ({
  urlPrefix,
  id,
  name,
  image,
  creators,
  type,
  active,
}) => {
  return (
    <GridImageItem
      id={id}
      name={name}
      url={`/${urlPrefix}/${id}`}
      imageUrl={image}
      creators={creators}
      type={type}
      imageOrnament={
        <AnimatePresence>
          {active && (
            <motion.div
              className={styles.songGroupGridItem}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
            >
              <SmallLoader withBackground />
            </motion.div>
          )}
        </AnimatePresence>
      }
    />
  );
};
export default SongGroupGridItem;
