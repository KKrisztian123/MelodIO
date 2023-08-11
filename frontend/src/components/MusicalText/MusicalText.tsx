import TextBox, { LargeTextBox } from "../TextBox/TextBox";
import styles from "./MusicalText.module.css";

export type MusicalTextProps = {
  /** Display name of musical item. */
  name: string;
  /** Displays an array of creator names. */
  creators?: string[];
  /** Displays the musical item type. */
  type?: string;
};

/** A textbox for displaying Musical title and details. */
const MusicalText = ({
  name,
  creators = [],
  type,
}: MusicalTextProps) => {
const creatorsText = createArtistList(creators);
return (
    <TextBox
      title={name}
      description={
        type ? (
          <>
            <span className={styles.musicalType}>{type}</span>
            {creatorsText}
          </>
        ) : (
          creatorsText
        )
      }
    />
  );
};

/** A large textbox for displaying Musical title and details. */
export const LargeMusicalText = ({
  name,
  creators = [],
  type,
}: MusicalTextProps) => {
const creatorsText = createArtistList(creators);
return (
    <LargeTextBox
      title={name}
      description={
        type ? (
          <>
            <span className={styles.musicalType}>{type}</span>
            {creatorsText}
          </>
        ) : (
          creatorsText
        )
      }
    />
  );
};

/** A helper function for creating a list string from an array of artists */
export const createArtistList = (albumCreators = [] as string[]) => albumCreators.join(", ");

export default MusicalText;