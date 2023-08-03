import { IonPage } from "@ionic/react";
import { useState, type FC } from "react";
import Header from "@components/Layout/AppLayout/Header/Header";
import BackButton from "@components/Layout/BackButton";
import PageContent from "@components/Layout/Frame/PageContent/PageContent";
import Content from "@components/Layout/Frame/ContentContainer/Content";
import { useSession } from "@features/Auth/Index";
import { useAxios } from "@hooks/useFetch";
import Form from "@components/Form/Form";
import { FullScreenLoader } from "@components/Loaders/Loaders";
import { FormBlock, FormFlex } from "@components/Form/FormBlocks";
import TextField from "@components/Form/input/TextField";
import { ErrorText } from "@components/Text/ErrorText";
import useError from "@hooks/useError";
import ButtonContainer from "@components/ButtonContainer/ButtonContainer";
import Button from "@components/Button/Button";
import { useProfile } from "@features/Profile";

import { ProfileImageUpload } from "@components/Form/ProfileImageUpload/ProfileImageUpload";
import useImageCompression from "@hooks/useImageCompression";
import { useConfigureProfile } from "@features/Profile/hooks/useProfile";
import { Profile, ProfileRequest } from "../types";
import { createFormData, getImageFromList } from "@/utils/utils";

const ProfilePage: FC = () => {
  const { userId } = useSession();
  const [fetcher, loading] = useAxios("POST", `/user/${userId}/profile`);
  const { showError, errorContent, ref: errorRef } = useError();
  const profile = useProfile();
  const { set } = useConfigureProfile();
  const [name, setName] = useState(profile.name);
  const [compressing, , compress] = useImageCompression();

  const submitProfile = (v: ProfileRequest) => {
    const { image: images, ...rest } = v;
    compress(images).then(async (res) => {
      const image = getImageFromList(res);
      fetcher(createFormData({ ...rest, image: image })).then(
        (res: APIResponse<Profile>) =>
          res?.status === "success"
            ? set(res?.payload)
            : showError(res?.message || true)
      );
    });
  };

  return (
    <IonPage>
      <Header transparent leftOrnament={<BackButton />}>
        Profil szerkesztése
      </Header>
      <PageContent>
        <Form
          onSubmit={submitProfile}
          onChange={(v) => setName(v?.name)}
          defaultValues={{
            image: [profile.image],
            name: profile.name,
            email: profile.email,
          }}
        >
          <Content center>
            <ProfileImageUpload
              id="image"
              name={name}
              config={{
                required: { value: false, message: "" },
              }}
            />
          </Content>
          <Content>
            <FormFlex>
              <FormBlock>
                <TextField
                  id="name"
                  label="Név"
                  config={{ required: { value: true, message: "" } }}
                />
              </FormBlock>
            </FormFlex>
            <FormFlex>
              <FormBlock>
                <TextField
                  id="email"
                  label="E-mail cím"
                  config={{ required: { value: true, message: "" } }}
                />
              </FormBlock>
            </FormFlex>
            <ButtonContainer center>
              <Button text="Módosítás" size="extraLarge" buttonType="submit" />
            </ButtonContainer>
            <ErrorText ref={errorRef}>{errorContent}</ErrorText>
          </Content>
        </Form>
        <FullScreenLoader
          loading={compressing || loading}
          text="Profil módosítása"
        />
      </PageContent>
    </IonPage>
  );
};
export default ProfilePage;
