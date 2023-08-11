import { IonPage } from "@ionic/react";
import { FC } from "react";
import Header from "@components/Layout/AppLayout/Header/Header";
import BackButton from "@components/Layout/BackButton";
import PageContent from "@components/Layout/Frame/PageContent/PageContent";
import Content from "@components/Layout/Frame/ContentContainer/Content";
import { EndpointConfiguration } from "@features/ServerEndpoint";

const EndpointPage: FC = () => {
  return (
    <IonPage>
      <Header transparent leftOrnament={<BackButton />}>
        Végpont Beállítása
      </Header>
      <PageContent>
        <Content>
          <EndpointConfiguration />
        </Content>
      </PageContent>
    </IonPage>
  );
};
export default EndpointPage;
