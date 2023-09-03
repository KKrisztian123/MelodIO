import { Inject, Injectable } from '@nestjs/common';
import { ArtistService } from 'src/artist/artist.service';
import { MYSQL_CONNECTION } from 'src/constants';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ListService {
  constructor(
    @Inject(MYSQL_CONNECTION) private conn: any,
    private artistService: ArtistService,
    private userService: UserService,
  ) {}
  async latestReleases(protocol, host) {
    const [albums] = await this.conn.execute(
      'SELECT * FROM album ORDER BY releaseDate DESC LIMIT 10',
    );
    const [collaborators] = await this.conn.execute(
      'SELECT artist.token AS `artistToken`, albumCollaborator.albumId AS `albumId` FROM `albumCollaborator` INNER JOIN artist ON artist.id = albumCollaborator.artistId',
    );

    const artists = await this.artistService.getAllArtists(protocol, host);

    return albums.map((album) => {
      return {
        id: album.token,
        name: album.name,
        releaseDate: album.releaseDate,
        type: album.albumType,
        author: collaborators
          .filter((collaborator) => collaborator.albumId === album.id)
          .map((collaborator) =>
            artists.find((artist) => artist.id === collaborator.artistToken),
          ),
        image: `${protocol}://${host}/uploads/images/album/${album.imageURL}.${album.imageType}`,
      };
    });
  }

  async albumWithSongList(authHeader, protocol, host, albumId) {
    const currentUser = await this.userService.getCurrentUser(authHeader);

    const [res] = await this.conn.execute(
      'SELECT * FROM album WHERE token = ?',
      [albumId],
    );

    if (res.length === 0) return 'Nincs ilyen album!';

    const [collaborators] = await this.conn.execute(
      'SELECT artist.token AS `artistToken`, albumCollaborator.albumId AS `albumId` FROM `albumCollaborator` INNER JOIN artist ON artist.id = albumCollaborator.artistId',
    );

    const artists = await this.artistService.getAllArtists(protocol, host);

    const [songs] = await this.conn.execute(
      'SELECT * FROM song WHERE albumId = ?',
      [res[0].id],
    );

    const album = res[0];
    const [likedAlbum] = await this.conn.execute(
      'SELECT * FROM likedAlbum WHERE albumId = ? AND userId = ?',
      [album.id, currentUser.userId],
    );

    const albumData = {
      id: album.token,
      name: album.name,
      releaseDate: album.releaseDate,
      type: album.albumType,
      author: collaborators
        .filter((collaborator) => collaborator.albumId === album.id)
        .map((collaborator) => collaborator.artistToken),
      image: `${protocol}://${host}/uploads/images/album/${album.imageURL}.${album.imageType}`,
      favorite: likedAlbum.length !== 0 ? true : false,
    };

    const [songCollaborator] = await this.conn.execute(
      'SELECT song.id, artist.token FROM songCollaborator INNER JOIN song ON song.id = songCollaborator.songId INNER JOIN artist ON artist.id = songCollaborator.artistId WHERE song.albumId = ?',
      [album.id],
    );

    const [likedSongs] = await this.conn.execute(
      'SELECT song.id FROM song INNER JOIN likedSong ON likedSong.songId = song.id WHERE song.albumId = ? AND likedSong.userId = ?',
      [album.id, currentUser.userId],
    );
    const artistList = [
      ...collaborators
        .filter((collaborator) => collaborator.albumId === album.id)
        .map((collaborator) => collaborator.artistToken),
    ];

    return {
      album: {
        ...albumData,
        songs: songs.map((song) => {
          return {
            id: song.token,
            name: song.songName,
            author: songCollaborator
              .filter((collaborator) => collaborator.id === song.id)
              .map((collaborator) => {
                artistList.includes(collaborator.token) ||
                  artistList.push(collaborator.token);
                return collaborator.token;
              }),
            album: album.token,
            type: 'Dal',
            fileType: song.songType,
            favorite:
              likedSongs.findIndex((liked) => liked.id === song.id) !== -1
                ? true
                : false,
          };
        }),
      },
      authorList: artists.filter((artist) => artistList.includes(artist.id)),
    };
  }
}
