import { IconButton } from "@components/Button/Button";
import ListContainer from "@components/List/ListContainer";
import { MemoedListItem } from "@components/List/ListItem";
import { useSearchContext } from "@features/Search";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { MemoAlbumItem } from "../Items/AlbumItem";
import { MemoAlbumFormItem } from "../Items/AlbumItem";

const AlbumSearchContent = () => {
  const { result, error, isLoading } = useSearchContext();
  return (
    <ListContainer>
      {!error.errorContent && !isLoading && (
        <MemoedListItem
          link="/settings/albums/new"
          title="Hozzáadás"
          leftOrnament={
            <IconButton
              icon={faPlus}
              label={"Új album hozzáadása."}
              size="extraLarge"
            />
          }
          description="Új album hozzáadása."
        />
      )}
      {result &&
        result.map((album: MergedStatelessAlbum) => (
          <MemoAlbumItem key={album.id} {...album} />
        ))}
    </ListContainer>
  );
};

export default AlbumSearchContent;

export const AlbumSearchFormSelectContent = ({
  onClick,
}: {
  onClick: (id: string, album: StatelessAlbum) => void;
}) => {
  const { result } = useSearchContext();
  return (
    <ListContainer>
      {result &&
        result.map((album: MergedStatelessAlbum) => (
          <MemoAlbumFormItem key={album.id} onClick={onClick} {...album} />
        ))}
    </ListContainer>
  );
};
