import { Inject, Injectable, Logger } from '@nestjs/common';
import { config } from '../config';
// import { CacheService } from '../cache/cache.service';
import * as jwt from 'jsonwebtoken';
import { TYPES } from '../utils/types';
import { ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class AuthorizationService {
  private readonly userSvc: any;

  constructor(
    // @Inject(CacheService) private readonly cacheService: CacheService,
    @Inject(TYPES.USER_SVC_CLIENT) private userClient: ClientGrpc,
  ) {
    this.userSvc = this.userClient.getService('UserService');
  }

  async getSecretKey(): Promise<string> {
    const { secret } = config.SECRET_KEY;
    // await this.cacheService.save('app::secret', secret);
    return secret;
  }

  async generateToken(userId) {
    try {
      const secret = await this.getSecretKey();

      return jwt.sign({ userId }, secret, {
        algorithm: 'HS512',
        expiresIn: '365d',
      });
    } catch (error) {
      Logger.log(error);
    }
  }

  async getUserbyId(userid: string): Promise<any> {
    const user = await this.userSvc.GetUserById(userid).toPromise();
    return user;
  }

  async logout(userId: string) {
    // await this.cacheService.remove(`app::user::${userId}`);
  }
}
