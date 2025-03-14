import { Injectable, NotFoundException } from '@nestjs/common';
import {
  DifficultyQuestions,
  DifficultyQuestionsDocument,
} from './schemas/difficulty-question.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDifficultyQuestionDto } from './dto/create-difficulty-question';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectModel(DifficultyQuestions.name)
    private readonly DifficultyQuestionsModel: Model<DifficultyQuestionsDocument>,
  ) {}

  async findById(questionId: string): Promise<DifficultyQuestions> {
    const question = await this.DifficultyQuestionsModel.findOne({
      question_id: questionId,
    }).exec();
    if (!question) {
      throw new NotFoundException(`Question with id ${questionId} not found`);
    }
    return question;
  }

  async create(
    createDifficultyQuestionDto: CreateDifficultyQuestionDto,
  ): Promise<DifficultyQuestions> {
    const newQuestion = await this.DifficultyQuestionsModel.create(
      createDifficultyQuestionDto,
    );
    return newQuestion.save();
  }

  async updateById(
    id: string,
    updateData: Partial<CreateDifficultyQuestionDto>,
  ): Promise<DifficultyQuestions> {
    const updatedQuestion =
      await this.DifficultyQuestionsModel.findOneAndUpdate(
        { question_id: id },
        { $set: updateData },
        { new: true },
      ).exec();

    if (!updatedQuestion) {
      throw new NotFoundException(
        `Question with id ${id} not found for update`,
      );
    }
    return updatedQuestion;
  }
}
