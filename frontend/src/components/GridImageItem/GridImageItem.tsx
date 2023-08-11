import { IonCol } from "@ionic/react";
import { Link } from "react-router-dom";
import styles from "./GridImageItem.module.css";
import MusicalText from "../MusicalText/MusicalText";
import Image from "../Image/Image";
import { ReactNode } from "react";

export type GridImageItemProps = {
  /** Token of album */
  albumId: string;
  /** Url of image in the grid item.  */
  imageUrl: string;
  /** Url of the grid item.  */
  url: string;
  /** Display name of album */
  albumName: string;
  /** Displays an array of album creators */
  albumCreators?: string[];
  /** Displays the albums type */
  albumType?: string;
  /** Decorator of image item */
  imageOrnament?: ReactNode;
};

/** This component can be used for displaying albums, playlists in a grid layout. */
const GridImageItem = ({
  albumId,
  imageUrl,
  url,
  albumName,
  albumCreators = [],
  albumType,
  imageOrnament,
}: GridImageItemProps) => {
  return (
    <IonCol size="6" key={albumId} className={styles.column}>
      <Link className={styles.album} to={url}>
        <div className={styles.albumContainer}>
          <div className={styles.gridImageContainer}>
          <Image
            src={imageUrl}
            borderRadius={20}
            className={styles.albumImage}
            alt={albumName}
          />
          {imageOrnament && <div className={styles.imageOrnament}>{imageOrnament}</div>}
          </div>
          <MusicalText
            name={albumName}
            creators={albumCreators}
            type={albumType}
          />
        </div>
      </Link>
    </IonCol>
  );
};
export default GridImageItem;

