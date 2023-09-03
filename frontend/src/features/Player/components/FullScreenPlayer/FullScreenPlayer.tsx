import { XLImage } from "@components/Image/Image";
import Content from "@components/Layout/Frame/ContentContainer/Content";
import styles from "./FullScreenPlayer.module.css";
import ButtonContainer from "@components/ButtonContainer/ButtonContainer";
import { IconButton } from "@components/Button/Button";
import {
  faBackwardStep,
  faForwardStep,
  faPause,
  faPlay,
  faRandom,
  faRepeat,
} from "@fortawesome/free-solid-svg-icons";
import RangeInput from "@components/Range/RangeInput";
import Text from "@components/Text/Text";
import { LargeMusicalText } from "@components/MusicalText/MusicalText";
import { secondsToTimeStamp } from "../../utils";
import {
  usePlayerContextWithSeek,
  usePlayerControls,
} from "@features/Player/hooks/usePlayer";
import { Link } from "react-router-dom";

const FullScreenPlayer = ({ changeOpen }) => {
  const playerState = usePlayerContextWithSeek();
  const { changeTimeStamp, skip, repeat, back, changePlay, randomize } =
    usePlayerControls();

  return (
    <div>
      <Content center></Content>
      <Content center>
        <Link
          onClick={() => changeOpen(false)}
          to={
            playerState.contentListId !== "liked-songs"
              ? `/albums/${playerState.contentListId}`
              : "/playlists/liked-songs"
          }
        >
          <XLImage
            behaviour="cover"
            src={playerState.song.album?.image}
            alt={`${playerState.song.album?.name} album.`}
            ambientLight
            style={{ aspectRatio: 1 }}
          ></XLImage>
        </Link>

        <LargeMusicalText
          name={playerState.song.name}
          creators={playerState.song?.author?.map((author: Author) => author.name)}
        />
        <div className={styles.playerControls}>
          <RangeInput
            min={0}
            max={playerState.length}
            value={playerState.currentTime}
            setValue={changeTimeStamp}
            step={1}
            className={styles.timeRange}
            startOrnament={
              <Text className={styles.startOrnament}>
                {secondsToTimeStamp(playerState.currentTime)}
              </Text>
            }
            endOrnament={
              <Text className={styles.endOrnament}>
                {secondsToTimeStamp(playerState.length)}
              </Text>
            }
            label="Lejátszás állapota"
          />
          <ButtonContainer center className={styles.controlsContainer}>
            <IconButton
              type="tertiary"
              size="extraLarge"
              label="Véletlenszerű lejátszás"
              icon={faRandom}
              onClick={() => randomize()}
              isActive={playerState.isRandomized}
            />
            <IconButton
              type="tertiary"
              size="extraLarge"
              label="Vissza"
              icon={faBackwardStep}
              onClick={() => back()}
            />
            <IconButton
              size="extraLarge"
              type={playerState.isPlaying ? "secondary" : "primary"}
              icon={playerState.isPlaying ? faPause : faPlay}
              label={playerState.isPlaying ? "Szüneteltetés" : "Lejátszás"}
              onClick={() => changePlay()}
            />
            <IconButton
              type="tertiary"
              size="extraLarge"
              label="Következő"
              icon={faForwardStep}
              onClick={() => skip()}
            />
            <IconButton
              type="tertiary"
              size="extraLarge"
              label="Ismétlés"
              icon={faRepeat}
              onClick={() => repeat()}
              isActive={playerState.isRepeat}
            />
          </ButtonContainer>
        </div>
      </Content>
    </div>
  );
};
export default FullScreenPlayer;
