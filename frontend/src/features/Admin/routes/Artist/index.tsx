import Routes from "@components/Layout/Routing/RouteProvider";
import AuthenticatedRoute from "@components/Layout/Routing/AuthenticatedRoute";
import NewArtistPage from "./newArtist";
import { IonPage } from "@ionic/react";
import PageContent from "@components/Layout/Frame/PageContent/PageContent";
import BackButton from "@components/Layout/BackButton";
import Header from "@components/Layout/AppLayout/Header/Header";
import EditArtistPage from "./editArtist";
import ArtistSearch from "@features/Admin/components/ArtistSearch/ArtistSearch";
import ArtistSearchContent from "@features/Admin/components/ArtistSearch/ArtistSearchContent";

const ArtistsPage: React.FC = () => {
  return (
    <Routes mode="sync">
      <AuthenticatedRoute
        path={"/settings/artists/"}
        type="horizontalSlideParent"
        exact
        component={Artists}
      />
      <AuthenticatedRoute
        path={"/settings/artists/new"}
        type="horizontalSlide"
        component={NewArtistPage}
      />
      <AuthenticatedRoute
        path={"/settings/artists/:artistId"}
        type="horizontalSlide"
        component={EditArtistPage}
      />
    </Routes>
  );
};
export default ArtistsPage;

const Artists = () => {
  return (
    <IonPage>
      <Header leftOrnament={<BackButton />}>Előadók</Header>
      <PageContent fullWidth>
        <ArtistSearch>
          <ArtistSearchContent />
        </ArtistSearch>
      </PageContent>
    </IonPage>
  );
};