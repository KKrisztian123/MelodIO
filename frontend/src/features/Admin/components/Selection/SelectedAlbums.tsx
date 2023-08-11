import { IconButton } from "@components/Button/Button";
import { XSImage } from "@components/Image/Image";
import ListContainer from "@components/List/ListContainer";
import { MusicalListItem } from "@components/List/ListItem";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useFormSelectionContext } from "@hooks/useForm";

export const SelectedAlbumsList = () => {
  const { removeFromList, selectionInfo } = useFormSelectionContext();
  return (
    <ListContainer>
      {selectionInfo.map(({ id, values: item }, index) => (
        <MusicalListItem
          key={id}
          name={item.name}
          creators={item.author?.map((v) => v.name)}
          type={item.type}
          leftOrnament={
            <XSImage
              src={item.image}
              alt={item.name}
              behaviour="cover"
              style={{ aspectRatio: 1 }}
            />
          }
          rightOrnament={
            <IconButton
              icon={faXmark}
              label="Törlés"
              size="extraLarge"
              type="tertiary"
              onClick={() => removeFromList(index)}
            />
          }
        />
      ))}
    </ListContainer>
  );
};
