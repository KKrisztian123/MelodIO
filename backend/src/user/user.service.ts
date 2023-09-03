import { Inject, Injectable } from '@nestjs/common';
import { hash, verify } from 'argon2';
import { MYSQL_CONNECTION } from 'src/constants';
import {
  checkEmpty,
  createFilePath,
  deleteFile,
  generateToken,
  imageTypes,
  stripAuthorizationToken,
  uploadFile,
} from 'src/utils/utils';

@Injectable()
export class UserService {
  constructor(@Inject(MYSQL_CONNECTION) private conn: any) {}
  async createUser(userData): Promise<string | true> {
    if (!checkEmpty(userData)) return 'Üres mezők!';
    if (userData.password.trim() !== userData.passwordRepeat.trim())
      return 'A jelszavak nem egyeznek!';
    if (userData.password.length < 8)
      return 'A jelszónak legalább 8 karakter hosszúnak kell lennie!';

    const [res] = await this.conn.execute(
      'SELECT * FROM `user` WHERE email = ?',
      [userData.email.trim()],
    );
    if (res.length > 0) return 'Az email-cím már használatban van!';

    const [firstName, ...lastNames] = userData.name.trim().split(' ');
    const password = await hash(userData.password.trim());
    await this.conn.execute(
      'INSERT INTO `user` (email, firstName, lastName, imageURL, imageType, password, lastUpdate) VALUES (?,?,?,?,?,?,?)',
      [
        userData.email.trim(),
        firstName,
        lastNames.join(' '),
        userData.imageUrl,
        userData.fileType,
        password,
        Math.floor(new Date().getTime() / 1000),
      ],
    );
    return true;
  }

  async updateUser(userData, userId): Promise<string | any> {
    if (!checkEmpty(userData)) return 'Üres mezők!';

    const [res] = await this.conn.execute(
      'SELECT * FROM `user` WHERE email = ? AND id <> ?',
      [userData.email.trim(), userId],
    );
    if (res.length > 0) return 'Az email-cím már használatban van!';

    const [firstName, ...lastNames] = userData.name.trim().split(' ');
    const updateDate = Math.floor(new Date().getTime() / 1000);
    await this.conn.execute(
      'UPDATE `user` SET email = ?, firstName = ?, lastName = ?, imageURL = ?, imageType = ?, lastUpdate = ? WHERE id = ?',
      [
        userData.email.trim(),
        firstName,
        lastNames.join(' '),
        userData.imageUrl,
        userData.fileType,
        updateDate,
        userId,
      ],
    );
    return {
      name: userData.name.trim(),
      email: userData.email.trim(),
      lastUpdate: updateDate,
      imageURL: userData.imageUrl,
      imageType: userData.fileType,
    };
  }

  async getCurrentUser(authHeader) {
    const token = stripAuthorizationToken(authHeader);
    const [res] = await this.conn.execute(
      'SELECT userId,isAdmin FROM `userSession` INNER JOIN `user` ON `user`.id = `userSession`.userId WHERE sessionToken = ?',
      [token],
    );
    if (res.length > 0) return res[0];
    return 'Nincs ilyen aktív felhasználó!';
  }

  async getUserById(userId: string) {
    const [res] = await this.conn.execute('SELECT * FROM `user` WHERE id = ?', [
      userId,
    ]);
    if (res.length > 0) return res[0];
    return 'Nincs ilyen felhasználó!';
  }

  uploadUserImage(file) {
    const fileType = imageTypes[file.mimetype];
    const token = generateToken();
    uploadFile(
      createFilePath('uploads', 'images', 'profile'),
      `${token}.${fileType}`,
      file.buffer,
    );

    return { imageUrl: token, fileType };
  }

  async changeUserPassword(
    userId,
    { password, newPassword, newPasswordRepeat },
  ) {
    if (password === newPassword)
      return 'Az új jelszó nem lehet ugyanaz, mint a régi!';
    if (newPasswordRepeat !== newPassword)
      return 'Az új jelszavak nem egyeznek.';
    const [res] = await this.conn.execute(
      'SELECT password FROM `user` WHERE id = ?',
      [userId],
    );
    if (res.length === 0) return 'A felhasználó nem létezik!';
    if (newPassword.length < 8)
      return 'Az új jelszónak legalább 8 karakter hosszúnak kell lennie!';
    if (!(await verify(res[0].password, password)))
      return 'A régi jelszó helytelen!';
    await this.conn.execute('UPDATE `user` SET password = ? WHERE id = ?', [
      await hash(newPassword),
      userId,
    ]);

    return true;
  }

  deleteUserImage(token, fileType) {
    deleteFile(
      createFilePath('uploads', 'images', 'profile', `${token}.${fileType}`),
    );
  }
}
