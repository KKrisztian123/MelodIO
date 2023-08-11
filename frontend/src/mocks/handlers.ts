import { imageToB64, isFile } from "@/utils/utils";
import { Profile } from "@features/Profile/types";
import { rest } from "msw";
import mockImage from "./mockImage";

const artists = [
  {
    name: "Dzsúdló",
    id: "ab6761610000e5eb",
    image: "https://i.scdn.co/image/ab6761610000e5eb8bd25d94f453f876989532a3",
  },
  {
    name: "Halott pénz",
    id: "ab67616100005174b3",
    image: "https://i.scdn.co/image/ab67616100005174b3fc61b6c878d3e07e78cfe0",
  },
  {
    name: "Dzsúdló2",
    id: "ab6761610000e5eb2",
    image: "https://i.scdn.co/image/ab6761610000e5eb8bd25d94f453f876989532a3",
  },
  {
    name: "Halott pénz2",
    id: "ab67616100005174b32",
    image: "https://i.scdn.co/image/ab67616100005174b3fc61b6c878d3e07e78cfe0",
  },
] as Author[];

const songs = [
  {
    id: "ab67616177805174b32",
    name: "Rosszlány",
    author: ["ab6761610000e5eb2"],
    album: "ab67616112205174b325",
    type: "Dal",
    fileType: "mp3",
    favorite: true,
  },
  {
    id: "ab67616177805174cc8",
    name: "Függő",
    author: ["ab6761610000e5eb"],
    album: "ab67616110105174b326",
    type: "Dal",
    fileType: "mp3",
    favorite: true,
  },
  {
    id: "ab6161001151051cd8",
    name: "Szétszeretlek",
    author: ["ab67616100005174b3", "ab67616100005174b32"],
    album: "ab67616100115174b3",
    type: "Dal",
    fileType: "mp3",
    favorite: true,
  },
  {
    id: "ab67616171806674cc8",
    name: "Intro",
    author: ["ab6761610000e5eb"],
    album: "ab6761611100e5eb2",
    type: "Dal",
    fileType: "mp3",
    favorite: true,
  },
  {
    id: "ab67616171806674cd3",
    name: "Pont én",
    author: ["ab6761610000e5eb"],
    album: "ab6761611100e5eb2",
    type: "Dal",
    fileType: "mp3",
    favorite: true,
  },
  {
    id: "cd67616171806674cc8",
    name: "Vér",
    author: ["ab6761610000e5eb"],
    album: "ab6761611100e5eb2",
    type: "Dal",
    fileType: "mp3",
    favorite: false,
  },
  {
    id: "ab67ddc107811e5eb",
    name: "Az idő",
    author: ["ab67616100005174b3"],
    album: "ab6761610111e5eb",
    type: "Dal",
    fileType: "mp3",
    favorite: true,
  },
] as Song[];

const albums = [
  {
    id: "ab6761610111e5eb",
    name: "Az idő",
    type: "Kislemez",
    author: ["ab67616100005174b3"],
    image: "https://i.scdn.co/image/ab67616d0000b2730b6c32b5f52078b384d81a70",
    favorite: false,
  },
  {
    id: "ab67616100115174b3",
    name: "Szétszeretlek",
    type: "Kislemez",
    author: ["ab67616100005174b3", "ab67616100005174b32"],
    image: "https://i.scdn.co/image/ab67616d0000b273f7b290fd3d65c17f21b8b7f3",
    favorite: true,
  },
  {
    id: "ab6761611100e5eb2",
    name: "Szörnyeteg",
    type: "Album",
    author: ["ab6761610000e5eb"],
    image: "https://i.scdn.co/image/ab67616d0000b273773bdf93fd396de23d71f63b",
    favorite: false,
  },
  {
    id: "ab67616110105174b326",
    name: "Függő",
    type: "Kislemez",
    author: ["ab6761610000e5eb"],
    image: "https://i.scdn.co/image/ab67616d00001e02bc3f33247a4190be63e40fb2",
    favorite: true,
  },
  {
    id: "ab67616112205174b325",
    name: "Rosszlány",
    type: "Kislemez",
    author: ["ab6761610000e5eb"],
    image: "https://i.scdn.co/image/ab67616d00001e02441b8604cafa0913df05c6fd",
    favorite: false,
  },
] as Album[];

const errorResponse = (message: string) =>
  JSON.stringify({
    status: "error",
    message: message,
  });

const successResponse = (payload: object | object[]) =>
  JSON.stringify({
    status: "success",
    payload: payload,
  });

export const handlers = [
  /** Auth: NoAuth; logout mock response */
  rest.post("/login", (req, res, ctx) => {
    return res(
      // Respond with a 200 status code
      ctx.delay(1000),
      ctx.body(
        successResponse({
          session:
            "t34utt33v5hz9qdoggd3ox0osm0uw5bd-yy55jrrnzyi9aj3jlje099yon5d3p2vi",
          authLevel: "admin",
          userId: 1,
        })
      ),
      ctx.status(200)
    );
  }),
  /** Auth: NoAuth; melodio server validation mock response */
  rest.get("/checkConnection", (req, res, ctx) => {
    return res(
      // Respond with a 200 status code
      ctx.delay(1000),
      ctx.body(
        successResponse({
          valid: true,
        })
      ),
      ctx.status(200)
    );
  }),
  /** Auth: User; logout mock response */
  rest.get("/logout", (req, res, ctx) => {
    return res(
      // Respond with a 200 status code
      ctx.delay(1000),
      ctx.body(successResponse({})),
      ctx.status(200)
    );
  }),
  /** Auth: User; password change mock response */
  rest.post("/user/:userId/passwordChange", async (req, res, ctx) => {
    let body = successResponse({});
    const payload = await req.json();
    if (payload.password === payload.newPassword) {
      body = errorResponse("Az új jelszó nem lehet ugyanaz, mint a régi.");
    }
    if (payload.newPasswordRepeat !== payload.newPassword) {
      body = errorResponse("Az új jelszavak nem egyeznek.");
    }

    return res(ctx.delay(1000), ctx.body(body), ctx.status(200));
  }),
  /** Auth: User; get information mock response */
  rest.get("/user/:userId/", async (req, res, ctx) => {
    const body = successResponse({
      email: "janedoe@gmail.com",
      image: mockImage,
      name: "Jane Doe",
      lastUpdate: new Date(
        "Mon Jul 31 2023 11:26:58 GMT+0200 (közép-európai nyári idő)"
      ).toJSON(),
    } as Profile);

    return res(ctx.delay(1000), ctx.body(body), ctx.status(200));
  }),
  /** Auth: User Profile edit mock response  */
  rest.post("/user/:userId/profile", async (req, res, ctx) => {
    const payload = (await req.body) as Profile;
    const image = payload.image;

    const body = successResponse({
      email: payload.email,
      image: isFile(image) ? await imageToB64(image) : image,
      name: payload.name,
      lastUpdate: new Date().toJSON(),
    } as Profile);

    return res(ctx.delay(1000), ctx.body(body), ctx.status(200));
  }),
  /** Auth: Admin; new user creation mock response */
  rest.post("/user/new", async (req, res, ctx) => {
    const body = successResponse({});
    return res(ctx.delay(1000), ctx.body(body), ctx.status(200));
  }),
  /** Auth: User; artists mock response */
  rest.get("/artists", async (req, res, ctx) => {
    const params = req.url.searchParams.getAll("artistIds[]");
    const specifiedArtists: Author[] = [];
    Array.isArray(params) &&
      params.forEach((artist) => {
        const specificArtist = artists.find((v) => artist === v.id);
        specificArtist && specifiedArtists.push(specificArtist);
      });
    const body = successResponse(params.length ? specifiedArtists : artists);
    return res(ctx.delay(1000), ctx.body(body), ctx.status(200));
  }),
  /** Auth: Admin; artist creation mock response */
  rest.post("/artists", async (req, res, ctx) => {
    const body = successResponse({});
    return res(ctx.delay(1000), ctx.body(body), ctx.status(200));
  }),
  /** Auth: Admin; individual artist edit mock response */
  rest.post("/artists/:artistId", async (req, res, ctx) => {
    const body = successResponse({});
    return res(ctx.delay(1000), ctx.body(body), ctx.status(200));
  }),
  /** Auth: Admin; individual artist mock response */
  rest.get("/artists/:artistId", async (req, res, ctx) => {
    const artist = artists.find((artist) => artist.id === req.params.artistId);
    const body = artist
      ? successResponse(artist)
      : errorResponse("Nincs ilyen előadó!");
    return res(ctx.delay(1000), ctx.body(body), ctx.status(200));
  }),
  /** Auth: User; albums mock response */
  rest.get("/albums", async (req, res, ctx) => {
    const params = req.url.searchParams.getAll("albumIds[]");
    const specifiedAlbums: Album[] = [];
    Array.isArray(params) &&
      params.forEach((album) => {
        const specificAlbum = albums.find((v) => album === v.id);
        specificAlbum && specifiedAlbums.push(specificAlbum);
      });
    const body = successResponse(params.length ? specifiedAlbums : albums);
    return res(ctx.delay(1000), ctx.body(body), ctx.status(200));
  }),
  /** Auth User; list of liked albums. */
  rest.get("/albums/like", async (req, res, ctx) => {
    console.log(albums);
    const likedAlbums = albums.filter((album) => album.favorite);
    const albumsWithAuthor = likedAlbums.map(({ author, ...rest }) => {
      return {
        author: author.map(
          (authorId) => artists.find((artist) => artist.id === authorId) || {}
        ),
        ...rest,
      };
    });
    const body = successResponse(albumsWithAuthor);
    return res(ctx.delay(1000), ctx.body(body), ctx.status(200));
  }),
  /** Auth: Admin; individual album mock response */
  rest.get("/albums/:albumId", async (req, res, ctx) => {
    const album = albums.find((album) => album.id === req.params.albumId);
    const body = album
      ? successResponse(album)
      : errorResponse("Nincs ilyen album!");
    return res(ctx.delay(1000), ctx.body(body), ctx.status(200));
  }),
  /** Auth: Admin; album creation mock response */
  rest.post("/albums", async (req, res, ctx) => {
    const body = successResponse({});
    return res(ctx.delay(1000), ctx.body(body), ctx.status(200));
  }),

  /** Auth: Admin; individual album edit mock response */
  rest.post("/albums/:albumId", async (req, res, ctx) => {
    const body = successResponse({});
    return res(ctx.delay(1000), ctx.body(body), ctx.status(200));
  }),
  /** Auth: User; songs mock response */
  rest.get("/songs", async (req, res, ctx) => {
    const params = req.url.searchParams.getAll("songIds[]");
    const specifiedSongs: Song[] = [];
    Array.isArray(params) &&
      params.forEach((song) => {
        const specificSong = songs.find((v) => song === v.id);
        specificSong && specifiedSongs.push(specificSong);
      });
    const body = successResponse(params.length ? specifiedSongs : songs);
    return res(ctx.delay(1000), ctx.body(body), ctx.status(200));
  }),
  /** Auth: Admin; song creation mock response */
  rest.post("/songs", async (req, res, ctx) => {
    const body = successResponse({});
    return res(ctx.delay(1000), ctx.body(body), ctx.status(200));
  }),
  /** Auth: Admin; individual song edit mock response */
  rest.post("/songs/:songId", async (req, res, ctx) => {
    const body = successResponse({});
    return res(ctx.delay(1000), ctx.body(body), ctx.status(200));
  }),
  /** Auth User; list of liked songs. */
  rest.get("/songs/like", async (req, res, ctx) => {
    const likedSongs = songs.filter((song) => song.favorite);
    const albumIds: string[] = [];
    likedSongs.forEach(
      (song) => albumIds.includes(song.album) || albumIds.push(song.album)
    );
    const authorList: Author[] = [];
    likedSongs.forEach((song) =>
      song.author.forEach(
        (authorId) =>
          authorList.findIndex((listItem) => listItem.id === authorId) === -1 &&
          authorList.push(
            artists.find((artist) => artist.id === authorId) as Author
          )
      )
    );
    const body = successResponse({
      songs: likedSongs,
      albums: albumIds.map((albumId) =>
        albums.find((album) => album.id === albumId)
      ),
      artists: authorList,
    });
    console.log({
      songs: likedSongs,
      albums: albumIds.map((albumId) =>
        albums.find((album) => album.id === albumId)
      ),
      artists: authorList,
    })
    return res(ctx.delay(1000), ctx.body(body), ctx.status(200));
  }),
  /** Auth: Admin; individual song mock response */
  rest.get("/songs/:songId", async (req, res, ctx) => {
    const song = songs.find((song) => song.id === req.params.songId);
    const body = song
      ? successResponse(song)
      : errorResponse("Nincs ilyen dal!");
    return res(ctx.delay(1000), ctx.body(body), ctx.status(200));
  }),
  // /** Auth: User; individual Playlist mock response */
  // rest.get("/list/playlist/:playlistId", async (req, res, ctx) => {
  //   const body = successResponse({});
  //   return res(ctx.delay(1000), ctx.body(body), ctx.status(200));
  // }),
  /** Auth User; individual AlbumList mock response */
  rest.get("/list/album/:albumId", async (req, res, ctx) => {
    const album = albums.find((album) => album.id === req.params.albumId);
    const songList = songs.filter((song) => song.album === album?.id);
    const authorList = artists.filter((artist) =>
      album?.author.includes(artist.id)
    );
    songList.forEach((song) =>
      song.author.forEach(
        (authorId) =>
          authorList.findIndex((listItem) => listItem.id === authorId) === -1 &&
          authorList.push(
            artists.find((artist) => artist.id === authorId) as Author
          )
      )
    );
    const albumList = {
      album: { ...album, songs: songList },
      authorList: authorList,
    };
    const body = album
      ? successResponse(albumList)
      : errorResponse("Nincs ilyen album!");
    return res(ctx.delay(1000), ctx.body(body), ctx.status(200));
  }),
  /** Auth User; Individual song liked state change. */
  rest.post("/songs/:songId/like", async (req, res, ctx) => {
    const requestBody = await req.json();
    const body = successResponse({ value: requestBody.value });
    return res(ctx.delay(1000), ctx.body(body), ctx.status(200));
  }),
  /** Auth User; Individual song liked state change. */
  rest.post("/albums/:albumId/like", async (req, res, ctx) => {
    const requestBody = await req.json();
    const body = successResponse({ value: requestBody.value });
    return res(ctx.delay(1000), ctx.body(body), ctx.status(200));
  }),
  /** Auth User; Returns last 10 releases */
  rest.get("/list/releases", async (req, res, ctx) => {
    const lastReleases = albums.slice(-10);
    const mappedReleases = lastReleases.map(({ author, ...rest }) => {
      return {
        author: author.map(
          (authorId) => artists.find((artist) => artist.id === authorId) || {}
        ),
        ...rest,
      };
    });
    const body = successResponse(mappedReleases);
    return res(ctx.delay(1000), ctx.body(body), ctx.status(200));
  }),
];
