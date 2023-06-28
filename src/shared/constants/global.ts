import { configService } from '../../config/application.config';

export const PORT: string = configService.getValue('PORT');
