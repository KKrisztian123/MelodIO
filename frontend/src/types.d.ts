type AllOrNothing<T> = T | Partial<Record<keyof T, undefined>>;

type APIResponse<T> =
  | { status: "success"; payload: T }
  | { status: "error"; message: string };

type FormImage = string | File;

type FormImageOptional = FormImage | false;

/** Image list on image upload. */
type ImageList = Image[];

/** Image list on optional image upload. */
type ImageListOptional = FormImageOptional[];


type SearchResult = Album | Song | Playlist;

type Album = {
  id:string;
  title: string;
  author: author;
  type: "Album" | "Kislemez";
  favorite: boolean;
}

type Song = {
  id: string;
  title: string;
  author: author;
  AlbumId: string;
  type: "Dal";
  favorite: boolean;
}

type Playlist = {
  id:string;
  title: string;
  author: author;
  type: "Album" | "Kislemez";
}

type author = {
  id: string;
  name: string;
}

//search egy külön feature
// Searchel kezdünk holnap, átnézzük ezket a typeokat aztán kitaláljuk hogy lenne jó ráhúzni erre a gecire
// kilistázni
// likeolásra megírni a hookot
// igazából lehet olyan hook kéne ami ezeket a típusú listákat kezeli
// mock endpoint likeolásra optimistic likeolás => belikeolja, elküldi a responset ha a response success úgyhagyja ha nem akkor visszaállítja

//utána megcsináljuk a nincs internet popupot -> külön feature

//album fül, same as lejátszási lista  (pl.: song groups feature)