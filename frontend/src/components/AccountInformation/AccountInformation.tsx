import ProfileImage, { ProfileImageProps } from "../ProfileImage/ProfileImage";
import styles from "./AccountInformation.module.css";

export type AccountInformation = Omit<ProfileImageProps, "name"> & {
  /** User name */
  userName: string;
  /** User email address */
  userEmail: string;
};

const AccountInformation = ({
  image,
  userName,
  userEmail,
}: AccountInformation) => {
  return (
    <div className={styles.accountInformation}>
      <ProfileImage size="medium" image={image} name={userName} />
      <div>
        <p className={styles.subTitle}>{userEmail}</p>
        <p className={styles.title}>{userName}</p>
      </div>
    </div>
  );
};
export default AccountInformation;
