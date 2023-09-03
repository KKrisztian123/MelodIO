import { IonPage } from "@ionic/react";
import { type FC } from "react";
import Header from "@components/Layout/AppLayout/Header/Header";
import BackButton from "@components/Layout/BackButton";
import PageContent from "@components/Layout/Frame/PageContent/PageContent";
import { useSession } from "@features/Auth/Index";
import { FormBlock, FormFlex } from "@components/Form/FormBlocks";
import { useCurrentProfile } from "@features/Profile";
import { useConfigureCurrentProfile } from "@features/Profile/hooks/useCurrentProfile";
import EmailField from "@components/Form/input/EmailField";
import { useHistory } from "react-router";
import { useImageForm } from "@hooks/useImageForm";
import ImageForm from "@components/Form/ImageForm/ImageForm";

const ProfilePage: FC = () => {
  const { userId } = useSession();
  const profile = useCurrentProfile();
  const { set } = useConfigureCurrentProfile();
  const history = useHistory();
  const { preview, ...imageFormProps } = useImageForm(
    "POST",
    `/user/${userId}`,
    {
      onSuccess: (res) => (set(res), history.goBack()),
      defaultValues: {
        image: [profile.image],
        name: profile.name,
        email: profile.email,
      },
    }
  );

  return (
    <IonPage>
      <Header transparent leftOrnament={<BackButton />}>
        Profil szerkesztése
      </Header>
      <PageContent>
        <ImageForm
          preview={preview}
          {...imageFormProps}
          modalTitle="Profilkép"
          loaderText="Profil módosítása"
          buttonTitle="Módosítás"
          defaultValues={preview}
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
        </ImageForm>
      </PageContent>
    </IonPage>
  );
};
export default ProfilePage;
