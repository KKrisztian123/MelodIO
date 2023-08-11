import Content from "@components/Layout/Frame/ContentContainer/Content";
import { XLImage } from "@components/Image/Image";
import { LargeMusicalText } from "@components/MusicalText/MusicalText";
import ListContainer from "@components/List/ListContainer";
import { FC } from "react";
import SongGroupItem from "../SongItem/SongItem";

const SongGroup: FC = ({ like, play, songGroup }) => {
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
          creators={songGroup.author?.map((author) => author.name)}
        />
      </Content>
      <ListContainer>
        {songGroup.songs?.map((song: Song, id) => (
          <SongGroupItem
            key={song.id}
            id={song.id}
            title={song.name}
            creators={song.author?.map((author) => author.name)}
            number={id + 1}
            favorite={song.favorite}
            like={like}
            onClick={() => play(song)}
          />
        ))}
      </ListContainer>
    </>
  );
};
export default SongGroup;
