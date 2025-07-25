import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ClassesModule } from './modules/classes/classes.module';
import { CoordinatorModule } from './modules/coordinator/coordinator.module';
import { StudentsModule } from './modules/students/students.module';
import { MailModule } from './modules/mail/mail.module';
import { QuestionsModule } from './modules/questions/questions.module';
import { MongoDatabaseProviderModule } from './providers/database/mongo.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongoDatabaseProviderModule,
    UsersModule,
    AuthModule,
    ClassesModule,
    CoordinatorModule,
    StudentsModule,
    QuestionsModule,
    MailModule,
  ],
})
export class AppModule {}
