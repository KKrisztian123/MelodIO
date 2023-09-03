import { IonPage } from "@ionic/react";
import { type FC } from "react";
import Header from "@components/Layout/AppLayout/Header/Header";
import BackButton from "@components/Layout/BackButton";
import PageContent from "@components/Layout/Frame/PageContent/PageContent";
import { useHistory } from "react-router";
import { useImageForm } from "@hooks/useImageForm";
import ImageForm from "@components/Form/ImageForm/ImageForm";

const NewArtistPage: FC = () => {
  const history = useHistory();
  const imageFormProps = useImageForm("POST", "/artists/new", {
    onSuccess: () => history.goBack(),
    defaultValues: { name: "" },
  });

  return (
    <IonPage>
      <Header leftOrnament={<BackButton />}>Előadó létrehozása</Header>
      <PageContent>
        <ImageForm
          {...imageFormProps}
          buttonTitle="Létrehozás"
          modalTitle="Előadó"
          loaderText="Előadó létrehozása"
          requiredImage
        />
      </PageContent>
    </IonPage>
  );
};
export default NewArtistPage;
