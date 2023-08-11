import { IonPage } from "@ionic/react";
import { Link } from "react-router-dom";
import PageContent from "@components/Layout/Frame/PageContent/PageContent";

const AlbumsPage: React.FC = () => {
  return (
    <IonPage>
      <PageContent hasExternalHeader>
        <Link to={"/albums/asd/"}>Konkrét album</Link>
      </PageContent>
    </IonPage>
  );
};

export default AlbumsPage;
