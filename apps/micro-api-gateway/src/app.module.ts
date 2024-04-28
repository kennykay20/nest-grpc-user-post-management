import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { microservices } from './microservices.import';
import { CacheConfigModule } from './cache/cache.module';
import { UserController } from './user/user.controller';
import { ProxyService } from './proxy';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { UserService } from './user/user.service';

@Module({
  imports: [...microservices, CacheConfigModule],
  controllers: [AppController, UserController],
  providers: [AppService, ProxyService, UserService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: 'api/v1/user/login', method: RequestMethod.POST },
        { path: 'api/v1/user/createUser', method: RequestMethod.POST },
      )
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
