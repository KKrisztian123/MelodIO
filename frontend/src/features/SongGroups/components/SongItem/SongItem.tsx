import { IconButton } from "@components/Button/Button";
import {
  MusicalListItem,
  MusicalListItemProps,
} from "@components/List/ListItem";
import NumberBox from "@components/NumberBox/NumberBox";
import { memo } from "react";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { XSImage } from "@components/Image/Image";
import { AnimatePresence, motion } from "framer-motion";
import { SmallLoader } from "@components/Loaders/Loaders";

export type SongGroupItemProps = {
  id: string;
  title: MusicalListItemProps["name"];
  creators: MusicalListItemProps["creators"];
  number: number;
  like: (songId: string) => void;
  onClick: (...v: any) => void;
  active?: boolean;
  favorite: boolean;
};

const SongGroupItem = memo(
  ({
    id,
    title,
    creators,
    number,
    like,
    favorite,
    onClick,
    active,
  }: SongGroupItemProps) => (
    <MusicalListItem
      name={title}
      creators={creators}
      leftOrnament={
        <AnimatePresence mode="wait" initial={false}>
          {active ? (
            <motion.div
              key="active"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <SmallLoader />
            </motion.div>
          ) : (
            <motion.div
              key="number"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <NumberBox>{number}</NumberBox>
            </motion.div>
          )}
        </AnimatePresence>
      }
      onClick={onClick}
      rightOrnament={
        like && (
          <IconButton
            type="tertiary"
            size="extraLarge"
            icon={favorite ? faHeartSolid : faHeart}
            isActive={favorite}
            label={
              favorite
                ? "Törlés a kedvelt dalok közül."
                : "Hozzáadás a kedvelt dalokhoz."
            }
            onClick={() => like(id)}
          />
        )
      }
    />
  )
);

export default SongGroupItem;

SongGroupItem.displayName = "SongGroupItem";

export type SongGroupItemWithImageProps = Omit<SongGroupItemProps, "number"> & {
  image: string;
  type?: MusicalListItemProps["type"];
};
export const SongGroupItemWithImage = memo(
  ({
    id,
    title,
    creators,
    like,
    favorite,
    image,
    type,
    onClick,
    active,
  }: SongGroupItemWithImageProps) => (
    <MusicalListItem
      name={title}
      creators={creators}
      type={type}
      leftOrnament={
        <AnimatePresence mode="wait" initial={false}>
          {active ? (
            <motion.div
              key="active"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <SmallLoader />
            </motion.div>
          ) : (
            <motion.div
              key="number"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <XSImage
                style={{ aspectRatio: 1 }}
                behaviour="cover"
                src={image}
                alt={title}
              />
            </motion.div>
          )}
        </AnimatePresence>
      }
      onClick={() => onClick(id)}
      rightOrnament={
        like && (
          <IconButton
            type="tertiary"
            size="extraLarge"
            icon={favorite ? faHeartSolid : faHeart}
            isActive={favorite}
            label={
              favorite
                ? "Törlés a kedvelt dalok közül."
                : "Hozzáadás a kedvelt dalokhoz."
            }
            onClick={() => like(id)}
          />
        )
      }
    />
  )
);

SongGroupItemWithImage.displayName = "SongGroupItemWithImage";
