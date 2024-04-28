import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtModule } from '@nestjs/jwt';
import { config } from '../config';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: config.SECRET_KEY,
      signOptions: { expiresIn: '365d' },
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
