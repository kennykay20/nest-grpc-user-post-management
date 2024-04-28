import { Inject, Injectable } from '@nestjs/common';
import { TYPES } from '../utils/types';
import { ClientGrpc } from '@nestjs/microservices';
import { Metadata } from '@grpc/grpc-js';

@Injectable()
export class UserService {
  private readonly userService: any;
  constructor(
    @Inject(TYPES.USER_SVC_CLIENT) private readonly userClient: ClientGrpc,
  ) {
    this.userService = this.userClient.getService('UserService');
  }

  async login(data: Record<string, any>, metadata: Metadata): Promise<any> {
    const response = await this.userService
      .loginUser(data, metadata)
      .toPromise();
    return response;
  }
}
