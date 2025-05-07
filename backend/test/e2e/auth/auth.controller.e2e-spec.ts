import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import * as cookieParser from 'cookie-parser';
import { AppModule } from 'src/app.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/modules/users/schemas/user.schema';
import { UserFactory } from 'test/factories/user.factory';
import { rootMongooseTestModule, closeInMongodConnection } from 'test/utils/mongo-memory-server';
import { BcryptService } from 'src/modules/auth/services/bcrypt.service';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let userFactory: UserFactory;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        AppModule,
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
      ],
      providers: [UserFactory, BcryptService],
    }).compile();

    app = moduleRef.createNestApplication();
    app.use(cookieParser());
    await app.init();

    userFactory = moduleRef.get(UserFactory);
  });

  afterAll(async () => {
    await app.close();
    await closeInMongodConnection();
  });

  it('[POST] auth/signUp', async () => {
    const signUpDto = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'password123',
      passwordConfirmation: 'password123',
      registrationNumber: '123456789',
    };

    const response = await request(app.getHttpServer())
      .post('/auth/signUp')
      .send(signUpDto)
      .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('name', signUpDto.name);
    expect(response.body).toHaveProperty('email', signUpDto.email);
  });

  it('[POST] auth/signIn', async () => {
    const user = await userFactory.create({ password: 'password123' });

    const signInDto = {
      email: user.email,
      password: 'password123',
    };

    const response = await request(app.getHttpServer())
      .post('/auth/signIn')
      .send(signInDto)
      .expect(201);

    expect(response.body).toHaveProperty('accessToken');
    expect(response.headers['set-cookie']).toBeDefined();
  });

  it('[POST] auth/refresh', async () => {
    const user = await userFactory.create({ password: 'password123' });
    
    const signInResponse = await request(app.getHttpServer())
      .post('/auth/signIn')
      .send({ email: user.email, password: 'password123' })
      .expect(201);

    const cookies = signInResponse.headers['set-cookie'];

    const response = await request(app.getHttpServer())
      .post('/auth/refresh')
      .set('Cookie', cookies)
      .expect(201);

      expect(response.body).toHaveProperty('accessToken');
  });

  it('[POST] auth/signOut', async () => {
    const user = await userFactory.create({ password: 'password123' });

    const signInResponse = await request(app.getHttpServer())
      .post('/auth/signIn')
      .send({ email: user.email, password: 'password123' })
      .expect(201);

    const cookies = signInResponse.headers['set-cookie'];

    await request(app.getHttpServer())
    .post('/auth/signOut')
    .set('Cookie', cookies)
    .expect(204);

    const refreshResponse = await request(app.getHttpServer())
      .post('/auth/refresh')
      .set('Cookie', cookies)
      .expect(401);

    expect(refreshResponse.body.message).toBe('Invalid or expired refresh token.');
  });
});
