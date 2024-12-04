import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ClassesModule } from './modules/classes/classes.module';
import { CoordinatorModule } from './modules/coordinator/coordinator.module';
import { StudentsModule } from './modules/students/students.module';
import { MailModule } from './modules/mail/mail.module';
import { QuestionsModule } from './modules/questions/questions.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DATABASE_HOST, {
      authMechanism: 'DEFAULT',
      dbName: process.env.DATABASE_NAME,
    }),
    UsersModule,
    AuthModule,
    ClassesModule,
    CoordinatorModule,
    StudentsModule,
    QuestionsModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
