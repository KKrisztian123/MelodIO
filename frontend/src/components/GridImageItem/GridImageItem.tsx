import { IonCol } from "@ionic/react";
import { Link } from "react-router-dom";
import styles from "./GridImageItem.module.css";
import MusicalText from "../MusicalText/MusicalText";
import Image from "../Image/Image";
import { ReactNode } from "react";

export type GridImageItemProps = {
  /** Token of item */
  id: string;
  /** Url of image in the grid item.  */
  imageUrl: string;
  /** Url of the grid item.  */
  url: string;
  /** Display name of item */
  name: string;
  /** Displays an array of creators */
  creators?: string[];
  /** Displays the type */
  type?: string;
  /** Decorator of image item */
  imageOrnament?: ReactNode;
};

/** This component can be used for displaying text information with an imageí in a grid layout. */
const GridImageItem = ({
  id,
  imageUrl,
  url,
  name,
  creators = [],
  type,
  imageOrnament,
}: GridImageItemProps) => {
  return (
    <IonCol size="6" key={id} className={styles.column}>
      <Link className={styles.album} to={url}>
        <div className={styles.albumContainer}>
          <div className={styles.gridImageContainer}>
            <Image
              src={imageUrl}
              borderRadius={20}
              className={styles.albumImage}
              alt={name}
            />
            {imageOrnament && (
              <div className={styles.imageOrnament}>{imageOrnament}</div>
            )}
          </div>
          <MusicalText name={name} creators={creators} type={type} />
        </div>
      </Link>
    </IonCol>
  );
};
export default GridImageItem;
