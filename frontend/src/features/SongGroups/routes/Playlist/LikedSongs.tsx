import { IonPage } from "@ionic/react";
import { useCallback, type FC } from "react";
import Header from "../../../../components/Layout/AppLayout/Header/Header";
import PageContent from "../../../../components/Layout/Frame/PageContent/PageContent";
import BackButton from "@components/Layout/BackButton";
import PageFetchDisplay from "@components/PageFetchDisplay/PageFetchDisplay";
import ListContainer from "@components/List/ListContainer";
import { useLikeInList } from "../../hooks/useLike";
import { SongGroupItemWithImage } from "@features/SongGroups/components/SongItem/SongItem";
import useLikedSongs from "@features/SongGroups/hooks/useLikedSongs";
import { usePlayer } from "@features/Player";
import usePlaying from "@features/Player/hooks/usePlaying";

const LikedSongs: FC = () => {
  const { likedSongs, setLikedSongs, errorContent, isLoading } =
    useLikedSongs();
  const like = useLikeInList("song", likedSongs, setLikedSongs);
  const { play } = usePlayer();
  const { songId } = usePlaying();
  const playSong = useCallback(
    (songId: string) => {
      play("liked-songs", likedSongs.songs, songId);
    },
    [likedSongs.songs, play]
  );

  return (
    <IonPage style={{ zIndex: 1 }}>
      <Header transparent leftOrnament={<BackButton />}>
        Kedvelt dalok
      </Header>
      <PageContent fullWidth>
        <PageFetchDisplay
          error={!isLoading && errorContent}
          errorText={errorContent}
          loaderText={"Album betöltése"}
          loading={isLoading}
        >
          <ListContainer>
            {likedSongs.songs &&
              likedSongs.songs?.map((song: Song) => (
                <SongGroupItemWithImage
                  key={song?.id}
                  id={song?.id}
                  title={song?.name}
                  creators={song?.author?.map((author) => author.name)}
                  type={song.album?.name}
                  image={song.album?.image}
                  favorite={song?.favorite}
                  active={song?.id === songId}
                  like={like}
                  onClick={playSong}
                />
              ))}
          </ListContainer>
        </PageFetchDisplay>
      </PageContent>
    </IonPage>
  );
};
export default LikedSongs;
