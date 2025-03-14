import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { DifficultyQuestions, DifficultyQuestionsSchema } from './schemas/difficulty-question.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DifficultyQuestions.name, schema: DifficultyQuestionsSchema },
    ]),
  ],
  controllers: [QuestionsController],
  providers: [QuestionsService],
})
export class QuestionsModule {}
