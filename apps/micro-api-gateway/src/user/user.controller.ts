import { Controller, Inject, Post, Req, Res } from '@nestjs/common';
import { ProxyService } from '../proxy';
import { TYPES } from '../utils/types';
import { Request, Response } from 'express';
import { UserService } from './user.service';
import { prepGRPCPayload } from '../utils/helpers';
import { CacheService } from '../cache/cache.service';
import { handleError } from '../utils/responses';

@Controller('/api/v1/user')
export class UserController {
  constructor(
    @Inject(ProxyService) private readonly proxyService: ProxyService,
    @Inject(UserService) private readonly userService: UserService,
    @Inject(CacheService) private readonly cacheService: CacheService,
  ) {}
  @Post('/')
  async create(@Req() req: Request, @Res() res: Response) {
    return this.proxyService.send(
      req,
      res,
      TYPES.USER_SVC_CLIENT,
      'createUser',
      req.body,
    );
  }

  @Post('/login')
  async login(@Req() req: Request, @Res() res: Response): Promise<any> {
    try {
      const { data: reqData, grpcMetadata } = prepGRPCPayload(req, req.body);
      const response = await this.userService.login(reqData, grpcMetadata);

      await this.cacheService.remove(`app::block::${response.user.id}`);
      return res
        .status(200)
        .cookie('accessToken', response.token, {
          signed: true,
        })
        .json(response);
    } catch (err) {
      handleError(res, err.message);
    }
  }
}
