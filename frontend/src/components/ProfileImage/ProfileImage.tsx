import { MImage, SizedImage, XLImage, XSImage } from "../Image/Image";
import styles from "./ProfileImage.module.css";

export type ProfileImageProps = {
  /** Full name of user */
  name: string;
  /** Profile picture of user */
  image?: string | false;
  /** Size of profile Image */
  size?: keyof typeof imageTypes;
};

const imageTypes: { [key: string]: (props: SizedImage) => JSX.Element } = {
  small: XSImage,
  medium: MImage,
  large: XLImage,
};

/** Displays various sized profile images or user initials */
const ProfileImage = ({ image, name, size = "large" }: ProfileImageProps) => {
  const ImageComponent = imageTypes[size];
  return (
    <div className={styles.profileImage}>
      {/** vagy a monogram egy sötétes szürkés háttéren vagy profile picture */}
      {image ? (
        <ImageComponent
          src={image}
          style={{ aspectRatio: 1 }}
          behaviour="cover"
          alt={`${name} profilképe.`}
        />
      ) : (
        <div className={`${styles.placeholder} ${styles[size]}`}>
          {getInitials(name)}
        </div>
      )}
    </div>
  );
};

export default ProfileImage;

const threeLetter: string[] = ["dzs"];
const twoLetter: string[] = ["cs", "dz", "gy", "ly", "ny", "sz", "ty", "zs"];

/** A helper function for creating a users initials from their full name. */
export const getInitials = (fullName: string) => {
  const initials: string[] = [];
  fullName
    .trim()
    .split(" ")
    .forEach((initial: string) => {
      if (threeLetter.indexOf(initial.slice(0, 3).toLowerCase()) !== -1) {
        initials.push(
          capitalizeString(initial.slice(0, 3).toLocaleLowerCase())
        );
      } else if (twoLetter.indexOf(initial.slice(0, 2).toLowerCase()) !== -1) {
        initials.push(
          capitalizeString(initial.slice(0, 2).toLocaleLowerCase())
        );
      } else {
        initials.push(initial.charAt(0)?.toUpperCase());
      }
    });
  return initials.join("");
};

const capitalizeString = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
