import { IonSearchbar } from "@ionic/react";
import "./Search.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export type SearchFieldProps = {
  /** Optional placeholder text inside searchbox. */
  placeholder?: string;
  /** Sets the input debounce time in miliseconds. */
  debounce?: number;
  /** If `true` the searchbox is disabled. */
  disabled?: boolean;
  /** On change callback function. */
  onChange: (e: any) => void;
};

/** A debounced searchbox. */
const SearchField = ({
  placeholder = "Keresés",
  debounce = 300,
  disabled = false,
  onChange,
}: SearchFieldProps) => {
  return (
    <div className="search-container">
      <IonSearchbar
        placeholder={placeholder}
        debounce={debounce}
        disabled={disabled}
        onIonChange={onChange}
        onIonInput={onChange}
        onIonClear={onChange}
        enterkeyhint={"search"}
        inputmode="search"
        searchIcon={undefined}
        className={"searchbox"}
      />
      <div className="search-icon"><FontAwesomeIcon icon={faSearch}/></div>
    </div>
  );
};
export default SearchField;
