import { IonPage } from "@ionic/react";
import { memo, type FC } from "react";
import Header from "../../../../components/Layout/AppLayout/Header/Header";
import { useParams } from "react-router";
import PageContent from "../../../../components/Layout/Frame/PageContent/PageContent";
import BackButton from "@components/Layout/BackButton";
import PageFetchDisplay from "@components/PageFetchDisplay/PageFetchDisplay";
import useAlbum from "../../hooks/useAlbum";
import { IconButton } from "@components/Button/Button";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { useLike } from "../../hooks/useLike";
import SongGroup from "@features/SongGroups/components/SongGroup/SongGroup";

const AlbumPage: FC = () => {
  const { albumId } = useParams<{ albumId: string }>();
  const { album, setAlbum, errorContent, isLoading } = useAlbum(albumId);
  const like = useLike("song", album, setAlbum);
  const likeAlbum = useLike("album", album, setAlbum);
  return (
    <IonPage style={{ zIndex: 1 }}>
      <Header
        transparent
        leftOrnament={<BackButton />}
        rightOrnament={
          <IconButton
            type="tertiary"
            size="extraLarge"
            icon={album.favorite ? faHeartSolid : faHeart}
            label="Hozzáadás a kedvelt albumokhoz."
            onClick={() => likeAlbum(albumId)}
          />
        }
      >
        Album
      </Header>
      <PageContent fullWidth>
        <PageFetchDisplay
          error={!isLoading && errorContent}
          errorText={errorContent}
          loaderText={"Album betöltése"}
          loading={isLoading}
        >
          <SongGroup
            like={like}
            songGroup={album}
            play={() => console.log("play")}
          />
        </PageFetchDisplay>
      </PageContent>
    </IonPage>
  );
};
export default AlbumPage;

