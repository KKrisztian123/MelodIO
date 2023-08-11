import { IconButton } from "@components/Button/Button";
import { XSImage } from "@components/Image/Image";
import ListItem from "@components/List/ListItem";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { memo } from "react";

/** Memoized artist item for admin artist search list */
export const ArtistItem = ({ id, name, image }: Author) => {
  return (
    <ListItem
      title={name}
      description={"Előadó"}
      link={`/settings/artists/${id}`}
      leftOrnament={
        <XSImage
          src={image}
          alt={name}
          behaviour="cover"
          style={{ aspectRatio: 1 }}
        />
      }
    />
  );
};
export const MemoArtistItem = memo(ArtistItem);

/** Memoized artist item for admin artist form list */
export const ArtistFormItem = ({
  id,
  name,
  image,
  onClick,
  ...rest
}: Author & { onClick: (id: string, author: Author) => void }) => {
  return (
    <ListItem
      title={name}
      description={"Előadó"}
      rightOrnament={
        <IconButton
          icon={faPlus}
          label="Hozzáadás az előadók listájához."
          onClick={() => onClick(id, { id, name, image, ...rest })}
          type="tertiary"
          size="extraLarge"
        />
      }
      leftOrnament={
        <XSImage
          src={image}
          alt={name}
          behaviour="cover"
          style={{ aspectRatio: 1 }}
        />
      }
    />
  );
};
export const MemoArtistFormItem = memo(ArtistFormItem);
