import { IconButton } from "@components/Button/Button";
import ListContainer from "@components/List/ListContainer";
import { MemoedListItem } from "@components/List/ListItem";
import { useSearchContext } from "@features/Search";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { MemoArtistFormItem, MemoArtistItem } from "../Items/ArtistItem";

const ArtistSearchContent = () => {
  const { result } = useSearchContext();
  return (
    <ListContainer>
      {result && (
        <MemoedListItem
          link="/settings/artists/new"
          title="Hozzáadás"
          leftOrnament={
            <IconButton
              icon={faPlus}
              label={"Új előadó hozzáadása."}
              size="extraLarge"
            />
          }
          description="Új előadó hozzáadása."
        />
      )}
      {result &&
        result.map((artist) => <MemoArtistItem {...artist} key={artist.id} />)}
    </ListContainer>
  );
};
export default ArtistSearchContent;

export const ArtistSearchFormSelectContent = ({
  onClick,
}: {
  onClick: (id:string,author: Author) => void;
}) => {
  const { result } = useSearchContext();
  return (
    <ListContainer>
      {result &&
        result.map((artist) => (
          <MemoArtistFormItem onClick={onClick} {...artist} key={artist.id} />
        ))}
    </ListContainer>
  );
};
