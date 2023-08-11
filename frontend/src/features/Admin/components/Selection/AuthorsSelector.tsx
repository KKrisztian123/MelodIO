import { useFormSelectionContext } from "@hooks/useForm";
import ArtistSearch from "../ArtistSearch/ArtistSearch";
import { ArtistSearchFormSelectContent } from "../ArtistSearch/ArtistSearchContent";

const AuthorsSelector = () => {
  const {addToList} = useFormSelectionContext();
    return (
    <ArtistSearch>
      <ArtistSearchFormSelectContent onClick={addToList} />
    </ArtistSearch>
  );
};

export default AuthorsSelector;