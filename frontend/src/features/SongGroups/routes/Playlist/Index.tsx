import { type FC } from "react";
import { IonGrid, IonPage, IonRow, RefresherEventDetail } from "@ionic/react";
import PageContent from "@components/Layout/Frame/PageContent/PageContent";
import { IonRefresher, IonRefresherContent } from "@ionic/react";
import Content from "@components/Layout/Frame/ContentContainer/Content";
import CenteredContainer from "@components/Layout/Frame/CenteredContainer/CenteredContainer";
import { SmallLoader } from "@components/Loaders/Loaders";
import PageFetchDisplay from "@components/PageFetchDisplay/PageFetchDisplay";
import AlbumGridItem from "@features/SongGroups/components/AlbumGridItem/AlbumGridItem";
import useLikedAlbums, {
  refetchLikedAlbums,
} from "@features/SongGroups/hooks/useLikedAlbums";
import { useCurrentProfile } from "@features/Profile";
import likedSongsImage from "@assets/likedSongs.svg";
import PlaylistGridItem from "@features/SongGroups/components/PlaylistGridItem/PlaylistGridItem";
import usePlaying from "@features/Player/hooks/usePlaying";

function handleRefresh(event: CustomEvent<RefresherEventDetail>) {
  setTimeout(() => {
    refetchLikedAlbums().then(() => event.detail.complete());
  }, 400);
}

const PlaylistsPage: FC = () => {
  const { likedAlbums, errorContent, isLoading } = useLikedAlbums();
  const profile = useCurrentProfile();
  const {albumId} = usePlaying();  

  return (
    <IonPage>
      <PageContent hasExternalHeader>
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent pullingIcon={null} refreshingSpinner={null}>
            <CenteredContainer>
              <SmallLoader />
            </CenteredContainer>
          </IonRefresherContent>
        </IonRefresher>
        <Content>
          <PageFetchDisplay
            error={errorContent}
            errorText={errorContent}
            loading={isLoading}
            loaderText="Lejátszási listák betöltése"
          >
            <IonGrid>
              <IonRow>
                <PlaylistGridItem
                  id="liked-songs"
                  active={false}
                  name={"Kedvelt dalok"}
                  image={likedSongsImage}
                  creators={[profile.name]}
                  type={"Lejátszási lista"}
                /> 
                {likedAlbums &&
                  likedAlbums?.map((res) => (
                    <AlbumGridItem
                      key={res.id}
                      id={res.id}
                      name={res.name}
                      image={res.image}
                      creators={res.author?.map((author) => author.name)}
                      type={res.type}
                      active={albumId === res.id}
                    />
                  ))}
              </IonRow>
            </IonGrid>
          </PageFetchDisplay>
        </Content>
      </PageContent>
    </IonPage>
  );
};

export default PlaylistsPage;
