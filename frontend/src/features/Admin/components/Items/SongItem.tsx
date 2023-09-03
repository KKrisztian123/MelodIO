import { IconButton } from "@components/Button/Button";
import { MusicalListItem } from "@components/List/ListItem";
import NumberBox from "@components/NumberBox/NumberBox";
import { faMusic, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { memo } from "react";

/** Memoized song item for admin song search list */
export const SongItem = ({ id, name, author, album }: MergedSong) => {
  return (
    <MusicalListItem
      name={name}
      type={album.name}
      creators={author.map((author: Author) => author.name)}
      link={`/settings/songs/${id}`}
      leftOrnament={
        <NumberBox>
          <FontAwesomeIcon
            icon={faMusic}
            style={{ fontSize: "2rem", color: "var(--ion-color-primary-tint)" }}
          />
        </NumberBox>
      }
    />
  );
};
export const MemoSongItem = memo(SongItem);

/** Memoized song item for admin song form list */
export const SongFormItem = ({
  id,
  name,
  author,
  album,
  type,
  onClick,
  ...rest
}: MergedStatelessSong & {
  onClick: (id: string, author: MergedStatelessSong) => void;
}) => {
  return (
    <MusicalListItem
      name={name}
      type={album.name}
      creators={author.map((author: Author) => author.name)}
      rightOrnament={
        <IconButton
          icon={faPlus}
          label="Hozzáadás az dalok listájához."
          onClick={() =>
            onClick(id, { id, name, author, album, type, ...rest })
          }
          type="tertiary"
          size="extraLarge"
        />
      }
      leftOrnament={
        <NumberBox>
          <FontAwesomeIcon
            icon={faMusic}
            style={{ fontSize: "2rem", color: "var(--ion-color-primary-tint)" }}
          />
        </NumberBox>
      }
    />
  );
};
export const MemoSongFormItem = memo(SongFormItem);
