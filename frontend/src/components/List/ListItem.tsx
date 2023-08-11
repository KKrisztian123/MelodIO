import { IonItem } from "@ionic/react";
import TextBox, { TextBoxProps } from "../TextBox/TextBox";
import styles from "./List.module.css";
import { Link } from "react-router-dom";
import { useRef, type ReactNode, memo, PropsWithChildren } from "react";
import { motion } from "framer-motion";
import MusicalText, {
  MusicalTextProps,
} from "@components/MusicalText/MusicalText";

export type ListItemTemplate = {
  /** Left side ornament of list item */
  leftOrnament: ReactNode;
  /** Right side ornament of list item which can contain buttons or links */
  rightOrnament?: ReactNode;
  /** Relative url */
  link?: string;
  /** Text box component inside the list item. */
  textBox: ReactNode;
  /** On click callback function */
  onClick?: (v?: any) => void;
};

export type ListItemProps = TextBoxProps & Omit<ListItemTemplate, "textBox">;

/** List item component */
const ListItemTemplate = ({
  leftOrnament,
  rightOrnament,
  link,
  textBox,
  children,
  onClick,
}: PropsWithChildren<ListItemTemplate>) => {
  const listItemRef = useRef<HTMLIonItemElement>(null);
  const height = listItemRef.current?.clientHeight || 65;
  return (
    <motion.div
      initial={{ opacity: 0, maxHeight: 0 }}
      animate={{ opacity: 1, maxHeight: height }}
      exit={{ opacity: 0, maxHeight: 0 }}
    >
      <IonItem className={styles.item} lines="none" ref={listItemRef}>
        {link ? (
          <Link to={link} className={styles.itemLink}>
            <div className={styles.itemInformation}>
              <div className={styles.leftOrnament}>{leftOrnament}</div>
              <div className={styles.itemText} style={{ minHeight: 58 }}>
                {textBox}
              </div>
              {rightOrnament && (
                <div className={styles.rightOrnamentPlaceholder}></div>
              )}
            </div>
          </Link>
        ) : onClick ? (
          <button className={styles.itemLink} onClick={onClick}>
            <div className={styles.itemInformation}>
              <div className={styles.leftOrnament}>{leftOrnament}</div>
              <div className={styles.itemText} style={{ minHeight: 58 }}>
                {textBox}
              </div>
              {rightOrnament && (
                <div className={styles.rightOrnamentPlaceholder}></div>
              )}
            </div>
          </button>
        ) : (
          <div className={styles.itemLink}>
            <div className={styles.itemInformation}>
              <div className={styles.leftOrnament}>{leftOrnament}</div>
              <div className={styles.itemText} style={{ minHeight: 58 }}>
                {textBox}
              </div>
              {rightOrnament && (
                <div className={styles.rightOrnamentPlaceholder}></div>
              )}
            </div>
          </div>
        )}
        {rightOrnament && (
          <div className={styles.rightOrnament}>{rightOrnament}</div>
        )}
        {children}
      </IonItem>
    </motion.div>
  );
};

const ListItem = ({
  title,
  description,
  ...rest
}: PropsWithChildren<ListItemProps>) => (
  <ListItemTemplate
    {...rest}
    textBox={<TextBox title={title} description={description} />}
  />
);

export type MusicalListItemProps = MusicalTextProps &
  Omit<ListItemTemplate, "textBox">;

export const MusicalListItem = ({
  name,
  type,
  creators,
  ...rest
}: MusicalListItemProps) => (
  <ListItemTemplate
    {...rest}
    textBox={<MusicalText name={name} type={type} creators={creators} />}
  />
);

export const MemoedListItem = memo(ListItem);
export const MemoedMusicalListItem = memo(MusicalListItem);
export default ListItem;
