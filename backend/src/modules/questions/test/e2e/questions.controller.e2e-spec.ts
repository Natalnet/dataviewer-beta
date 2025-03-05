import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../../../app.module';
import { Connection } from 'mongoose';
import { User } from 'src/modules/users/schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/modules/users/users.service';
describe('QuestionsController (E2E)', () => {
  let app: INestApplication;
  let questionId: string;
  let dbConnection: Connection;
  let authToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    
    const userService = app.get(UsersService);
    const user = await userService.create({
      name: 'João',
      email: 'teste@gmail.com',
      password: '123',
      avatar: 'default.png',
      registrationNumber: '10',
    });
    
    const jwtService = app.get(JwtService);
    authToken = jwtService.sign({ sub: user.id, username: user.name });

    dbConnection = app.get<Connection>('DatabaseConnection');

    // Seed de questão
    const createResponse = await request(app.getHttpServer())
      .post(`/questions/difficulty`)
      .set('Authorization', `Bearer ${authToken}`)
      .send({ question_id: '1000', percentage: 30 });

    questionId = createResponse.body.question_id;
  });

  afterAll(async () => {
    await dbConnection.db.dropDatabase();
    await dbConnection.close();
    await app.close();
  });

  it('/questions/difficulty/:id (GET) should return question by difficulty', async () => {
    const response = await request(app.getHttpServer())
      .get(`/questions/difficulty/${questionId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200);

    expect(response.body).toHaveProperty('question_id', questionId);
    expect(response.body).toHaveProperty('percentage');
  });

  it('/questions/difficulty (POST) should create a new question difficulty', async () => {
    const requestDto = { question_id: '100', percentage: 30 }

    const response = await request(app.getHttpServer())
      .post(`/questions/difficulty`)
      .set('Authorization', `Bearer ${authToken}`)
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
      .set('Authorization', `Bearer ${authToken}`)
      .send(requestDto)
      .expect(200);

    expect(response.body).toHaveProperty('question_id', requestDto.question_id);
    expect(response.body).toHaveProperty('percentage', requestDto.percentage);
  });
});
