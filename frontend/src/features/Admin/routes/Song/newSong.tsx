import { IonPage } from "@ionic/react";
import { type FC } from "react";
import Header from "@components/Layout/AppLayout/Header/Header";
import BackButton from "@components/Layout/BackButton";
import PageContent from "@components/Layout/Frame/PageContent/PageContent";
import { useHistory } from "react-router";
import FileForm from "@components/Form/FileForm/FileForm";
import { useFileForm } from "@hooks/useFileForm";
import FormSelection from "@components/Form/FormSelection/FormSelection";
import { SelectedAuthorsList } from "@features/Admin/components/Selection/SelectedAuthors";
import AuthorsSelector from "@features/Admin/components/Selection/AuthorsSelector";
import AlbumsSelector from "@features/Admin/components/Selection/AlbumsSelector";
import { SelectedAlbumsList } from "@features/Admin/components/Selection/SelectedAlbums";

const NewSongPage: FC = () => {
  const history = useHistory();
  const fileFormProps = useFileForm("POST", "/songs/new", {
    onSuccess: () => history.goBack(),
    defaultValues: { name: "" },
  });

  return (
    <IonPage>
      <Header leftOrnament={<BackButton />}>Dal létrehozása</Header>
      <PageContent fullWidth>
        <FileForm
          {...fileFormProps}
          buttonTitle="Létrehozás"
          loaderText="Dal létrehozása"
          fileFieldName="Hangfájl"
          requiredFile
          sidePadded
        >
          <FormSelection
            title="Album"
            selectorContentTitle="Album választása"
            addItemText="Album hozzáadása"
            type="single"
            id="albumId"
            selectionContent={<SelectedAlbumsList />}
            selectorContent={<AlbumsSelector />}
          />
          <FormSelection
            title="Előadók"
            selectorContentTitle="Előadó választása"
            addItemText="Előadó hozzáadása"
            type="multiple"
            id="artistIds"
            selectionContent={<SelectedAuthorsList />}
            selectorContent={<AuthorsSelector />}
          />
        </FileForm>
      </PageContent>
    </IonPage>
  );
};
export default NewSongPage;
