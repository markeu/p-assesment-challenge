import { configService } from '../config/application.config';

export const THROTTLER_CONFIG = {
    ttl: Number(configService.getValue('THROTTLER_TTL', false)) || 60 * 60,
    limit: Number(configService.getValue('THROTTLER_LIMIT', false)) || 60,
};
