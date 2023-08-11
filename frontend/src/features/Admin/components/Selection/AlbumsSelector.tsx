import { useFormSelectionContext } from "@hooks/useForm";
import AlbumSearch from "../AlbumSearch/AlbumSearch";
import { AlbumSearchFormSelectContent } from "../AlbumSearch/AlbumSearchContent";

const AlbumsSelector = () => {
  const {addToList} = useFormSelectionContext();
    return (
    <AlbumSearch>
      <AlbumSearchFormSelectContent onClick={addToList} />
    </AlbumSearch>
  );
};

export default AlbumsSelector;