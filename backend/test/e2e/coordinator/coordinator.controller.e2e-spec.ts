import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { UserFactory } from 'test/factories/user.factory';
import { User, UserSchema } from 'src/modules/users/schemas/user.schema';
import { PerformanceFactory } from 'test/factories/performance.factory';
import { Performance, PerformanceSchema } from 'src/modules/coordinator/schemas/performance.schema';
import { SubjectPerformanceFactory } from 'test/factories/subject-performance.factory';
import { SubjectPerformance, SubjectPerformanceSchema } from 'src/modules/coordinator/schemas/subjectperformance.schema';
import { rootMongooseTestModule, closeInMongodConnection } from 'test/utils/mongo-memory-server';
import { BcryptService } from 'src/modules/auth/bcrypt.service';

describe('CoordinatorController (e2e)', () => {
  let app: INestApplication;
  let subjectPerformanceFactory: SubjectPerformanceFactory;
  let performanceFactory: PerformanceFactory;
  let userFactory: UserFactory;
  let jwt: JwtService;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        AppModule,
        MongooseModule.forFeature([
          { name: SubjectPerformance.name, schema: SubjectPerformanceSchema },
          { name: Performance.name, schema: PerformanceSchema },
          { name: User.name, schema: UserSchema },
        ]),
      ],
      providers: [SubjectPerformanceFactory, PerformanceFactory, UserFactory, BcryptService],
    }).compile();

    app = moduleRef.createNestApplication();
    jwt = moduleRef.get(JwtService);

    await app.init();

    subjectPerformanceFactory = moduleRef.get(SubjectPerformanceFactory);
    performanceFactory = moduleRef.get(PerformanceFactory);
    userFactory = moduleRef.get(UserFactory);
  });

  afterAll(async () => {
    await app.close();
    await closeInMongodConnection();
  });

  it('[GET] coordinator/:year/:semester', async () => {
    const user = await userFactory.create();
    const accessToken = jwt.sign({ sub: user.id, email: user.email, aud: 'access' });

    const performance = await performanceFactory.create();

    const response = await request(app.getHttpServer())
      .get(`/coordinator/${performance.year}/1`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);

    expect(response.body).toHaveProperty('year', performance.year);
    expect(response.body).toHaveProperty('semester', performance.semester);
  });

  it('[GET] coordinator/:code/:semester', async () => {
    const user = await userFactory.create();
    const accessToken = jwt.sign({ sub: user.id, email: user.email, aud: 'access' });

    const performance = await subjectPerformanceFactory.create();

    const response = await request(app.getHttpServer())
      .get(`/coordinator/subject/${performance.code}/${performance.semester}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);

    expect(response.body).toHaveProperty('code', performance.code);
    expect(response.body).toHaveProperty('semester', performance.semester);
  });
});
