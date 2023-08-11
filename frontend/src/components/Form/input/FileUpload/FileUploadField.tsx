import Button from "@components/Button/Button";
import Modal from "@components/Modal/Modal";
import SelectionContainer from "@components/Selection/SelectionContainer";
import SelectionItem from "@components/Selection/SelectionItem";
import {
  faFileAudio,
  faPen,
  faTrash,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
import useToggle from "@hooks/useToggle";
import styles from "./FileUpload.module.css";
import FileUploadPrimitive, { useFileUpload } from "./FileUpload";
import FakeField from "../FakeField";
import { getImageFromList, isFile } from "@/utils/utils";

/** Form file upload editor component. */
const FileUploadEditor = ({ file, upload, clear, modalTitle, icon }) => {
  const [toggle, changeToggle] = useToggle();

  return (
    <>
      <div className={styles.fileUploadField}>
        <FakeField value={file} icon={icon} />
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

/** Input field style file upload field for forms */
const FileUploadField = ({ id, name, config }) => {
  const { register, fileState, ...rest } = useFileUpload(id, config);
  const file = getImageFromList(fileState);
  const fileName = isFile(file)
    ? file.name
    : file || `Nincs kiválasztott ${name.toLowerCase()}.`;
  return (
    <>
      <FileUploadEditor
        {...rest}
        file={fileName}
        icon={faFileAudio}
        modalTitle={name}
      />
      <FileUploadPrimitive {...register} accept=".mp3,.flac,.alac,.wav" />
    </>
  );
};

export default FileUploadField;
