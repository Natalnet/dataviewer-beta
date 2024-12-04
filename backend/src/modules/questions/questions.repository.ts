import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, FilterQuery } from "mongoose";
import { QuestionsByDifficulty, QuestionsByDifficultyDocument } from "./schemas/questionsbydifficulty.schema";
import { DifficultyOfQuestionDto } from "./dto/post-difficulty-of-question";

@Injectable()
export class QuestionsRepository {
  constructor(
    @InjectModel(QuestionsByDifficulty.name)
    private readonly questionsByDifficultyModel: Model<QuestionsByDifficultyDocument>
  ) {}

  async findById(questionId: string): Promise<QuestionsByDifficulty> {
    return await this.questionsByDifficultyModel
      .findOne({ question_id: questionId })
      .exec();
  }

  async create(difficultyOfQuestionDto: DifficultyOfQuestionDto): Promise<QuestionsByDifficulty> {
    const newQuestion = new this.questionsByDifficultyModel(difficultyOfQuestionDto);
    return await newQuestion.save();
  }

  async updateById(id: string, updateData: Partial<DifficultyOfQuestionDto>): Promise<QuestionsByDifficulty> {
    return await this.questionsByDifficultyModel
      .findOneAndUpdate(
        { question_id: id },
        { $set: updateData },
        { new: true }
      )
      .exec();
  }
}
