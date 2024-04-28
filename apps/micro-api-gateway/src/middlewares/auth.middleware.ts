import {
  Inject,
  Injectable,
  Logger,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { CacheService } from '../cache/cache.service';
import { error } from '../utils/responses';
import { Request, Response } from 'express';
import { AuthorizationService } from './authorization.service';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    @Inject(CacheService) private readonly cacheService: CacheService,
    @Inject(AuthorizationService)
    private readonly authSvc: AuthorizationService,
    private jwt: JwtService,
  ) {}

  async use(req: Request, res: Response, next: () => any) {
    let secret = await this.cacheService.get('app::secret');
    if (!secret) {
      await this.authSvc.getSecretKey();
      secret = await this.cacheService.get('app::secret');
    }

    let token = '';
    const reqClone: any = Object.assign({}, req);
    if (reqClone.signedCookies && reqClone.signedCookies.accessToken) {
      token = reqClone.signedCookies.accessToken;
    } else {
      if (req.originalUrl === '/docs') {
        return res.redirect(302, '/docs/login');
      }

      const headers = req.headers;
      if (headers['authorization'] === undefined) {
        return error(
          res,
          401,
          'no authorization header or cookie',
          'authorization header or cookie is required for this route',
        );
      }

      token = headers['authorization'].split(' ')[1];
      if (token === undefined) {
        return error(
          res,
          401,
          'no authorization token or cookie present',
          'authorization token or cookie is required, token for this route in the format: <Bearer token>',
        );
      }
    }

    try {
      const { userId } = await this.jwt.verifyAsync(token, { secret });
      let user = await this.authSvc.getUserAuthority(userId);
      user = typeof user === 'string' ? JSON.parse(user) : user;
      // attached authenticated user to header

      if (user.active === false) {
        throw new UnauthorizedException();
      }

      req.headers['user'] = JSON.stringify({
        id: user.id,
        username: user.username || '',
      });
    } catch (err) {
      Logger.error(err);
      if (req.originalUrl === '/docs') {
        if (req.headers && req.headers.authorization)
          delete req.headers.authorization;
        return res.redirect(302, '/docs/login');
      }
      return error(res, 401, err.name, err.message);
    }

    return next();
  }
}
