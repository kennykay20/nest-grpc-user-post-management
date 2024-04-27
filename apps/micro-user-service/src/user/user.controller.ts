import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { GrpcMethod } from '@nestjs/microservices';
import {
  CreateUserDto,
  FindOneUserDto,
  LoginPayload,
  LoginUserOtpPayload,
  VerifyOTPpayload,
} from '@app/common';
import { Metadata } from '@grpc/grpc-js';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @GrpcMethod('UserService', 'CreateUser')
  create(data: CreateUserDto, metadata: Metadata): Promise<any> {
    return this.userService.createUser(data, metadata);
  }

  @GrpcMethod('UserService', 'GetUserById')
  getUserById(data: FindOneUserDto): Promise<any> {
    return this.userService.getUserById(data.id);
  }

  @GrpcMethod('UserService', 'LoginUserOtp')
  loginUserOtp(data: LoginUserOtpPayload): Promise<any> {
    return this.userService.loginNoPassword(data);
  }

  @GrpcMethod('UserService', 'VerifyOTP')
  verifyNoPassOtp(data: VerifyOTPpayload): Promise<any> {
    return this.userService.verifyOTP(data);
  }

  @GrpcMethod('UserService', 'LoginUser')
  login(data: LoginPayload): Promise<any> {
    return this.userService.loginUser(data);
  }
}
