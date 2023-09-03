import { IonPage } from "@ionic/react";
import "./Search.css";
import PageContent from "../components/Layout/Frame/PageContent/PageContent";
import { Search, useSearch, useSearchContext } from "@features/Search";
import {
  mergeAlbumToSong,
  mergeArtistsToAlbums,
  mergeArtistsToSong,
  responseHandler,
} from "@/utils/utils";
import ListContainer from "@components/List/ListContainer";
import { memo, useCallback, useEffect, useState } from "react";
import {
  SongGroupItemWithImage,
  SongGroupItemWithImageProps,
} from "@features/SongGroups/components/SongItem/SongItem";
import { useLike } from "@features/SongGroups/hooks/useLike";
import { usePlayer } from "@features/Player";
import { useAxiosWithUrl } from "@hooks/useFetch";
import CenteredTextContainer from "@components/CenteredTextContainer";
import usePlaying from "@features/Player/hooks/usePlaying";

type SearchResult = {
  results: {
    artists: Author[];
    albums: Album[];
    songs: Song[];
  };
  artists: Author[];
  albums: Album[];
};

const SearchPage: React.FC = () => {
  const search = useSearch("search", { method: "GET", endpoint: "/search" });

  return (
    <IonPage>
      <PageContent hasExternalHeader fullWidth>
        <Search
          {...search}
          placeholder="Előadók, albumok és dalok"
          emptyText="Kezdj keresni"
          emptyDescription={"Keress rá előadókra, dalokra és albumokra."}
        >
          <SearchResult />
        </Search>
      </PageContent>
    </IonPage>
  );
};

const SearchResult = () => {
  const { result } = useSearchContext<SearchResult>();
  const [mappedResult, setMappedResult] = useState(
    {} as { [key: string]: any }
  );
  const likeSong = useLike("song", mappedResult, setMappedResult);
  const likeAlbum = useLike("album", mappedResult, setMappedResult);
  const [fetch] = useAxiosWithUrl("GET");
  const { play } = usePlayer();
  const { songId } = usePlaying();
  const fetchAndPlay = useCallback(
    (albumId: string, songId?: string) => {
      fetch(`/list/album/${albumId}`, {}).then((res) =>
        responseHandler(
          res,
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          () => {},
          (payload) => {
            const merged = mergeArtistsToAlbums(
              [payload.album],
              payload.authorList
            ) as unknown as MergedAlbumWithSongList;
            if (merged?.[0] && "songs" in merged[0]) {
              const { id, name, author, type, favorite, image } = merged[0];
              const songs =
                merged[0].songs?.map((song) =>
                  mergeAlbumToSong(
                    mergeArtistsToSong(song, payload.authorList) as Song & {
                      author: Author[];
                    },
                    [
                      {
                        id,
                        name,
                        author,
                        type,
                        favorite,
                        image,
                      },
                    ]
                  )
                ) || [];
              merged &&
                songs.length > 0 &&
                play(albumId, songs, songId || songs[0].id);
            }
          }
        )
      );
    },
    [play, fetch]
  );

  useEffect(() => {
    result &&
      setMappedResult({
        artists: result.results?.artists,
        albums: mergeArtistsToAlbums(result.results?.albums, result?.artists),
        songs: result.results?.songs?.map((song) =>
          mergeArtistsToSong(
            mergeAlbumToSong(
              song,
              result.albums as Album[]
            ) as unknown as MergedSong,
            result.artists
          )
        ),
      });
  }, [result]);
  return (
    <>
      <CenteredTextContainer
        key={"noResult"}
        visible={
          mappedResult.albums?.length === 0 && mappedResult.songs?.length === 0
        }
        title="Nincs találat!"
      />
      <ListContainer>
        {/* {mappedResult.artists?.map((artist) => (
        <SongGroupItemWithImage
          title={artist.name}
          creators={["Előadó"]}
          image={artist.image}
          key={artist.id}
          id={artist.id}
        />
      ))} */}
        {mappedResult.albums?.map((album: MergedAlbum) => (
          <SongGroupItemWithImage
            title={album.name}
            type={album.type}
            creators={album.author.map((author: Author) => author.name)}
            image={album.image}
            key={album.id}
            id={album.id}
            onClick={fetchAndPlay}
            like={likeAlbum}
            favorite={album.favorite}
          />
        ))}
        {mappedResult.songs?.map((song) => (
          <SongItemWithSongPlay
            title={song.name}
            type="Dal"
            creators={song.author.map((author) => author.name)}
            image={song.album.image}
            albumId={song.album.id}
            onClick={fetchAndPlay}
            key={song.id}
            id={song.id}
            active={song.id === songId}
            like={likeSong}
            favorite={song.favorite}
          />
        ))}
      </ListContainer>
    </>
  );
};

export default SearchPage;

const SongItemWithSongPlay = memo(
  ({
    onClick,
    albumId,
    ...rest
  }: SongGroupItemWithImageProps & { albumId: string }) => (
    <SongGroupItemWithImage
      {...rest}
      onClick={(id: string) => onClick(albumId, id)}
    />
  )
);
SongItemWithSongPlay.displayName = "SongItemWithSongPlay";
