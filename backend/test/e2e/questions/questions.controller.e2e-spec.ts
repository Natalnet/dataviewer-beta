import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';
import { JwtService } from '@nestjs/jwt';
import { getConnectionToken, MongooseModule } from '@nestjs/mongoose';
import {
  DifficultyQuestions,
  DifficultyQuestionsSchema,
} from 'src/modules/questions/schemas/difficulty-question.schema';
import { DifficultyQuestionsFactory } from 'test/factories/difficulty-questions.factory';
import { UserFactory } from 'test/factories/user.factory';
import { User, UserSchema } from 'src/modules/users/schemas/user.schema';
import { randomUUID } from 'crypto';

describe('QuestionsController (e2e)', () => {
  let app: INestApplication;
  let connection;
  let difficultyQuestionsFactory: DifficultyQuestionsFactory;
  let userFactory: UserFactory;
  let jwt: JwtService;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        MongooseModule.forFeature([
          { name: DifficultyQuestions.name, schema: DifficultyQuestionsSchema },
          { name: User.name, schema: UserSchema },
        ]),
      ],
      providers: [DifficultyQuestionsFactory, UserFactory],
    }).compile();

    app = moduleRef.createNestApplication();
    jwt = moduleRef.get(JwtService);

    await app.init();

    difficultyQuestionsFactory = moduleRef.get(DifficultyQuestionsFactory);
    userFactory = moduleRef.get(UserFactory);
    connection = app.get(getConnectionToken());
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
    await app.close();
  });

  it('[GET] questions/difficulty/:id', async () => {
    const user = await userFactory.create();
    const accessToken = jwt.sign({ sub: user._id.toString() });

    const question = await difficultyQuestionsFactory.create();

    const response = await request(app.getHttpServer())
      .get(`/questions/difficulty/${question.question_id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);

    expect(response.body).toHaveProperty('_id');
    expect(response.body).toHaveProperty('question_id', question.question_id);
    expect(response.body).toHaveProperty('percentage', question.percentage);
  });

  it('[POST] questions/difficulty', async () => {
    const user = await userFactory.create();
    const accessToken = jwt.sign({ sub: user._id.toString() });

    const newDifficultyQuestion = {
      question_id: randomUUID(),
      percentage: 75,
    };

    const response = await request(app.getHttpServer())
      .post('/questions/difficulty')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(newDifficultyQuestion)
      .expect(201);

    expect(response.body).toHaveProperty('_id');
    expect(response.body).toHaveProperty('question_id', newDifficultyQuestion.question_id);
    expect(response.body).toHaveProperty('percentage', newDifficultyQuestion.percentage);
  });

  it('[PUT] questions/difficulty/:id', async () => {
    const user = await userFactory.create();
    const accessToken = jwt.sign({ sub: user._id.toString() });

    const question = await difficultyQuestionsFactory.create();

    const updateDifficultyQuestion = {
      question_id: randomUUID(),
      percentage: 30,
    };

    const response = await request(app.getHttpServer())
      .put(`/questions/difficulty/${question.question_id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send(updateDifficultyQuestion)
      .expect(200);

    expect(response.body).toHaveProperty('_id');
    expect(response.body).toHaveProperty('question_id', updateDifficultyQuestion.question_id);
    expect(response.body).toHaveProperty('percentage', updateDifficultyQuestion.percentage);
  });
});
