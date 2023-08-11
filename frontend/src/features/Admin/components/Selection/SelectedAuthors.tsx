import { IconButton } from "@components/Button/Button";
import { XSImage } from "@components/Image/Image";
import ListContainer from "@components/List/ListContainer";
import ListItem from "@components/List/ListItem";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useFormSelectionContext } from "@hooks/useForm";

export const SelectedAuthorsList = () => {
  const { removeFromList, selectionInfo } = useFormSelectionContext();
  return (
    <ListContainer>
      {selectionInfo.map(({ id, values: item }, index) => (
        <ListItem
          key={id}
          title={item.name}
          description={"Előadó"}
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
        ></ListItem>
      ))}
    </ListContainer>
  );
};
