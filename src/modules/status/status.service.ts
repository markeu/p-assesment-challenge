import { Injectable } from '@nestjs/common';

import { configService } from 'nest-shared';

import type { AppServiceInterface } from 'nest-shared';

import { StatusEnum } from './status.enum';

@Injectable()
export class StatusService {
    private status: StatusEnum = StatusEnum.none;

    public set Status(status: StatusEnum) {
        this.status = status;
    }
    public get Status() {
        return this.status;
    }

    public show(): Promise<AppServiceInterface> {
        return Promise.resolve({
            name: 'parloa-backend-challenge',
            version: '0.0.1.',
            status: this.Status,
            date: new Date(),
            environment: configService.getEnvironment(),
        });
    }
}
export default new StatusService();
