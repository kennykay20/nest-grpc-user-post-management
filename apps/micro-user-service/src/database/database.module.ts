import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { connectionSource } from './typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => connectionSource as any,
    }),
  ],
})
export class DatabaseModule {}
