import { IonPage } from "@ionic/react";
import { type FC } from "react";
import Header from "@components/Layout/AppLayout/Header/Header";
import BackButton from "@components/Layout/BackButton";
import PageContent from "@components/Layout/Frame/PageContent/PageContent";
import { FormBlock, FormFlex } from "@components/Form/FormBlocks";
import { isMatching } from "@/utils/utils";
import PasswordField from "@components/Form/input/PasswordField";
import EmailField from "@components/Form/input/EmailField";
import { useHistory } from "react-router";
import { useImageForm } from "@hooks/useImageForm";
import ImageForm from "@components/Form/ImageForm/ImageForm";

const NewUserPage: FC = () => {
  const history = useHistory();
  const { preview, ...imageFormProps } = useImageForm("POST", `/user/new`, {
    onSuccess: () => history.goBack(),
    defaultValues: { name: "" },
  });

  return (
    <IonPage>
      <Header leftOrnament={<BackButton />}>Profil létrehozása</Header>
      <PageContent>
        <ImageForm
          preview={preview}
          {...imageFormProps}
          modalTitle="Profilkép"
          buttonTitle="Létrehozás"
          loaderText="Profil létrehozása"
        >
          <FormFlex>
            <FormBlock>
              <EmailField
                id="email"
                label="E-mail cím"
                config={{ required: { value: true, message: "" } }}
              />
            </FormBlock>
          </FormFlex>
          <FormFlex>
            <FormBlock>
              <PasswordField
                id="password"
                label="Jelszó"
                config={{
                  required: { value: true, message: "" },
                  minLength: {
                    value: 8,
                    message:
                      "A jelszónak legalább 8 karakter hosszúnak kell lennie.",
                  },
                }}
              />
            </FormBlock>
          </FormFlex>
          <FormFlex>
            <FormBlock>
              <PasswordField
                id="passwordRepeat"
                label="Jelszó újra"
                config={{
                  required: { value: true, message: "" },
                  minLength: {
                    value: 8,
                    message:
                      "A jelszónak legalább 8 karakter hosszúnak kell lennie.",
                  },
                  validate: {
                    matches: (v) =>
                      isMatching(preview.password, v) ||
                      "A jelszavak nem egyeznek.",
                  },
                }}
              />
            </FormBlock>
          </FormFlex>
        </ImageForm>
      </PageContent>
    </IonPage>
  );
};
export default NewUserPage;
