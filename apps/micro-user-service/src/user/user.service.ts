import { ForbiddenException, Injectable, Logger } from '@nestjs/common';
import { Metadata } from '@grpc/grpc-js';
import { RpcException } from '@nestjs/microservices';
import { InjectEntityManager } from '@nestjs/typeorm';
import { IFetchUsers } from './interfaces/user.interface';
import { EntityManager, In, Repository } from 'typeorm';
import { User } from './models/user.model';
import { randomUUID } from 'crypto';
import {
  CreateUserDto,
  GetUserByUsernameOrPhoneRequest,
  LoginNoPassResponse,
  LoginPayload,
  LoginUserOtpPayload,
  VerifyOTPpayload,
} from '@app/common';
import { sendOtpToUser } from '../event/send-email';
import { Authentication } from '../utils/auth';
import { JwtService } from '@nestjs/jwt';
import { config } from '../config';

@Injectable()
export class UserService {
  private readonly userRepository: Repository<User>;

  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
    private jwt: JwtService,
  ) {
    this.userRepository = entityManager.getRepository(User);
  }

  async createUser(data: CreateUserDto, metadata: Metadata): Promise<User> {
    const metaUser = metadata.get('user')[0] as string;
    // let meta2User: any = {};

    if (!data.username && !data.phone) {
      throw new RpcException(
        'Please enter either/both phone number or username',
      );
    }

    if (typeof metaUser === 'string') {
      // meta2User = JSON.parse(metaUser);
    }

    const userExist = await this.getUserByPhoneOrUsername({
      username: data.username.toLowerCase(),
      phone: data.phone,
    });

    if (userExist) {
      if (
        !!data.username &&
        userExist.username.toLowerCase() === data.username.toLowerCase()
      ) {
        throw new RpcException('Username already exist');
      } else if (
        userExist.phone === data.phone &&
        !!data.phone // should not throw error if the phoneNumber is empty or null
      ) {
        throw new RpcException('Phone number already exist');
      }
    }

    const user = new User();
    user.id = randomUUID().toString();
    user.username = data.username;
    user.firstname = data.firstName;
    user.lastname = data.lastName;
    user.imageUrl = data.imageUrl;

    if (data.password) {
      const salt = Authentication.generateSalt();
      const password = Authentication.generatePasswordHash(
        data.password.trim(),
        salt,
      );
      user.password = `${salt}.${password}`;
    }

    try {
      await this.userRepository.save(user);

      delete user.password;

      return this.getUserById(user.id);
    } catch (err) {
      throw new RpcException('Error creating user ' + err.message);
    }
  }

  async getUserByPhoneOrUsername(
    data: GetUserByUsernameOrPhoneRequest,
  ): Promise<any> {
    const { phone, username } = data;
    const user = await this.userRepository.findOne({
      where: [
        { phone, isDelete: false },
        { username, isDelete: false },
      ],
    });
    if (!user) {
      return false;
    }
    return user;
  }

  async loginNoPassword(
    data: LoginUserOtpPayload,
  ): Promise<LoginNoPassResponse> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .select('user')
      .where('user.phone = :phone', {
        phone: data.payload.trim(),
      })
      .orWhere('user.username = :username', {
        username: data.payload.trim().toLowerCase(),
      })
      .andWhere('user.isDelete = :isDelete', { isDelete: false })
      .getOne();

    if (!user) {
      throw new RpcException(
        'this username/phone number does not belong to any user',
      );
    }

    const otp = this.generateOtp();
    user.otp = otp;
    this.userRepository.save(user);
    sendOtpToUser(user, otp);
    const response = {
      message:
        'the verification code has been sent to your email and/or phone number',
      userId: user.id,
    };

    return response;
  }

  async verifyOTP(data: VerifyOTPpayload): Promise<any> {
    const user: User = await this.userRepository.findOne({
      select: [
        'id',
        'firstname',
        'lastname',
        'username',
        'active',
        'isNewUser',
        'createdAt',
        'updatedAt',
      ],
      where: { id: data.userId, otp: data.otp },
    });

    if (!user) {
      throw new RpcException('Invalid verification for this user');
    }

    if (!user.active) {
      if (user.isNewUser) {
        throw new RpcException(
          'Email not verified, please check your email for verification link',
        );
      } else {
        throw new RpcException('User has been de-activated');
      }
    }

    const resp: any = Object.assign({}, user);
    resp.company = !resp.company
      ? null
      : {
          id: resp.company.id,
          name: resp.company.name,
          email: resp.company.email,
        };

    return resp;
  }

  async loginUser(data: LoginPayload): Promise<any> {
    const { username, password, phone } = data;
    let condition;

    if (username) {
      condition = { username: username.toLowerCase().trim(), isDelete: false };
    } else {
      condition = { phone, isDelete: false };
    }

    const user: User = await this.userRepository.findOne({
      select: [
        'id',
        'firstname',
        'lastname',
        'username',
        'password',
        'active',
        'imageUrl',
        'phone',
        'isNewUser',
        'createdAt',
        'updatedAt',
      ],
      where: condition,
    });

    if (!user) {
      throw new RpcException('User not found. Please sign up');
    }

    if (!user.active) {
      if (user.isNewUser) {
        throw new RpcException(
          'Username not verified, please check your email for verification link',
        );
      } else {
        throw new RpcException('User has been de-activated');
      }
    }

    let isMatch: boolean;

    if (user.password) {
      const salt = user.password.split('.')[0];
      const hashPassword = user.password.split('.')[1];

      isMatch = Authentication.comparePassword(password, hashPassword, salt);
    }

    if (!isMatch) {
      throw new RpcException('Invalid Password');
    }

    const payload = {
      userId: user.id,
      username: user.username,
    };
    const accessToken = await this.signInToken(payload);
    if (!accessToken) {
      throw new ForbiddenException();
    }

    return { ...user, accessToken };
  }

  generateOtp() {
    return Math.floor(Math.random() * (999999 - 111111) + 111111).toString();
  }

  async getUserById(id: string): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { id, isDelete: false },
      select: [
        'id',
        'firstname',
        'lastname',
        'username',
        'active',
        'createdAt',
        'updatedAt',
      ],
    });

    if (!user) throw new RpcException('User with id does not exist');

    const response = {
      ...user,
    };

    return response;
  }

  async getUsersByIds(data: any): Promise<IFetchUsers> {
    const ids = data.userIds as string[];
    const country = data.country as string;
    const criteria: any = { id: In(ids), isDelete: false };
    if (country) criteria.country = country;
    try {
      const users = await this.userRepository.find({
        where: criteria,
        relations: ['notificationTokens'],
      });

      const userData = users.map((user: any) => {
        const deviceTokens = this.accumulateDeviceTokenPerApp(
          user.notificationTokens,
        );

        user.deviceTokens = Object.values(deviceTokens);

        return user;
      });

      return { users: userData };
    } catch (error) {
      throw new RpcException(`Error fetching users...${error.message}`);
    }
  }

  private accumulateDeviceTokenPerApp(data: any[]): any {
    return data.reduce((acc, tokenDetails) => {
      const { appName, token } = tokenDetails;
      if (acc[appName]) {
        acc[appName].tokens.push(token);
      } else
        acc[appName] = {
          appName,
          tokens: [token],
        };
      return acc;
    }, {});
  }

  signInToken = async (args: { userId: string; username: string }) => {
    try {
      const payload = { id: args.userId, email: args.username };
      const accessToken = await this.jwt.signAsync(payload, {
        secret: config.SECRET_KEY,
      });
      return accessToken;
    } catch (error) {
      Logger.error(error, 'Error signin Token :');
      throw new Error('Token failed to generate');
    }
  };
}
