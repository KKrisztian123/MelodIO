import { IconButton } from "@components/Button/Button";
import { XSImage } from "@components/Image/Image";
import { MusicalListItem } from "@components/List/ListItem";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { memo } from "react";

/** Memoized album item for admin album search list */
export const AlbumItem = ({
  id,
  name,
  type,
  author,
  image,
}: StatelessAlbum) => {
  return (
    <MusicalListItem
      name={name}
      type={type}
      creators={author.map((author) => author.name)}
      link={`/settings/albums/${id}`}
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
export const MemoAlbumItem = memo(AlbumItem);

/** Memoized album item for admin album form list */
export const AlbumFormItem = ({
  id,
  name,
  type,
  author,
  image,
  onClick,
  ...rest
}: StatelessAlbum & {
  onClick: (id: string, album: StatelessAlbum) => void;
}) => {
  return (
    <MusicalListItem
      name={name}
      type={type}
      creators={author.map((author) => author.name)}
      rightOrnament={
        <IconButton
          icon={faPlus}
          label="Hozzáadás az albumok listájához."
          onClick={() =>
            onClick(id, { id, name, type, author, image, ...rest })
          }
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
export const MemoAlbumFormItem = memo(AlbumFormItem);
