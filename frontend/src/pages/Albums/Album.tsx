import { IonPage } from "@ionic/react";
import type { FC } from "react";
import Header from "../../components/Layout/AppLayout/Header/Header";
import CenteredTextContainer from "../../components/CenteredTextContainer";
import { useParams } from "react-router";
import { IconButton } from "../../components/Button/Button";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import PageContent from "../../components/Layout/Frame/PageContent/PageContent";

const Album: FC = () => {
  const { albumId } = useParams<{ albumId: string }>();
  return (
    <IonPage>
      <Header
        transparent
        leftOrnament={
          <IconButton
            label="Vissza"
            type="tertiary"
            size="extraLarge"
            link={"../"}
            icon={faChevronLeft}
          />
        }
      >
        Album
      </Header>
      <PageContent>
        <CenteredTextContainer title="Album" />
      </PageContent>
    </IonPage>
  );
};
export default Album;
