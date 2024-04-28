import { CacheModule, CacheModuleAsyncOptions } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { config } from '../config';
import { CacheService } from './cache.service';
import { redisStore } from 'cache-manager-redis-store';

@Module({
  imports: [
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async () => ({
        store: redisStore,
        url: config.REDIS_URL,
      }),
    } as CacheModuleAsyncOptions),
  ],
  providers: [CacheService],
  exports: [CacheService],
})
export class CacheConfigModule {}
