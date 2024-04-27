import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { microservices } from './microservices.import';

@Module({
  imports: [...microservices],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
