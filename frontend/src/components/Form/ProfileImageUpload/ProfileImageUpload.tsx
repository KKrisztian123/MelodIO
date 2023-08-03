import ImageUploadPrimitive, {
  ImageUploadProps,
  useImageUpload,
} from "../input/ImageUpload/ImageUpload";
import Button from "@components/Button/Button";
import Modal from "@components/Modal/Modal";
import ProfileImage from "@components/ProfileImage/ProfileImage";
import SelectionContainer from "@components/Selection/SelectionContainer";
import SelectionItem from "@components/Selection/SelectionItem";
import { faPen, faTrash, faUpload } from "@fortawesome/free-solid-svg-icons";
import styles from "./ProfileImageUpload.module.css";
import useToggle from "@hooks/useToggle";
import { useImageConversion } from "@hooks/useImageConversion";
import { useStatefulImageCompression } from "@hooks/useImageCompression";
import { FullScreenLoader } from "@components/Loaders/Loaders";

export type ProfileImageUploadProps = ImageUploadProps & {
  /** Optional profile name. */
  name?: string;
};

export type ProfileImageEditProps = {
  /** Current profile image. */
  image: false | string;
  /** Callback function for changing profile image. */
  upload: () => void;
  /** Callback function for clearing profile image. */
  clear: () => void;
  /** Name of the current profile. */
  name: string;
};

/** Profile image edit component */
const ProfileImageEdit = ({
  image,
  upload,
  clear,
  name,
}: ProfileImageEditProps) => {
  const [toggle, changeToggle] = useToggle();

  return (
    <>
      <div className={styles.profileImage}>
        <ProfileImage name={name} image={image} size="large" />
        <div className={styles.editButton}>
          <Button
            size="small"
            type="secondary"
            icon={faPen}
            text="Szerkesztés"
            onClick={() => changeToggle(true)}
          />
        </div>
        <Modal title="Profilkép" isOpen={toggle} changeOpen={changeToggle}>
          <SelectionContainer>
            <SelectionItem icon={faUpload} title="Feltöltés" onClick={upload} />
            <SelectionItem icon={faTrash} title="Törlés" onClick={clear} />
          </SelectionContainer>
        </Modal>
      </div>
    </>
  );
};

export const ProfileImageUpload = ({
  id,
  name,
  config,
}: ProfileImageUploadProps) => {
  const { register, upload, clear, imageState } = useImageUpload(id, config);
  const [loading, result] = useStatefulImageCompression(imageState);
  const image = useImageConversion(Array.isArray(result) ? result[0] : result);

  return (
    <>
      <ProfileImageEdit
        image={image}
        name={name || ""}
        upload={upload}
        clear={clear}
      />
      <FullScreenLoader loading={loading} text="Tömörítés" />
      <ImageUploadPrimitive {...register} />
    </>
  );
};
