import { FormBlock, FormFlex } from "@components/Form/FormBlocks";
import { FormSwitch } from "@components/Form/input/switch/Switch";
import Header from "@components/Layout/AppLayout/Header/Header";
import BackButton from "@components/Layout/BackButton";
import PageContent from "@components/Layout/Frame/PageContent/PageContent";
import ImageForm from "@components/Form/ImageForm/ImageForm";
import { SelectedAuthorsList } from "@features/Admin/components/Selection/SelectedAuthors";
import { useImageForm } from "@hooks/useImageForm";
import { IonPage } from "@ionic/react";
import type { FC } from "react";
import { useHistory } from "react-router";
import FormSelection from "@components/Form/FormSelection/FormSelection";
import AuthorsSelector from "@features/Admin/components/Selection/AuthorsSelector";

const NewAlbumPage: FC = () => {
  const history = useHistory();
  const imageFormProps = useImageForm("POST", "/albums", {
    onSuccess: () => history.goBack(),
    defaultValues: { name: "" },
  });

  return (
    <IonPage>
      <Header leftOrnament={<BackButton />}>Album létrehozása</Header>
      <PageContent>
        <ImageForm
          {...imageFormProps}
          buttonTitle="Létrehozás"
          loaderText="Előadó létrehozása"
          modalTitle="Borítókép"
          requiredImage
        >
          <FormSelection
            title="Előadók"
            selectorContentTitle="Előadó választása"
            addItemText="Előadó hozzáadása"
            type="multiple"
            selectionContent={<SelectedAuthorsList />}
            selectorContent={<AuthorsSelector />}
          />

          <FormFlex>
            <FormBlock>
              <FormSwitch
                id="kislemez"
                label="Kislemez típusú album"
                config={{ required: { value: false, message: "" } }}
              />
            </FormBlock>
          </FormFlex>
        </ImageForm>
      </PageContent>
    </IonPage>
  );
};

export default NewAlbumPage;
