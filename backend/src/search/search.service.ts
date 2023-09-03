import { Inject } from '@nestjs/common';
import { ArtistService } from 'src/artist/artist.service';
import { MYSQL_CONNECTION } from 'src/constants';
import { UserService } from 'src/user/user.service';

export class SearchService {
  constructor(
    @Inject(MYSQL_CONNECTION) private conn: any,
    private artistService: ArtistService,
    private userService: UserService,
  ) {}
  async getSearchResult(authHeader: string, search: string, protocol, host) {
    const [songResp] = await this.conn.execute(
      'SELECT song.id, song.token AS `songToken`, album.token, song.songName, song.songType FROM `song` INNER JOIN `album` ON album.id = song.albumId WHERE songName LIKE ?',
      [`%${search}%`],
    );

    const [albumResp] = await this.conn.execute(
      'SELECT * FROM album WHERE name LIKE ?',
      [`%${search}%`],
    );
    const [albumCollaborators] = await this.conn.execute(
      'SELECT artist.token AS `artistToken`, albumCollaborator.albumId AS `albumId` FROM `albumCollaborator` INNER JOIN artist ON artist.id = albumCollaborator.artistId',
    );

    const currentUser = await this.userService.getCurrentUser(authHeader);

    const artists = await this.artistService.getAllArtists(protocol, host);
    const [everyAlbum] = await this.conn.execute('SELECT * FROM `album`');

    const [likedSongs] = await this.conn.execute(
      'SELECT song.id FROM song INNER JOIN likedSong ON likedSong.songId = song.id WHERE likedSong.userId = ?',
      [currentUser.userId],
    );

    const [likedAlbums] = await this.conn.execute(
      'SELECT album.id as `albumId` FROM `likedAlbum` INNER JOIN `album` on album.id = likedAlbum.albumId WHERE userId = ?',
      [currentUser.userId],
    );

    const albums = albumResp.map((album) => {
      return {
        id: album.token,
        name: album.name,
        releaseDate: album.releaseDate,
        type: album.albumType,
        favorite:
          likedAlbums.findIndex((liked) => liked.albumId === album.id) !== -1
            ? true
            : false,
        author: albumCollaborators
          .filter((collaborator) => collaborator.albumId === album.id)
          .map((collaborator) => collaborator.artistToken),
        image: `${protocol}://${host}/uploads/images/album/${album.imageURL}.${album.imageType}`,
      };
    });

    const [songCollaborators] = await this.conn.execute(
      'SELECT artist.token AS `artistToken`, songCollaborator.songId AS `songId` FROM `songCollaborator` INNER JOIN artist ON artist.id = songCollaborator.artistId',
    );

    const songs = songResp.map((song) => {
      return {
        id: song.songToken,
        name: song.songName,
        type: song.songType,
        album: song.token,
        favorite:
          likedSongs.findIndex((liked) => liked.id === song.id) !== -1
            ? true
            : false,
        author: songCollaborators
          .filter((collaborator) => collaborator.songId === song.id)
          .map((collaborator) => collaborator.artistToken),
      };
    });

    const albumIds: string[] = [];
    songs.forEach(
      (song) => albumIds.includes(song.album) || albumIds.push(song.album),
    );

    const authorIds: string[] = [];
    songs.forEach((song) =>
      song.author.forEach(
        (authorId) => authorIds.includes(authorId) || authorIds.push(authorId),
      ),
    );
    albums.forEach((album) =>
      album.author.forEach(
        (authorId) => authorIds.includes(authorId) || authorIds.push(authorId),
      ),
    );

    const authorList = authorIds.map((artistId) =>
      artists.find((artist) => artist.id === artistId),
    );
    const mappedAlbums = everyAlbum.map((album) => {
      return {
        id: album.token,
        name: album.name,
        releaseDate: album.releaseDate,
        type: album.albumType,
        author: albumCollaborators
          .filter((collaborator) => collaborator.albumId === album.id)
          .map((collaborator) => collaborator.artistToken),
        image: `${protocol}://${host}/uploads/images/album/${album.imageURL}.${album.imageType}`,
      };
    });
    const albumList = albumIds.map((albumId) =>
      mappedAlbums.find((album) => album.id === albumId),
    );

    return {
      results: {
        artists: [],
        albums: albums,
        songs: songs,
      },
      artists: authorList,
      albums: albumList,
    };
  }
}
