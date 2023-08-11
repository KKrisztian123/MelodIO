import Button from "@components/Button/Button";
import ButtonContainer from "@components/ButtonContainer/ButtonContainer";
import Form, { FormProps } from "@components/Form/Form";
import { FormBlock, FormFlex } from "@components/Form/FormBlocks";
import TextField from "@components/Form/input/TextField";
import Content from "@components/Layout/Frame/ContentContainer/Content";
import { FullScreenLoader } from "@components/Loaders/Loaders";
import { ErrorText } from "@components/Text/ErrorText";
import { PropsWithChildren } from "react";
import { checkFile } from "@/utils/utils";
import { useFileForm } from "@hooks/useFileForm";
import FileUploadField from "../input/FileUpload/FileUploadField";

export type FileFormProps = ReturnType<typeof useFileForm> &
  Pick<FormProps, "defaultValues"> & {
    /** Optionally sets file to required. Default is `false`. */
    requiredFile?: boolean;
    /** Optional file key in form result. Default is `iamge`.  */
    fileId?: string;
    /** Text displayed inside loader. */
    loaderText: string;
    /** Text of form submit button. */
    buttonTitle: string;
    /** Name of the field that gives the initials to the file container */
    fieldName?: string;
    /** Id of the field that gives the initials to the file container */
    fieldId?: string;
    fileFieldName?: string;
    /** Pads the sides of input fields. */
    sidePadded?:boolean;
  };

/** Form component with file input */
const FileForm = ({
  requiredFile = false,
  children,
  defaultValues,
  buttonTitle,
  loaderText,
  fileFieldName = "fájl",
  fileId = "file",
  fieldId = "name",
  fieldName = "Név",
  sidePadded = false,
  submit,
  setPreview,
  errorRef,
  errorContent,
  isLoading,
}: PropsWithChildren<FileFormProps>) => {
  return (
    <>
      <Form
        onSubmit={submit}
        onChange={setPreview}
        defaultValues={defaultValues}
      >
        <Content center sidePadded={sidePadded}>
          <FileUploadField
            id={fileId}
            name={fileFieldName}
            config={{
              required: {
                value: false,
                message: "",
              },
              validate: {
                required: (v) =>
                  (requiredFile ? checkFile(v) : true) ||
                  `A ${fileFieldName.toLowerCase()} feltöltése kötelező`,
              },
            }}
          />
        </Content>
        <Content sidePadded={sidePadded}>
          <FormFlex>
            <FormBlock>
              <TextField
                id={fieldId}
                label={fieldName}
                config={{ required: { value: true, message: "" } }}
              />
            </FormBlock>
          </FormFlex>
          {children}
          <ButtonContainer center>
            <Button text={buttonTitle} size="extraLarge" buttonType="submit" />
          </ButtonContainer>
          <ErrorText ref={errorRef}>{errorContent}</ErrorText>
        </Content>
      </Form>
      <FullScreenLoader
        loading={isLoading}
        text={loaderText}
      />
    </>
  );
};

export default FileForm;
