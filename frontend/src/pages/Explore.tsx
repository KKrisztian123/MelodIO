import { IonPage } from '@ionic/react';
import CenteredTextContainer from '../components/CenteredTextContainer';
import './Explore.css';
import PageContent from '../components/Layout/Frame/PageContent/PageContent';


const ExplorePage: React.FC = () => {
  return (
    <IonPage>
      <PageContent hasExternalHeader>
        <CenteredTextContainer title="Felfedezés" />
      </PageContent>
    </IonPage>
  );
};

export default ExplorePage;
