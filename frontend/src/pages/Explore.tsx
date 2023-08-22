import {
  IonPage,
  IonRefresher,
  IonRefresherContent,
  RefresherEventDetail,
} from "@ionic/react";
import "./Explore.css";
import PageContent from "../components/Layout/Frame/PageContent/PageContent";
import { LatestAlbums, refetchLatestAlbums } from "@features/SongGroups";
import { SmallLoader } from "@components/Loaders/Loaders";
import CenteredContainer from "@components/Layout/Frame/CenteredContainer/CenteredContainer";
import HistoryList from "@features/PlayHistory/components/HistoryList/HistoryList";
function handleRefresh(event: CustomEvent<RefresherEventDetail>) {
  setTimeout(() => {
    refetchLatestAlbums().then(() => event.detail.complete());
  }, 400);
}

const ExplorePage: React.FC = () => {
  return (
    <IonPage>
      <PageContent hasExternalHeader fullWidth>
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent pullingIcon={null} refreshingSpinner={null}>
            <CenteredContainer>
              <SmallLoader />
            </CenteredContainer>
          </IonRefresherContent>
        </IonRefresher>
        <HistoryList />
        <LatestAlbums sidePadded />
      </PageContent>
    </IonPage>
  );
};

export default ExplorePage;
