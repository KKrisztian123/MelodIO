import styles from "./Card.module.css";
import type { ReactNode } from "react";
import Image from "../Image/Image";

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
};

/** Card with background image */
const Card = ({ src, alt, bottomOrnament, topOrnament, ambientLight }: CardProps) => {
  return (
    <div className={styles.card}>
      <Image src={src} alt={alt} behaviour="cover" height={"100%"} width={"100%"} ambientLight={ambientLight} />
      <div className={styles.cardOverlay}>
        <div className={styles.bottomShadow}></div>
      </div>
      <div className={styles.cardContent}>
        <div className={styles.topOrnament}>{topOrnament}</div>
        <div className={styles.bottomOrnament}>{bottomOrnament}</div>
      </div>
    </div>
  );
};


export default Card;
