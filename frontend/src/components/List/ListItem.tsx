import { IonItem } from "@ionic/react"
import TextBox, { TextBoxProps } from "../TextBox/TextBox"
import styles from "./List.module.css"
import { Link } from "react-router-dom"
import type { ReactNode } from "react";

export type ListItemProps = TextBoxProps & {
    /** Left side ornament of list item */
    leftOrnament: ReactNode;
    /** Right side ornament of list item which can contain buttons or links */
    rightOrnament?: ReactNode;
    /** Relative url */
    link: string;
};

/** List item component */
const ListItem = ({ title, leftOrnament, rightOrnament, description, link }: ListItemProps) => {
    return(
        <IonItem className={styles.item} lines="none">
            <Link to={link} className={styles.itemLink}>
                <div className={styles.itemInformation}>
                    <div className={styles.leftOrnament}>
                        {leftOrnament}
                    </div>
                    <div className={styles.itemText}>
                        <TextBox title={title} description={description} />
                    </div>
                    {rightOrnament && <div className={styles.rightOrnamentPlaceholder}></div>}
                </div>
            </Link>
            {rightOrnament && <div className={styles.rightOrnament}>{rightOrnament}</div>}
        </IonItem>
    )
}

export default ListItem;