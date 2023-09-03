import { Inject, Injectable } from '@nestjs/common';
import { ArtistService } from 'src/artist/artist.service';
import { MYSQL_CONNECTION } from 'src/constants';
import { UserService } from 'src/user/user.service';
import {
  checkEmpty,
  createFilePath,
  deleteFile,
  generateToken,
  songTypes,
  uploadFile,
} from 'src/utils/utils';

@Injectable()
export class SongService {
  constructor(
    @Inject(MYSQL_CONNECTION) private conn: any,
    private userService: UserService,
    private artistService: ArtistService,
  ) {}
  async createSong(songData): Promise<string | true> {
    if (!checkEmpty(songData)) return 'Üres mezők!';
    const token = generateToken();
    const artistIds = JSON.parse(songData.artistIds);
    const albumId = JSON.parse(songData.albumId);
    if (!Array.isArray(artistIds) || artistIds.length === 0)
      return 'Válassz előadót!';
    if (!Array.isArray(albumId) || artistIds.length === 0)
      return 'Válassz albumot!';

    const [albumInfo] = await this.conn.execute(
      'SELECT * FROM `album` WHERE token = ?',
      [albumId[0]],
    );
    if (albumInfo.length === 0) return 'Nincs ilyen album!';
    const [res] = await this.conn.execute(
      'INSERT INTO `song` (songName, songURL, songType, fileName, albumId, token) VALUES (?,?,?,?,?,?)',
      [
        songData.songName,
        songData.songUrl,
        songData.fileType,
        songData.fileName,
        albumInfo[0].id,
        token,
      ],
    );

    artistIds.forEach(async (artist) => {
      const [artistInfo] = await this.conn.execute(
        'SELECT * FROM `artist` WHERE token = ?',
        [artist],
      );
      if (artistInfo.length === 0) return;
      await this.conn.execute(
        'INSERT INTO `songCollaborator` (artistId, songId) VALUES (?,?)',
        [artistInfo[0].id, res.insertId],
      );
    });

    return true;
  }

  async getLikedSongs(authHeader, protocol, host) {
    const currentUser = await this.userService.getCurrentUser(authHeader);
    if (typeof currentUser === 'string') return currentUser;
    const artists = await this.artistService.getAllArtists(protocol, host);

    const [likedSongs] = await this.conn.execute(
      'SELECT * FROM `likedSong` INNER JOIN `song` on song.id = likedSong.songId WHERE userId = ?',
      [currentUser.userId],
    );

    const [albums] = await this.conn.execute(
      'SELECT album.name, album.token, album.imageURL, album.imageType, album.albumType, album.releaseDate FROM `likedSong` INNER JOIN `song` ON song.id = likedSong.songId INNER JOIN `album` ON album.id = song.albumId WHERE userId = ?',
      [currentUser.userId],
    );

    const [collaborators] = await this.conn.execute(
      'SELECT artist.token AS `artistToken`, songCollaborator.songId AS `songId` FROM `songCollaborator` INNER JOIN artist ON artist.id = songCollaborator.artistId',
    );

    return {
      songs: likedSongs.map((song) => {
        return {
          name: song.songName,
          type: 'Dal',
          fileType: song.fileType,
          fileUrl: song.songURL,
          favourite: true,
          id: song.token,
          author: collaborators
            .filter((collaborator) => collaborator.songId === song.id)
            .map((collaborator) => collaborator.artistToken),
          album: albums.find((album) => album.id === song.albumId).token,
        };
      }),
      albums: albums,
      artists: artists,
    };
  }

  async likeSong(authHeader, songId, value: boolean) {
    const currentUser = await this.userService.getCurrentUser(authHeader);
    if (typeof currentUser === 'string') return currentUser;
    const [songInfo] = await this.conn.execute(
      'SELECT * FROM `song` WHERE token = ?',
      [songId],
    );
    if (songInfo.length === 0) return 'Nincs ilyen dal!';
    if (value) {
      await this.conn.execute(
        'INSERT INTO `likedSong` (songId, userId) VALUES (?,?)',
        [songInfo[0].id, currentUser.id],
      );
      return value;
    }
    await this.conn.execute(
      'DELETE FROM `likedSong` WHERE songId = ? AND userId = ?',
      [songInfo[0].id, currentUser.id],
    );
    return value;
  }

  async getAllSongs() {
    const [res] = await this.conn.execute(
      'SELECT song.id, song.token AS `songToken`, album.token, song.songName, song.songType FROM `song` INNER JOIN `album` ON album.id = song.albumId',
    );
    const [collaborators] = await this.conn.execute(
      'SELECT artist.token AS `artistToken`, songCollaborator.songId AS `songId` FROM `songCollaborator` INNER JOIN artist ON artist.id = songCollaborator.artistId',
    );

    return res.map((song) => {
      return {
        id: song.songToken,
        name: song.songName,
        type: song.songType,
        album: song.token,
        author: collaborators
          .filter((collaborator) => collaborator.songId === song.id)
          .map((collaborator) => collaborator.artistToken),
      };
    });
  }

  async getListOfSongs(songIds: string[]) {
    const song = await this.getAllSongs();
    return song.filter((song) => songIds.includes(song.id));
  }

  async updateSong(id, songData) {
    const artistIds = JSON.parse(songData.artistIds);
    const albumId = JSON.parse(songData.albumId);
    if (!Array.isArray(artistIds) || artistIds.length === 0)
      return 'Válassz előadót!';
    if (!Array.isArray(albumId) || artistIds.length === 0)
      return 'Válassz albumot!';

    const [albumInfo] = await this.conn.execute(
      'SELECT * FROM `album` WHERE token = ?',
      [albumId[0]],
    );
    if (albumInfo.length === 0) return 'Nincs ilyen album!';
    await this.conn.execute(
      'UPDATE `song` SET songName = ?, songURL = ?, songType = ?, albumId = ?, fileName = ? WHERE id = ?',
      [
        songData.songName,
        songData.songUrl,
        songData.fileType,
        albumInfo[0].id,
        songData.fileName,
        id,
      ],
    );
    await this.conn.execute('DELETE FROM `songCollaborator` WHERE songId = ?', [
      id,
    ]);

    artistIds.forEach(async (artist) => {
      const [artistInfo] = await this.conn.execute(
        'SELECT * FROM `artist` WHERE token = ?',
        [artist],
      );
      if (artistInfo.length === 0) return;
      await this.conn.execute(
        'INSERT INTO `songCollaborator` (artistId, songId) VALUES (?,?)',
        [artistInfo[0].id, id],
      );
    });

    return true;
  }

  async getSong(songId: string) {
    const [res] = await this.conn.execute(
      'SELECT song.id, song.token AS `songToken`,song.fileName, album.token, song.songName, song.songType, song.songURL FROM `song` INNER JOIN `album` ON album.id = song.albumId WHERE song.token = ?',
      [songId],
    );
    if (res.length === 0) return 'Nincs ilyen dal!';
    const [collaborators] = await this.conn.execute(
      'SELECT artist.token AS `artistToken`, songCollaborator.songId AS `songId` FROM `songCollaborator` INNER JOIN artist ON artist.id = songCollaborator.artistId WHERE songId = ?',
      [res[0].id],
    );

    if (collaborators.length === 0) return 'Nincs ilyen dal!';
    return {
      ...res[0],
      author: collaborators.map((collaborator) => collaborator.artistToken),
      album: res[0].token,
    };
  }

  uploadSong(file) {
    const fileType = songTypes[file.mimetype];
    const token = generateToken();
    uploadFile(
      createFilePath('uploads', 'songs'),
      `${token}.${fileType}`,
      file.buffer,
    );

    return { songUrl: token, fileType, originalName: file.originalname };
  }
  deleteSong(token, fileType) {
    deleteFile(createFilePath('uploads', 'songs', `${token}.${fileType}`));
  }
}
