import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import * as fileUpload from 'express-fileupload';
import { config } from './config';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
import { PermissionGuard } from './guard/permission.guard';
import { authTokenMiddleware } from './middlewares/auth.token.middleware';
import { CacheService } from './cache/cache.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const cacheService = app.get(CacheService);
  const secret = config.SECRET_KEY;
  app.use(cookieParser(secret));
  app.use(authTokenMiddleware);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalGuards(new PermissionGuard(cacheService));
  app.use(bodyParser.json());
  app.use(
    fileUpload({
      limits: { fileSize: 100 * 1024 * 1024 }, // 50 MB
      useTempFiles: true,
      tempFileDir: '/tmp/',
      abortOnLimit: true,
    }),
  );
  app.use(
    helmet({
      contentSecurityPolicy: false,
    }),
  );
  await app.listen(config.port, () =>
    console.log(`api-gateway running on ${config.port}`),
  );
}
bootstrap();
