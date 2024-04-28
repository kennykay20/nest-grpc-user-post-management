import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { microservices } from './microservices.import';
import { UserController } from './user/user.controller';
import { ProxyService } from './proxy';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { UserService } from './user/user.service';
import { AuthorizationService } from './middlewares/authorization.service';
import { JwtModule } from '@nestjs/jwt';
import { config } from './config';

@Module({
  imports: [
    ...microservices,
    JwtModule.register({
      global: true,
      secret: config.SECRET_KEY,
      signOptions: { expiresIn: '365d' },
    }),
  ],
  controllers: [AppController, UserController],
  providers: [AppService, ProxyService, UserService, AuthorizationService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: 'api/v1/user/login', method: RequestMethod.POST },
        { path: 'api/v1/user', method: RequestMethod.POST },
      )
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
