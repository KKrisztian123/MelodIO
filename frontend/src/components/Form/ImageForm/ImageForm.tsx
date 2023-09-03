/* eslint-disable @typescript-eslint/ban-ts-comment */
import Button from "@components/Button/Button";
import ButtonContainer from "@components/ButtonContainer/ButtonContainer";
import Form, { FormProps } from "@components/Form/Form";
import { FormBlock, FormFlex } from "@components/Form/FormBlocks";
import { ImageUploadField } from "@components/Form/ImageUpload/ImageUpload";
import TextField from "@components/Form/input/TextField";
import Content from "@components/Layout/Frame/ContentContainer/Content";
import { FullScreenLoader } from "@components/Loaders/Loaders";
import { ErrorText } from "@components/Text/ErrorText";
import { PropsWithChildren } from "react";
import { checkFile } from "@/utils/utils";
import { useImageForm } from "@hooks/useImageForm";

export type ImageFormProps = ReturnType<typeof useImageForm> &
  Pick<FormProps, "defaultValues"> & {
    /** Optionally sets image to required. Default is `false`. */
    requiredImage?: boolean;
    /** Optional image key in form result. Default is `iamge`.  */
    imageId?: string;
    /** Text displayed inside loader. */
    loaderText: string;
    /** Text of form submit button. */
    buttonTitle: string;
    /** Name of the field that gives the initials to the image container */
    fieldName?: string;
    /** Id of the field that gives the initials to the image container */
    fieldId?: string;
    /** Title of image change modal. */
    modalTitle: string;
  };

/** Form component with image input */
const ImageForm = ({
  requiredImage = false,
  children,
  defaultValues,
  buttonTitle,
  loaderText,
  imageId = "image",
  fieldId = "name",
  fieldName = "Név",
  modalTitle,
  submit,
  setPreview,
  preview,
  errorRef,
  errorContent,
  isLoading,
  isCompressing,
}: PropsWithChildren<ImageFormProps>) => {
  return (
    <>
      <Form
        //@ts-ignore
        onSubmit={submit}
        onChange={setPreview}
        defaultValues={defaultValues}
      >
        <Content center>
          <ImageUploadField
            id={imageId}
            name={preview?.[fieldId]}
            modalTitle={modalTitle}
            config={{
              required: {
                value: false,
                message: "",
              },
              validate: {
                required: (v) =>
                  (requiredImage ? checkFile(v) : true) ||
                  "A kép feltöltése kötelező",
              },
            }}
          />
        </Content>
        <Content>
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
        loading={isCompressing || isLoading}
        text={loaderText}
      />
    </>
  );
};

export default ImageForm;
