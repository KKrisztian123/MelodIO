import { RootState } from "@/store";
import { IconButton } from "@components/Button/Button";
import Card from "@components/Card/Card";
import CardBox from "@components/CardBox/CardBox";
import { CarouselContext } from "@components/Carosuel/Carousel";
import CenteredContainer from "@components/Layout/Frame/CenteredContainer/CenteredContainer";
import { Loader } from "@components/Loaders/Loaders";
import MusicalText from "@components/MusicalText/MusicalText";
import { usePlayer } from "@features/Player";
import { usePlayerControls } from "@features/Player/hooks/usePlayer";
import usePlaying from "@features/Player/hooks/usePlaying";
import { useAlbum } from "@features/SongGroups";
import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { useSelector } from "react-redux";

const HistoryCard = ({
  albumId,
  index,
}: {
  albumId: string;
  index: number;
}) => {
  const { play } = usePlayer();
  const { album, errorContent, isLoading } = useAlbum(albumId);
  const { albumId: currentAlbumId } = usePlaying();
  const isPlaying = useSelector((state: RootState) => state.player.isPlaying);
  const { changePlay } = usePlayerControls();
  const currentIndex = useContext(CarouselContext);

  const playAlbum = () => {
    const songId = album.songs?.[0].id;
    songId && play(album.id, album.songs, songId);
  };

  return (
    <>
      {isLoading ? (
        <CenteredContainer>
          <Loader />
        </CenteredContainer>
      ) : !errorContent ? (
        <Card
          src={album.image}
          alt={album.name}
          link={`/albums/${album.id}`}
          ambientLight
          bottomOrnament={
            <CardBox
              content={
                <div style={{ paddingLeft: 21 }}>
                  <MusicalText
                    name={album.name}
                    type={album.type}
                    creators={album.author?.map(
                      (artist: Author) => artist.name
                    )}
                  />
                </div>
              }
              isVisible={index === currentIndex}
              rightOrnament={
                <IconButton
                  type={
                    album.id === currentAlbumId && isPlaying
                      ? "secondary"
                      : "primary"
                  }
                  isRounded
                  size="small"
                  label="Szörnyeteg album lejátszása"
                  icon={
                    album.id === currentAlbumId && isPlaying ? faPause : faPlay
                  }
                  onClick={
                    album.id !== currentAlbumId ? playAlbum : () => changePlay()
                  }
                />
              }
            />
          }
        />
      ) : null}
    </>
  );
};
export default HistoryCard;
