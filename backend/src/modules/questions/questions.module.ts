import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { QuestionsByDifficulty, QuestionsByDifficultySchema } from "./schemas/questionsbydifficulty.schema";
import { QuestionsService } from "./questions.service";
import { QuestionsController } from "./questions.controller";
import { QuestionsRepository } from "./questions.repository";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: QuestionsByDifficulty.name, schema: QuestionsByDifficultySchema }
    ])
  ],
  controllers: [QuestionsController],
  providers: [QuestionsService, QuestionsRepository]
})

export class QuestionsModule {}