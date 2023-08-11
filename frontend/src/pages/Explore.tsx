import {
  IonPage,
  IonRefresher,
  IonRefresherContent,
  RefresherEventDetail,
} from "@ionic/react";
import "./Explore.css";
import PageContent from "../components/Layout/Frame/PageContent/PageContent";
import Content from "@components/Layout/Frame/ContentContainer/Content";
import { LatestAlbums, refetchLatestAlbums } from "@features/SongGroups";
import Card from "@components/Card/Card";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import MusicalText from "@components/MusicalText/MusicalText";
import CardBox from "@components/CardBox/CardBox";
import { IconButton } from "@components/Button/Button";
import { SmallLoader } from "@components/Loaders/Loaders";
import CenteredContainer from "@components/Layout/Frame/CenteredContainer/CenteredContainer";
import Carousel, { CarouselItem } from "@components/Carosuel/Carousel";

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
        <Content>
          <Carousel>
            <CarouselItem>
              <Card
                src="https://i.scdn.co/image/ab67616d00001e02441b8604cafa0913df05c6fd"
                alt="Rosszlány"
                ambientLight
                bottomOrnament={
                  <CardBox
                    content={
                      <div style={{ paddingLeft: 21 }}>
                        <MusicalText
                          name="Rosszlány"
                          type="Kislemez"
                          creators={["Dzsúdló"]}
                        />
                      </div>
                    }
                    isVisible={true}
                    rightOrnament={
                      <IconButton
                        type="primary"
                        isRounded
                        size="small"
                        label="Szörnyeteg album lejátszása"
                        icon={faPlay}
                      />
                    }
                  />
                }
              />
            </CarouselItem>
            <CarouselItem>
              <Card
                src="https://i.scdn.co/image/ab67616d0000b273f7b290fd3d65c17f21b8b7f3"
                alt="Szétszeretlek"
                ambientLight
                bottomOrnament={
                  <CardBox
                    content={
                      <div style={{ paddingLeft: 21 }}>
                        <MusicalText
                          name="Szétszeretlek"
                          type="Kislemez"
                          creators={["Halott Pénz", "Oláh Heléna"]}
                        />
                      </div>
                    }
                    isVisible={true}
                    rightOrnament={
                      <IconButton
                        type="primary"
                        isRounded
                        size="small"
                        label="Szörnyeteg album lejátszása"
                        icon={faPlay}
                      />
                    }
                  />
                }
              />
            </CarouselItem>
            <CarouselItem>
              <Card
                src="https://i.scdn.co/image/ab67616d00001e02bc3f33247a4190be63e40fb2"
                alt="Függő"
                ambientLight
                bottomOrnament={
                  <CardBox
                    content={
                      <div style={{ paddingLeft: 21 }}>
                        <MusicalText
                          name="Szörnyeteg"
                          type="Album"
                          creators={["Dzsúdló"]}
                        />
                      </div>
                    }
                    isVisible={true}
                    rightOrnament={
                      <IconButton
                        type="primary"
                        isRounded
                        size="small"
                        label="Szörnyeteg album lejátszása"
                        icon={faPlay}
                      />
                    }
                  />
                }
              />
            </CarouselItem>
          </Carousel>
        </Content>
        <LatestAlbums sidePadded />
      </PageContent>
    </IonPage>
  );
};

export default ExplorePage;
