import Content from "@components/Layout/Frame/ContentContainer/Content";
import { XLImage } from "@components/Image/Image";
import { LargeMusicalText } from "@components/MusicalText/MusicalText";
import ListContainer from "@components/List/ListContainer";
import { FC } from "react";
import SongGroupItem from "../SongItem/SongItem";
import usePlaying from "@features/Player/hooks/usePlaying";

export type SongGroupProps = {
  /** Callback function for liking song. */
  like: (id: string) => void;
  /** Callback function for playing song */
  play: (songId: string) => void;
  /** Song Group Content */
  songGroup: MergedAlbumWithSongList;
};

/** Displays a list of grouped songs along with the groups name, author and image. */
const SongGroup: FC<SongGroupProps> = ({ like, play, songGroup }) => {
  const { songId } = usePlaying();

  return (
    <>
      <Content center sidePadded>
        <XLImage
          src={songGroup.image}
          alt={songGroup.name}
          ambientLight
          style={{ aspectRatio: 1 }}
        />
        <LargeMusicalText
          name={songGroup.name}
          creators={songGroup.author?.map((author: Author) => author.name)}
        />
      </Content>
      <ListContainer>
        {songGroup.songs?.map((song: MergedSong, id) => (
          <SongGroupItem
            key={song.id}
            id={song.id}
            title={song.name}
            creators={song.author?.map((author: Author) => author.name)}
            number={id + 1}
            favorite={song.favorite}
            like={like}
            onClick={() => play(song.id)}
            active={songId === song.id}
          />
        ))}
      </ListContainer>
    </>
  );
};
export default SongGroup;
