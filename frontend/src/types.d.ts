type AllOrNothing<T> = T | Partial<Record<keyof T, undefined>>;

type APIResponse<T> =
  | { status: "success"; payload: T }
  | { status: "error"; message: string };

type FormFile = string | File;

type FormFileOptional = FormFile | false;

/** Image list on image upload. */
type ImageList = Image[];

/** Image list on optional image upload. */
type ImageListOptional = FormFileOptional[];

type httpMethods = "GET" | "POST" | "PUT" | "DELETE";

type SearchResult = Album | Song | Playlist;

type Album = {
  id: string;
  name: string;
  author: Author[id][];
  type: "Album" | "Kislemez";
  favorite: boolean;
  image: string;
};

/** Album type without user state */
type StatelessAlbum = Omit<Album, "favorite">;

type Song = {
  id: string;
  name: string;
  author: Author[id][];
  album: string;
  type: "Dal";
  favorite: boolean;
  fileType: string;
};

type MergedAlbum = Album & {
  author: Author[];
};

type MergedSong = Song & {
  author: Author[];
  album: Album;
};

/** Song type without user state */
type StatelessSong = Omit<Song, "favorite">;

type Playlist = {
  id: string;
  name: string;
  author: Author[id][];
};

type Author = {
  id: string;
  name: string;
  image: string;
};

type AlbumContents = {
  result: Album & {
    songs: Song[];
  };
  authorList: Author[];
};

type PlayListContents = {
  result: Playlist & {
    songs: Song[];
  };
  authorList: Author[];
  albumList: Album[];
};

type MergedAlbumWithSongList = MergedAlbum & { songs: MergedSong[] };