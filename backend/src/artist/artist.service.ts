import { Inject, Injectable } from '@nestjs/common';
import { MYSQL_CONNECTION } from 'src/constants';
import {
  checkEmpty,
  createFilePath,
  deleteFile,
  generateToken,
  imageTypes,
  uploadFile,
} from 'src/utils/utils';

@Injectable()
export class ArtistService {
  constructor(@Inject(MYSQL_CONNECTION) private conn: any) {}
  async createArtist(artistData): Promise<string | true> {
    if (!checkEmpty(artistData)) return 'Üres mezők!';
    const token = generateToken();
    await this.conn.execute(
      'INSERT INTO `artist` (name, imageURL, imageType, token) VALUES (?,?,?,?)',
      [artistData.name, artistData.imageUrl, artistData.fileType, token],
    );

    return true;
  }

  async getAllArtists(protocol, host) {
    const [res] = await this.conn.execute('SELECT * FROM `artist`');

    return res.map((artist) => {
      return {
        id: artist.token,
        name: artist.name,
        image: `${protocol}://${host}/uploads/images/artist/${artist.imageURL}.${artist.imageType}`,
      };
    });
  }

  async getListOfArtists(artistIds: string[], protocol, host) {
    const artist = await this.getAllArtists(protocol, host);
    return artist.filter((artist) => artistIds.includes(artist.id));
  }

  async updateArtist(id, artistData) {
    await this.conn.execute(
      'UPDATE `artist` SET name = ?, imageURL = ?, imageType = ? WHERE id = ?',
      [artistData.name, artistData.imageURL, artistData.imageType, id],
    );

    return true;
  }

  async getArtist(artistId: string) {
    const [res] = await this.conn.execute(
      'SELECT * FROM `artist` WHERE token=?',
      [artistId],
    );

    if (res.length === 0) return 'Nincs ilyen előadó!';
    return res[0];
  }

  uploadArtistImage(file) {
    const fileType = imageTypes[file.mimetype];
    const token = generateToken();
    uploadFile(
      createFilePath('uploads', 'images', 'artist'),
      `${token}.${fileType}`,
      file.buffer,
    );

    return { imageUrl: token, fileType };
  }
  deleteArtistImage(token, fileType) {
    deleteFile(
      createFilePath('uploads', 'images', 'artist', `${token}.${fileType}`),
    );
  }
}
