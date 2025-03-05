import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { GithubModule } from '../github/github.module';
describe('GithubController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [GithubModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/github/search (GET)', async () => {
    const query = 'react';
    const response = await request(app.getHttpServer())
      .get('/github/search')
      .query({ q: query })
      .expect(200);

    expect(response.body).toHaveProperty('items');
    expect(Array.isArray(response.body.items)).toBe(true);
  });

  afterAll(async () => {
    await app.close();
  });
});
