import { IconButton } from "@components/Button/Button";
import ListContainer from "@components/List/ListContainer";
import {
  MemoedListItem,
} from "@components/List/ListItem";
import { useSearchContext } from "@features/Search";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { MemoSongItem } from "../Items/SongItem";

const SongSearchContent = () => {
  const { result } = useSearchContext();
  return (
    <ListContainer>
      {result && (
        <MemoedListItem
          link="/settings/songs/new"
          title="Hozzáadás"
          leftOrnament={
            <IconButton
              icon={faPlus}
              label={"Új dal hozzáadása."}
              size="extraLarge"
            />
          }
          description="Új dal hozzáadása."
        />
      )}
      {result &&
        result.map((song) => <MemoSongItem key={song.id} {...song} />)}
    </ListContainer>
  );
};

export default SongSearchContent;