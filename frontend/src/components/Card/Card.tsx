import styles from "./Card.module.css";
import type { ReactNode } from "react";
import Image from "../Image/Image";
import { Link } from "react-router-dom";

export type CardProps = {
  /** URL of background image. */
  src: string;
  /** This attribute defines the alternative text describing the background image. */
  alt?: string;
  /** Bottom ornament of the card */
  bottomOrnament?: ReactNode;
  /** Top ornament of the card */
  topOrnament?: ReactNode;
  /** Creates an ambient light around the card based on its contents. */
  ambientLight?: boolean;
  /** Optional link */
  link?: string;
};

/** Card with background image */
const Card = ({
  src,
  alt,
  link,
  bottomOrnament,
  topOrnament,
  ambientLight,
}: CardProps) => {
  return (
    <div className={styles.card}>
      <Image
        src={src}
        alt={alt}
        behaviour="cover"
        height={"100%"}
        width={"100%"}
        borderRadius={37}
        ambientLight={ambientLight}
        style={{ aspectRatio: 16 / 10 }}
      />
      <div className={styles.cardOverlay}>
        <div className={styles.bottomShadow}></div>
      </div>

      <div className={styles.cardContent}>
        <div className={styles.topOrnament}>{topOrnament}</div>
        {link && <Link className={styles.cardLink} to={link}/>}
        <div className={styles.bottomOrnament}>{bottomOrnament}</div>
      </div>
    </div>
  );
};

export default Card;
