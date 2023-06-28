import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '.././src/modules/app/app.module';

describe('AppController (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/status (GET)', () => {
        return request(app.getHttpServer()).get('/status').expect(200).expect({
            name: 'parloa-backend-challenge',
            version: '0.0.1.',
            status: 'online',
            date: '2023-06-28T16:33:01.544Z',
            environment: 'test',
        });
    });
});
