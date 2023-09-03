import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { MYSQL_CONNECTION } from 'src/constants';
import { stripAuthorizationToken } from 'src/utils/utils';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(@Inject(MYSQL_CONNECTION) private conn: any) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    return await this.validateRequest(request);
  }

  async validateRequest(request: Request): Promise<boolean> {
    const authorizationHeader = request.headers['authorization'];
    const token = stripAuthorizationToken(authorizationHeader);
    if (!token) return false;
    const [res] = await this.conn.execute(
      'SELECT * FROM `userSession` WHERE sessionToken = ?',
      [token],
    );

    return res.length > 0;
  }
}

@Injectable()
export class AdminAuthGuard implements CanActivate {
  constructor(@Inject(MYSQL_CONNECTION) private conn: any) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    return await this.validateRequest(request);
  }

  async validateRequest(request: Request): Promise<boolean> {
    const authorizationHeader = request.headers['authorization'];
    const token = stripAuthorizationToken(authorizationHeader);
    if (!token) return false;
    const [res] = await this.conn.execute(
      'SELECT userId,isAdmin FROM `userSession` INNER JOIN `user` ON `user`.id = `userSession`.userId WHERE sessionToken = ?',
      [token],
    );
    if (res.length === 0) return false;

    return res[0].isAdmin;
  }
}
