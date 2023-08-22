import { IonPage } from "@ionic/react";
import "./Search.css";
import PageContent from "../components/Layout/Frame/PageContent/PageContent";
import { Search, useSearch, useSearchContext } from "@features/Search";
import {
  mergeAlbumToSong,
  mergeArtistsToAlbums,
  mergeArtistsToSong,
} from "@/utils/utils";
import ListContainer from "@components/List/ListContainer";
import { useEffect, useState } from "react";
import { SongGroupItemWithImage } from "@features/SongGroups/components/SongItem/SongItem";
import { useLike } from "@features/SongGroups/hooks/useLike";

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
  const { result } = useSearchContext();
  const [mappedResult, setMappedResult] = useState({});
  const likeSong = useLike("song", mappedResult, setMappedResult);
  const likeAlbum = useLike("album", mappedResult, setMappedResult);
  useEffect(() => {
    setMappedResult({
      artists: result.results?.artists,
      albums: mergeArtistsToAlbums(result.results?.albums, result?.artists),
      songs: result.results?.songs?.map((song) =>
        mergeArtistsToSong(
          mergeAlbumToSong(song, result.albums),
          result.artists
        )
      ),
    });
  }, [result]);

  return (
    <ListContainer>
      {mappedResult.artists?.map((artist) => (
        <SongGroupItemWithImage
          title={artist.name}
          creators={["Előadó"]}
          image={artist.image}
          key={artist.id}
          id={artist.id}
        />
      ))}
      {mappedResult.albums?.map((album) => (
        <SongGroupItemWithImage
          title={album.name}
          type={album.type}
          creators={album.author.map((author) => author.name)}
          image={album.image}
          key={album.id}
          id={album.id}
          like={likeAlbum}
          favorite={album.favorite}
        />
      ))}
      {mappedResult.songs?.map((song) => (
        <SongGroupItemWithImage
          title={song.name}
          type="Dal"
          creators={song.author.map((author) => author.name)}
          image={song.album.image}
          key={song.id}
          id={song.id}
          like={likeSong}
          favorite={song.favorite}
        />
      ))}
    </ListContainer>
  );
};

export default SearchPage;
