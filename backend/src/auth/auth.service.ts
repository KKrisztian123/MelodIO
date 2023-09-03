import { Injectable, Inject } from '@nestjs/common';
import { MYSQL_CONNECTION } from 'src/constants';
import { verify } from 'argon2';
import { generateToken, stripAuthorizationToken } from 'src/utils/utils';

@Injectable()
export class AuthService {
  constructor(@Inject(MYSQL_CONNECTION) private conn: any) {}

  async validateUser({
    email,
    password,
  }: UserCredentials): Promise<Omit<Login, 'session'> | string> {
    const [res] = await this.conn.execute(
      'SELECT * FROM `user` WHERE email = ? LIMIT 1',
      [email.trim()],
    );
    if (!res.length) return 'Nincs ilyen felhasználó!';
    const { isAdmin, password: dbPassword, id: userId } = res[0] as DBUser;

    if (!(await verify(dbPassword, password)))
      return 'Hibás bejelentkezési adatok!';

    return { userId, authLevel: isAdmin ? 'admin' : 'user' };
  }

  async generateAuthToken(userId: number): Promise<string> {
    const token = generateToken();
    await this.conn.execute(
      'INSERT INTO `userSession` (sessionToken,userId,deviceType,deviceName) VALUES (?,?,?,?)',
      [token, userId, '', ''],
    );
    return token;
  }
  async removeAuthToken(authorizationHeader: string): Promise<boolean> {
    const token = stripAuthorizationToken(authorizationHeader);
    if (!token) return false;
    const [res] = await this.conn.execute(
      'DELETE FROM `userSession` WHERE sessionToken = ?',
      [token],
    );
    return res.affectedRows > 0;
  }
}
