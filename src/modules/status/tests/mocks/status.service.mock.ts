import { configService } from 'nest-shared';
import type { AppServiceInterface } from 'nest-shared';

export class StatusServiceMock {
    public show(): Promise<AppServiceInterface> {
        return Promise.resolve({
            name: 'parloa-backend-challenge',
            version: '0.0.1.',
            status: 'online',
            date: new Date(),
            environment: configService.getEnvironment(),
        });
    }
}
export default new StatusServiceMock();
