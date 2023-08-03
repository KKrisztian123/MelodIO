import { IonPage } from '@ionic/react';
import CenteredTextContainer from '../components/CenteredTextContainer';
import './Playlists.css';
import PageContent from '../components/Layout/Frame/PageContent/PageContent';

const PlaylistsPage: React.FC = () => {
  return (
    <IonPage>
      <PageContent hasExternalHeader>
        <CenteredTextContainer title="Lejátszási listák" />
      </PageContent>
    </IonPage>
  );
};

export default PlaylistsPage;
