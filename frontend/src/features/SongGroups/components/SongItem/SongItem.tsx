import { IconButton } from "@components/Button/Button";
import { MusicalListItem } from "@components/List/ListItem";
import NumberBox from "@components/NumberBox/NumberBox";
import { memo } from "react";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { XSImage } from "@components/Image/Image";

const SongGroupItem = memo(
  ({ id, title, creators, number, like, favorite, onClick }) => (
    <MusicalListItem
      name={title}
      creators={creators}
      leftOrnament={<NumberBox>{number}</NumberBox>}
      onClick={onClick}
      rightOrnament={
        <IconButton
          type="tertiary"
          size="extraLarge"
          icon={favorite ? faHeartSolid : faHeart}
          label={
            favorite
              ? "Törlés a kedvelt dalok közül."
              : "Hozzáadás a kedvelt dalokhoz."
          }
          onClick={() => like(id)}
        />
      }
    />
  )
);

export default SongGroupItem;

SongGroupItem.displayName = "SongGroupItem";

export const SongGroupItemWithImage = memo(
  ({ id, title, creators, like, favorite, image, type, onClick }) => (
    <MusicalListItem
      name={title}
      creators={creators}
      type={type}
      leftOrnament={
        <XSImage style={{ aspectRatio: 1 }} src={image} alt={title} />
      }
      onClick={onClick}
      rightOrnament={
        <IconButton
          type="tertiary"
          size="extraLarge"
          icon={favorite ? faHeartSolid : faHeart}
          label={
            favorite
              ? "Törlés a kedvelt dalok közül."
              : "Hozzáadás a kedvelt dalokhoz."
          }
          onClick={() => like(id)}
        />
      }
    />
  )
);

SongGroupItemWithImage.displayName = "SongGroupItemWithImage";
