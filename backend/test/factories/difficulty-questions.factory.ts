import { faker } from '@faker-js/faker';
import { DifficultyQuestions, DifficultyQuestionsDocument } from 'src/modules/questions/schemas/difficulty-question.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

export function makeDifficultyQuestion(
  override: Partial<DifficultyQuestions> = {},
) {
  return {
    question_id: faker.string.uuid(),
    percentage: faker.number.int({ min: 1, max: 100 }),
    ...override,
  };
}

@Injectable()
export class DifficultyQuestionsFactory {
  constructor(
    @InjectModel(DifficultyQuestions.name)
    private difficultyQuestionsModel: Model<DifficultyQuestionsDocument>,
  ) {}

  async create(
    data: Partial<DifficultyQuestions> = {},
  ): Promise<DifficultyQuestionsDocument> {
    const difficultyQuestion = makeDifficultyQuestion(data);

    const savedQuestion = new this.difficultyQuestionsModel(difficultyQuestion);
    await savedQuestion.save();

    return savedQuestion;
  }
}
