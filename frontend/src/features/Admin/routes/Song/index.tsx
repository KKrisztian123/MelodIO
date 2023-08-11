import Routes from "@components/Layout/Routing/RouteProvider";
import AuthenticatedRoute from "@components/Layout/Routing/AuthenticatedRoute";
import { IonPage } from "@ionic/react";
import PageContent from "@components/Layout/Frame/PageContent/PageContent";
import BackButton from "@components/Layout/BackButton";
import Header from "@components/Layout/AppLayout/Header/Header";
import NewSongPage from "./newSong";
import EditSongPage from "./editSong";
import SongSearch from "@features/Admin/components/SongSearch/SongSearch";
import SongSearchContent from "@features/Admin/components/SongSearch/AlbumSearchContent";

const SongsPage: React.FC = () => {
  return (
    <Routes mode="sync">
      <AuthenticatedRoute
        path={"/settings/songs/"}
        type="horizontalSlideParent"
        exact
        component={Songs}
      />
      <AuthenticatedRoute
        path={"/settings/songs/new"}
        type="horizontalSlide"
        component={NewSongPage}
      />
      <AuthenticatedRoute
        path={"/settings/songs/:songId"}
        type="horizontalSlide"
        component={EditSongPage}
      />
    </Routes>
  );
};
export default SongsPage;

const Songs = () => {
  return (
    <IonPage>
      <Header leftOrnament={<BackButton />}>Dalok</Header>
      <PageContent fullWidth>
        <SongSearch>
          <SongSearchContent />
        </SongSearch>
      </PageContent>
    </IonPage>
  );
};
