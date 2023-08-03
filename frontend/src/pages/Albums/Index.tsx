import { IonPage } from "@ionic/react";
import Routes from "../../components/Layout/Routing/RouteProvider";
import Header from "../../components/Layout/AppLayout/Header/Header";
import Album from "./Album";
import { Link } from "react-router-dom";
import PageContent from "../../components/Layout/Frame/PageContent/PageContent";
import AuthenticatedRoute from "@components/Layout/Routing/AuthenticatedRoute";

const AlbumsPage: React.FC = () => {
  return (
      <Routes mode="sync">
        <AuthenticatedRoute path={"/albums/"} type="horizontalSlideParent"  exact component={Albums} />
        <AuthenticatedRoute path={"/albums/:albumId"} type="horizontalSlide" exact component={Album} />
      </Routes>
  );
};
const Albums: React.FC = () => {
  return (
    <IonPage>
      <Header>Minden dal</Header>
      <PageContent hasExternalHeader>
        <Link to={"/albums/asd/"}>Konkrét album</Link>
      </PageContent>
    </IonPage>
  );
};

export default AlbumsPage;
