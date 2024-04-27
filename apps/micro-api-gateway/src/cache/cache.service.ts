import { Injectable, Inject } from '@nestjs/common';
import { createHash } from 'crypto';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  async save(key: string, data: string, ttl?: number) {
    return this.cacheManager.set(key, data, ttl);
  }

  async get(key: string) {
    return this.cacheManager.get<string>(key);
  }

  async clear() {
    return this.cacheManager.reset();
  }

  async remove(key: string) {
    return this.cacheManager.del(key);
  }

  private getHash(value: string | object): string {
    if (typeof value === 'object') {
      value = JSON.stringify(value);
    }
    value = value.toString();
    return createHash('md5').update(value).digest('hex');
  }
}
