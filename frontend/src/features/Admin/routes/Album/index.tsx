import Routes from "@components/Layout/Routing/RouteProvider";
import AuthenticatedRoute from "@components/Layout/Routing/AuthenticatedRoute";
import NewAlbumPage from "./newAlbum";
import { IonPage } from "@ionic/react";
import PageContent from "@components/Layout/Frame/PageContent/PageContent";
import BackButton from "@components/Layout/BackButton";
import Header from "@components/Layout/AppLayout/Header/Header";
import EditAlbumPage from "./editAlbum";
import AlbumSearch from "@features/Admin/components/AlbumSearch/AlbumSearch";
import AlbumSearchContent from "@features/Admin/components/AlbumSearch/AlbumSearchContent";

const AlbumsPage: React.FC = () => {
  return (
    <Routes mode="sync">
      <AuthenticatedRoute
        path={"/settings/albums/"}
        type="horizontalSlideParent"
        exact
        component={Albums}
      />
      <AuthenticatedRoute
        path={"/settings/albums/new"}
        type="horizontalSlide"
        component={NewAlbumPage}
      />
      <AuthenticatedRoute
        path={"/settings/albums/:albumId"}
        type="horizontalSlide"
        component={EditAlbumPage}
      />
    </Routes>
  );
};
export default AlbumsPage;

const Albums = () => (
  <IonPage>
    <Header leftOrnament={<BackButton />}>Albumok</Header>
    <PageContent fullWidth>
      <AlbumSearch>
        <AlbumSearchContent />
      </AlbumSearch>
    </PageContent>
  </IonPage>
);
