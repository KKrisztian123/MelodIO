import { IonPage } from "@ionic/react";
import { type FC } from "react";
import Header from "../../../../components/Layout/AppLayout/Header/Header";
import PageContent from "../../../../components/Layout/Frame/PageContent/PageContent";
import BackButton from "@components/Layout/BackButton";
import PageFetchDisplay from "@components/PageFetchDisplay/PageFetchDisplay";
import ListContainer from "@components/List/ListContainer";
import { useLike } from "../../hooks/useLike";
import { SongGroupItemWithImage } from "@features/SongGroups/components/SongItem/SongItem";
import useLikedSongs from "@features/SongGroups/hooks/useLikedSongs";

const LikedSongs: FC = () => {
  const { likedSongs, setLikedSongs, errorContent, isLoading } =
    useLikedSongs();
  const like = useLike("song", likedSongs, setLikedSongs);
  console.log(likedSongs);
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
            {likedSongs.songs && likedSongs.songs?.map((song: Song, id) => (
              <SongGroupItemWithImage
                key={song?.id}
                id={song?.id}
                title={song?.name}
                creators={song?.author?.map((author) => author.name)}
                type={song.album?.name}
                image={song.album?.image}
                favorite={song?.favorite}
                like={like}
                onClick={() => console.log("asnyad")}
              />
            ))}
          </ListContainer>
        </PageFetchDisplay>
      </PageContent>
    </IonPage>
  );
};
export default LikedSongs;
