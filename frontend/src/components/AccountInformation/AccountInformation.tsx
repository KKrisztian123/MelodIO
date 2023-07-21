import { MImage, SizedImage } from "../Image/Image";
import ProfileImage from "../ProfileImage/ProfileImage";
import styles from "./AccountInformation.module.css";

export type AccountInformation = Omit<SizedImage, "alt"> & {
    /** User name */
    userName: string;
    /** User email address */
    userEmail: string;
}

const AccountInformation = ({src, userName, userEmail }: AccountInformation) => {
    return (
        <div className={styles.accountInformation}>
            <ProfileImage size="medium" image={src} name={userName}/>
            <div>
                <p className={styles.subTitle}>{userEmail}</p>
                <p className={styles.title}>{userName}</p>
            </div>
        </div>
    )
}
export default AccountInformation;
