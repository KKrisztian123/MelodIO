import FileUploadPrimitive, {
  FileUploadProps,
  useFileUpload,
} from "../input/FileUpload/FileUpload";
import Button from "@components/Button/Button";
import Modal from "@components/Modal/Modal";
import ProfileImage from "@components/ProfileImage/ProfileImage";
import SelectionContainer from "@components/Selection/SelectionContainer";
import SelectionItem from "@components/Selection/SelectionItem";
import { faPen, faTrash, faUpload } from "@fortawesome/free-solid-svg-icons";
import styles from "./ImageUpload.module.css";
import useToggle from "@hooks/useToggle";
import { useImageConversion } from "@hooks/useImageConversion";
import { useStatefulImageCompression } from "@hooks/useImageCompression";
import { FullScreenLoader } from "@components/Loaders/Loaders";

export type ImageUploadProps = FileUploadProps & {
  /** Optional image name. */
  name?: string;
  /** Title of image edit modal. */
  modalTitle: string;
};

export type ImageEditProps = {
  /** Current image. */
  image: false | string;
  /** Callback function for changing image. */
  upload: () => void;
  /** Callback function for clearing image. */
  clear: () => void;
  /** Name of the current image. */
  name: string;
  /** Title of image edit modal. */
  modalTitle: string;
};

/** Form image upload editor component */
const ImageUploadEditor = ({
  image,
  upload,
  clear,
  name,
  modalTitle,
}: ImageEditProps) => {
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
        <Modal title={modalTitle} isOpen={toggle} changeOpen={changeToggle}>
          <SelectionContainer>
            <SelectionItem icon={faUpload} title="Feltöltés" onClick={upload} />
            <SelectionItem icon={faTrash} title="Törlés" onClick={clear} />
          </SelectionContainer>
        </Modal>
      </div>
    </>
  );
};

/** Image upload with preview for forms */
export const ImageUploadField = ({
  id,
  name,
  config,
  modalTitle,
}: ImageUploadProps) => {
  const {
    register,
    upload,
    clear,
    fileState: imageState,
  } = useFileUpload(id, config);
  const [loading, result] = useStatefulImageCompression(imageState);
  const image = useImageConversion(Array.isArray(result) ? result[0] : result);

  return (
    <>
      <ImageUploadEditor
        image={image}
        name={name || ""}
        modalTitle={modalTitle}
        upload={upload}
        clear={clear}
      />
      <FullScreenLoader loading={loading} text="Tömörítés" />
      <FileUploadPrimitive
        {...register}
        accept=".png,.avif,.gif,.jpeg,.svg,.webp,.jpg"
      />
    </>
  );
};
