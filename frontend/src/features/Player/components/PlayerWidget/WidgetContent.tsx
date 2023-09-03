import { IconButton } from "@components/Button/Button";
import { XSImage } from "@components/Image/Image";
import MusicalText from "@components/MusicalText/MusicalText";
import ProgressBar from "@components/ProgressBar/ProgressBar";
import {
  usePlayerContextWithSeek,
  usePlayerControls,
} from "@features/Player/hooks/usePlayer";
import styles from "./PlayerWidget.module.css";
import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";

const WidgetContent = () => {
  const playerState = usePlayerContextWithSeek();
  const { changePlay } = usePlayerControls();

  return (
    <>
      <div className={styles.playerWidgetImage}>
        <XSImage
          behaviour="cover"
          style={{ aspectRatio: 1 }}
          src={playerState.song?.album?.image}
        />
      </div>
      <div className={styles.playerWidgetInfo}>
        <MusicalText
          name={playerState.song?.name}
          creators={playerState.song?.author?.map((author: Author) => author.name)}
        />
        <ProgressBar
          size="small"
          percentage={(playerState.currentTime / playerState.length) * 100}
          transitionTime={1000}
        />
      </div>
      <div className={styles.playerWidgetButton}>
        <IconButton
          size="extraLarge"
          type={playerState.isPlaying ? "secondary" : "primary"}
          icon={playerState.isPlaying ? faPause : faPlay}
          label={playerState.isPlaying ? "Szüneteltetés" : "Lejátszás"}
          onClick={() => changePlay()}
        />
      </div>
    </>
  );
};

export default WidgetContent;
