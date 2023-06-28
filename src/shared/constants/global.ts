import { configService } from '../../config/application.config';

export const PORT: string = configService.getValue('PORT');

export const APP_AUTH_SECRET: string =
    configService.getValue('APP_AUTH_SECRET');
export const APP_AUTH_EXPIRES_IN: string = configService.getValue(
    'APP_AUTH_EXPIRES_IN',
    false,
);
