import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';

import { ThrottlerModule } from '@nestjs/throttler';

import * as redisStore from 'cache-manager-redis-store';

import { StatusModule } from '../../modules/status/status.module';
import { RankingModule } from '../../modules/ranking/ranking.module';
import { AppController } from './app.controller';

import { REDIS_CACHE_OPTIONS } from '../../infra/cache/redis/config.redis';
import { THROTTLER_CONFIG } from '../../config/throttler.config';

import type { ClientOpts } from '../../infra/cache/redis/config.redis';

@Module({
    imports: [
        CacheModule.register<ClientOpts>({
            store: redisStore,
            ...REDIS_CACHE_OPTIONS,
        }),
        ThrottlerModule.forRoot({
            ...THROTTLER_CONFIG,
        }),
        RankingModule,
        StatusModule,
    ],
    controllers: [AppController],
})
export class AppModule {}
