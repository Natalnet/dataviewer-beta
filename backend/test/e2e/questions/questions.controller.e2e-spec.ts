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

    const question = await difficultyQuestionsFactory.create({
      question_id: '100',
      percentage: 80,
    });

    const response = await request(app.getHttpServer())
      .get('/questions/difficulty/100')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);

    expect(response.body).toHaveProperty('_id');
    expect(response.body).toHaveProperty('question_id', question.question_id);
    expect(response.body).toHaveProperty('percentage', question.percentage);
  });

  it('[POST] questions/difficulty', async () => {
    const user = await userFactory.create();
    const accessToken = jwt.sign({ sub: user._id.toString() });

    const response = await request(app.getHttpServer())
      .post('/questions/difficulty')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        question_id: '200',
        percentage: 75,
      })
      .expect(201);

    expect(response.body).toHaveProperty('_id');
    expect(response.body).toHaveProperty('question_id', '200');
    expect(response.body).toHaveProperty('percentage', 75);
  });

  it('[PUT] questions/difficulty/:id', async () => {
    const user = await userFactory.create();
    const accessToken = jwt.sign({ sub: user._id.toString() });

    await difficultyQuestionsFactory.create({
      question_id: '300',
      percentage: 10,
    });

    const response = await request(app.getHttpServer())
      .put('/questions/difficulty/300')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        question_id: '302',
        percentage: 23.5,
      })
      .expect(200);

    expect(response.body).toHaveProperty('_id');
    expect(response.body).toHaveProperty('question_id', '302');
    expect(response.body).toHaveProperty('percentage', 23.5);
  });
});
