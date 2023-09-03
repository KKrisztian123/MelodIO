import { Inject, Injectable } from '@nestjs/common';
import { ArtistService } from 'src/artist/artist.service';
import { MYSQL_CONNECTION } from 'src/constants';
import { UserService } from 'src/user/user.service';
import {
  checkEmpty,
  createFilePath,
  deleteFile,
  generateToken,
  imageTypes,
  uploadFile,
} from 'src/utils/utils';

@Injectable()
export class AlbumService {
  constructor(
    @Inject(MYSQL_CONNECTION) private conn: any,
    private userService: UserService,
    private artistService: ArtistService,
  ) {}
  async createAlbum(albumData): Promise<string | true> {
    if (!checkEmpty(albumData)) return 'Üres mezők!';
    const token = generateToken();
    const artistIds = JSON.parse(albumData.artistIds);
    if (!Array.isArray(artistIds)) return 'Válassz előadót!';

    const [res] = await this.conn.execute(
      'INSERT INTO `album` (name, imageURL, imageType, releaseDate, albumType, token) VALUES (?,?,?,?,?,?)',
      [
        albumData.name,
        albumData.imageUrl,
        albumData.fileType,
        albumData.releaseDate,
        albumData.albumType,
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
        'INSERT INTO `albumCollaborator` (artistId, albumId) VALUES (?,?)',
        [artistInfo[0].id, res.insertId],
      );
    });

    return true;
  }

  async getLikedAlbums(authHeader, protocol, host) {
    const currentUser = await this.userService.getCurrentUser(authHeader);
    if (typeof currentUser === 'string') return currentUser;
    const artists = await this.artistService.getAllArtists(protocol, host);
    const [likedAlbums] = await this.conn.execute(
      'SELECT * FROM `likedAlbum` INNER JOIN `album` on album.id = likedAlbum.albumId WHERE userId = ?',
      [currentUser.userId],
    );

    const [collaborators] = await this.conn.execute(
      'SELECT artist.token AS `artistToken`, albumCollaborator.albumId AS `albumId` FROM `albumCollaborator` INNER JOIN artist ON artist.id = albumCollaborator.artistId',
    );

    return likedAlbums.map((album) => {
      return {
        id: album.token,
        name: album.name,
        releaseDate: album.releaseDate,
        type: album.albumType,
        image: `${protocol}://${host}/uploads/images/album/${album.imageURL}.${album.imageType}`,
        author: collaborators
          .filter((collaborator) => collaborator.albumId === album.id)
          .map((collaborator) =>
            artists.find((artist) => artist.id === collaborator.artistToken),
          ),
      };
    });
  }

  async likeAlbum(authHeader, albumId, value: boolean) {
    const currentUser = await this.userService.getCurrentUser(authHeader);
    if (typeof currentUser === 'string') return currentUser;
    const [albumInfo] = await this.conn.execute(
      'SELECT * FROM `album` WHERE token = ?',
      [albumId],
    );
    if (albumInfo.length === 0) return 'Nincs ilyen album!';
    if (value) {
      await this.conn.execute(
        'INSERT INTO `likedAlbum` (albumId, userId) VALUES (?,?)',
        [albumInfo[0].id, currentUser.userId],
      );
      return value;
    }
    await this.conn.execute(
      'DELETE FROM `likedAlbum` WHERE albumId = ? AND userId = ?',
      [albumInfo[0].id, currentUser.userId],
    );
    return value;
  }

  async getAllAlbums(protocol, host) {
    const [res] = await this.conn.execute('SELECT * FROM `album`');
    const [collaborators] = await this.conn.execute(
      'SELECT artist.token AS `artistToken`, albumCollaborator.albumId AS `albumId` FROM `albumCollaborator` INNER JOIN artist ON artist.id = albumCollaborator.artistId',
    );

    return res.map((album) => {
      return {
        id: album.token,
        name: album.name,
        releaseDate: album.releaseDate,
        type: album.albumType,
        author: collaborators
          .filter((collaborator) => collaborator.albumId === album.id)
          .map((collaborator) => collaborator.artistToken),
        image: `${protocol}://${host}/uploads/images/album/${album.imageURL}.${album.imageType}`,
      };
    });
  }

  async getListOfAlbums(albumIds: string[], protocol, host) {
    const album = await this.getAllAlbums(protocol, host);
    return album.filter((album) => albumIds.includes(album.id));
  }

  async updateAlbum(id, albumData) {
    const artistIds = JSON.parse(albumData.artistIds);
    if (!Array.isArray(artistIds)) return 'Válassz Albumot!';

    await this.conn.execute(
      'UPDATE `album` SET name = ?, imageURL = ?, imageType = ?, releaseDate = ?, albumType = ? WHERE id = ?',
      [
        albumData.name,
        albumData.imageURL,
        albumData.imageType,
        albumData.releaseDate,
        albumData.albumType,
        id,
      ],
    );
    await this.conn.execute(
      'DELETE FROM `albumCollaborator` WHERE albumId = ?',
      [id],
    );

    artistIds.forEach(async (artist) => {
      const [artistInfo] = await this.conn.execute(
        'SELECT * FROM `artist` WHERE token = ?',
        [artist],
      );
      if (artistInfo.length === 0) return;
      await this.conn.execute(
        'INSERT INTO `albumCollaborator` (artistId, albumId) VALUES (?,?)',
        [artistInfo[0].id, id],
      );
    });

    return true;
  }

  async getAlbum(albumId: string) {
    const [res] = await this.conn.execute(
      'SELECT * FROM `album` WHERE token=?',
      [albumId],
    );
    if (res.length === 0) return 'Nincs ilyen album!';
    const [collaborators] = await this.conn.execute(
      'SELECT artist.token AS `artistToken`, albumCollaborator.albumId AS `albumId` FROM `albumCollaborator` INNER JOIN artist ON artist.id = albumCollaborator.artistId WHERE albumId = ?',
      [res[0].id],
    );

    if (collaborators.length === 0) return 'Nincs ilyen album!';
    return {
      ...res[0],
      author: collaborators.map((collaborator) => collaborator.artistToken),
    };
  }

  uploadAlbumImage(file) {
    const fileType = imageTypes[file.mimetype];
    const token = generateToken();
    uploadFile(
      createFilePath('uploads', 'images', 'album'),
      `${token}.${fileType}`,
      file.buffer,
    );

    return { imageUrl: token, fileType };
  }
  deleteAlbumImage(token, fileType) {
    deleteFile(
      createFilePath('uploads', 'images', 'album', `${token}.${fileType}`),
    );
  }
}
