import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../../../app.module';

describe('QuestionsController (E2E)', () => {
  let app: INestApplication;
  let questionId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    // Seed de questão
    const createResponse = await request(app.getHttpServer())
      .post(`/questions/difficulty`)
      .send({ question_id: '1000', percentage: 30 });

    questionId = createResponse.body.question_id;
  });

  afterAll(async () => {
    await app.close();
  });

  it('/questions/difficulty/:id (GET) should return question by difficulty', async () => {
    const response = await request(app.getHttpServer())
      .get(`/questions/difficulty/${questionId}`)
      .expect(200);

    expect(response.body).toHaveProperty('question_id', questionId);
    expect(response.body).toHaveProperty('percentage');
  });

  it('/questions/difficulty (POST) should create a new question difficulty', async () => {
    const requestDto = { question_id: '100', percentage: 30 }

    const response = await request(app.getHttpServer())
      .post(`/questions/difficulty`)
      .send(requestDto)
      .expect(201);

    expect(response.body).toHaveProperty('question_id', requestDto.question_id);
    expect(response.body).toHaveProperty('percentage', requestDto.percentage);
  });

  it('/questions/difficulty/:id (PUT)', async () => {
    const questionId = '100';
    const requestDto = { question_id: questionId, percentage: 50 }

    const response = await request(app.getHttpServer())
      .put(`/questions/difficulty/${questionId}`)
      .send(requestDto)
      .expect(200);

    expect(response.body).toHaveProperty('question_id', requestDto.question_id);
    expect(response.body).toHaveProperty('percentage', requestDto.percentage);
  });
});
