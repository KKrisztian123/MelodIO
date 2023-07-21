import type { CSSProperties } from "react";
import styles from "./Image.module.css";
import { IonImg } from "@ionic/react";

export type ImageProps = {
  /** The Image URL. */
  src: string;
  /** This attribute defines the alternative text describing the image. */
  alt?: string;
  /** Creates an ambient light around the image based on its contents. */
  ambientLight?: boolean;
  /** Size of the ambient light in pixels. */
  ambientLightSize?: number;
  /** Border radius of image */
  borderRadius?: number;
  /** Optional width of image */
  width?: number | string;
  /** Optional height of image */
  height?: number | string;
  /** Changes object fit behaviour of image */
  behaviour?: "contain" | "cover" | "none";
  /** CSS styling properties */
  style?: Omit<CSSProperties, "width" | "height">;
  /** Optional class name of image component. */
  className?: string;
};

/** General image compontent that lazily loads images when it gets into the viewport */
const Image = ({
  src,
  alt,
  ambientLight = false,
  ambientLightSize = 40,
  borderRadius = 33,
  width,
  behaviour = "contain",
  height,
  className,
  style,
  ...rest
}: ImageProps) => {
  const styleContent = { borderRadius: borderRadius, filter: `blur(${ambientLightSize}px)`};
  return (
    <div
      className={styles.imageContainer}
      style={{
        ...style,
        ...(typeof width !== "undefined" && { width: width }),
        ...(typeof height !== "undefined" && { height: height }),
      }}
      {...rest}
    >
      {ambientLight && (
        <IonImg
          src={src}
          alt={alt}
          className={`${styles.ambientLight} ${styles[behaviour]} ${className}`}
          style={styleContent}
        />
      )}
      <IonImg
        src={src}
        alt={alt}
        className={`${styles[behaviour]} ${className}`}
        style={{ borderRadius: borderRadius }}
      />
    </div>
  );
};

export default Image;

export type SizedImage = Omit<ImageProps, "width" | "height" | "borderRadius">;

/** Extra small image. 48px  */
export const XSImage = (props: SizedImage) => {
  return <Image {...props} width={48} height={"auto"} borderRadius={12} ambientLightSize={8} />;
};

/** Small image. 60px */
export const SImage = (props: SizedImage) => {
  return <Image {...props} width={60} height={"auto"} borderRadius={12} ambientLightSize={10} />;
};

/** Medium image. 80px */
export const MImage = (props: SizedImage) => {
  return <Image {...props} width={80} height={"auto"} borderRadius={16} ambientLightSize={13}/>;
};

/** Large image. 150px */
export const LImage = (props: SizedImage) => {
  return <Image {...props} width={150} height={"auto"} borderRadius={20} ambientLightSize={24} />;
};

/** Extra large image. 250px */
export const XLImage = (props: SizedImage) => {
  return <Image {...props} width={250} height={"auto"}  borderRadius={33} ambientLightSize={40} />;
};
