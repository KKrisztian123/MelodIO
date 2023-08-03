import { IonPage } from "@ionic/react";
import type { FC } from "react";
import Header from "@components/Layout/AppLayout/Header/Header";
import BackButton from "@components/Layout/BackButton";
import CenteredTextContainer from "@components/CenteredTextContainer";
import PageContent from "@components/Layout/Frame/PageContent/PageContent";

const EqualizerPage: FC = () => {
  return (
    <IonPage>
      <Header
        transparent
        leftOrnament={
            <BackButton/>
        }
      >
        Hangszínszabályzó
      </Header>
      <PageContent>
        <CenteredTextContainer title="Hangszínszabályzó" />
      </PageContent>
    </IonPage>
  );
};
export default EqualizerPage;
