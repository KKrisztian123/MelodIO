import GridImageItem from "@components/GridImageItem/GridImageItem";
import { SmallLoader } from "@components/Loaders/Loaders";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./AlbumGridItem.module.css";

/** Displays album information in grid item */
const AlbumGridItem = ({ id, name, image, creators, type, active }) => {
  return (
    <GridImageItem
      albumId={id}
      albumName={name}
      url={`/albums/${id}`}
      imageUrl={image}
      albumCreators={creators}
      albumType={type}
      imageOrnament={
        <AnimatePresence>
          {active && (
            <motion.div
              className={styles.albumGridItem}
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
export default AlbumGridItem;
