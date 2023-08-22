import { IonGrid, IonPage, IonRefresher, IonRefresherContent, IonRow, RefresherEventDetail } from "@ionic/react";
import PageContent from "@components/Layout/Frame/PageContent/PageContent";
import useAlbums, { refetchAlbums } from "@features/SongGroups/hooks/useAlbums";
import Content from "@components/Layout/Frame/ContentContainer/Content";
import { memo } from "react";
import Card from "@components/Card/Card";
import { H3 } from "@components/Titles/Titles";
import AlbumGridItem from "@features/SongGroups/components/AlbumGridItem/AlbumGridItem";
import usePlaying from "@features/Player/hooks/usePlaying";
import CenteredContainer from "@components/Layout/Frame/CenteredContainer/CenteredContainer";
import { SmallLoader } from "@components/Loaders/Loaders";
const MemoedAlbum = memo(AlbumGridItem);

function handleRefresh(event: CustomEvent<RefresherEventDetail>) {
  setTimeout(() => {
    refetchAlbums().then(() => event.detail.complete());
  }, 400);
}


const AlbumsPage: React.FC = () => {
  const { albums } = useAlbums();
  const { albumId } = usePlaying();
  console.log(albums);
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
        {albums &&
          albums?.map((artist) => (
            <Content key={artist.id}>
              <Card
                src={artist.image}
                alt={artist.name}
                ambientLight
                bottomOrnament={<H3>{artist.name}</H3>}
              />
              <IonGrid style={{ marginTop: 20 }}>
                <IonRow>
                  {artist.albums &&
                    artist?.albums?.map((album) => (
                      <MemoedAlbum
                        key={album.id}
                        id={album.id}
                        name={album.name}
                        image={album.image}
                        creators={album.author?.map((author) => author.name)}
                        type={album.type}
                        active={album.id === albumId}
                      />
                    ))}
                </IonRow>
              </IonGrid>
            </Content>
          ))}
      </PageContent>
    </IonPage>
  );
};

export default AlbumsPage;
