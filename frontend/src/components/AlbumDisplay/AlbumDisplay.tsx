import { IonGrid } from "@ionic/react";
import { Link } from "react-router-dom";
import styles from "./AlbumDisplay.module.css";
import AlbumText from "../AlbumText/AlbumText";
import Image from "../Image/Image";

export type AlbumDisplayProps = {
  /** Token of album */
  albumId: string;
  /**  */
  imageUrl: string;
  /** Display name of album */
  albumName: string;
  /** Displays an array of album creators */
  albumCreators?: string[];
  /** Displays the albums type */
  albumType?: string;
};

/** This component can be used for displaying albums, playlists in a grid layout. */
const AlbumDisplay = ({
  albumId,
  imageUrl,
  albumName,
  albumCreators = [],
  albumType,
}: AlbumDisplayProps) => {
  return (
    <IonGrid key={albumId} className="">
      <Link className={styles.album} to={`/albums/${albumId}`}>
        <div className={styles.albumContainer}>
          <Image src={imageUrl} className={styles.albumImage} alt={albumName} />
          <AlbumText
            albumName={albumName}
            albumCreators={albumCreators}
            albumType={albumType}
          />
        </div>
      </Link>
    </IonGrid>
  );
};
export default AlbumDisplay;
