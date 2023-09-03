import { IconButton } from "@components/Button/Button";
import ListContainer from "@components/List/ListContainer";
import { MemoedListItem } from "@components/List/ListItem";
import { useSearchContext } from "@features/Search";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { MemoSongItem } from "../Items/SongItem";

const SongSearchContent = () => {
  const { result, error, isLoading } = useSearchContext();
  return (
    <ListContainer>
      {!error.errorContent && !isLoading && (
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
      {result && result.map((song: MergedSong) => <MemoSongItem key={song.id} {...song} />)}
    </ListContainer>
  );
};

export default SongSearchContent;
