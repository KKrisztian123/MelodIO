import TextBox from "../TextBox/TextBox";
import styles from "./AlbumText.module.css";

export type AlbumTextProps = {
  /** Display name of album */
  albumName: string;
  /** Displays an array of album creators */
  albumCreators?: string[];
  /** Displays the albums type */
  albumType?: string;
};

/** A textbox for displaying Album title and details */
const AlbumText = ({
  albumName,
  albumCreators = [],
  albumType,
}: AlbumTextProps) => {
const creators = createArtistList(albumCreators);
  return (
    <TextBox
      title={albumName}
      description={
        albumType ? (
          <>
            <span className={styles.albumType}>{albumType}</span>
            {creators}
          </>
        ) : (
          creators
        )
      }
    />
  );
};

/** A helper function for creating a list string from an array of artists */
export const createArtistList = (albumCreators = [] as string[]) => albumCreators.join(", ");

export default AlbumText;