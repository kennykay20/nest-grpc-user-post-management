import {
  Controller,
  Delete,
  Inject,
  Post,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import { ProxyService } from '../proxy';
import { UserService } from '../user/user.service';
import { TYPES } from '../utils/types';
import { Request, Response } from 'express';

@Controller('/api/v1/post')
export class PostController {
  constructor(
    @Inject(ProxyService) private readonly proxyService: ProxyService,
    @Inject(UserService) private readonly userService: UserService,
  ) {}

  @Post('/')
  async createPost(@Req() req: Request, @Res() res: Response) {
    return this.proxyService.send(
      req,
      res,
      TYPES.USER_SVC_CLIENT,
      'createPost',
      req.body,
    );
  }

  @Put('/:id')
  async updatePost(@Req() req: Request, @Res() res: Response) {
    const data: any = { ...req.params, ...req.body };
    return this.proxyService.send(
      req,
      res,
      TYPES.USER_SVC_CLIENT,
      'updatePost',
      data,
    );
  }

  @Delete('/:id')
  async deletePost(@Req() req: Request, @Res() res: Response) {
    const data: any = { ...req.params };
    return this.proxyService.send(
      req,
      res,
      TYPES.USER_SVC_CLIENT,
      'removePost',
      data,
    );
  }
}
