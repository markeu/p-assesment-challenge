import { configService } from '../../../config/application.config';

export const REDIS_CACHE_TTL =
    Number(configService.getValue('REDIS_CACHE_TTL', false)) || 60 * 60 * 24; // 1 day

export const REDIS_CONFIG = {
    host: configService.getValue('REDIS_HOST'),
    port: Number(configService.getValue('REDIS_PORT')),
    // password: configService.getValue('REDIS_PASSWORD'),
};

export const REDIS_CACHE_OPTIONS = {
    ...REDIS_CONFIG,
    ttl: REDIS_CACHE_TTL,
    //max: 100,
    isGlobal: true,
};

export const REDIS_URL = `redis://@${REDIS_CONFIG.host}:${REDIS_CONFIG.port}`;

export type ClientOpts = typeof REDIS_CONFIG;
