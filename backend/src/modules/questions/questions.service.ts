import { Injectable, NotFoundException } from "@nestjs/common";
import { QuestionsByDifficulty } from "./schemas/questionsbydifficulty.schema";
import { DifficultyOfQuestionDto } from "./dto/post-difficulty-of-question";
import { QuestionsRepository } from "./questions.repository";

@Injectable()
export class QuestionsService {
  constructor(private readonly questionsRepository: QuestionsRepository) {}

  async findDifficultyQuestionById(id: string): Promise<QuestionsByDifficulty> {
    const question = await this.questionsRepository.findById(id);
    if (!question) {
      throw new NotFoundException(`Question with id ${id} not found`);
    }
    return question;
  }

  async createDifficultyOfQuestion(difficultyOfQuestionDto: DifficultyOfQuestionDto): Promise<QuestionsByDifficulty> {
    return await this.questionsRepository.create(difficultyOfQuestionDto);
  }

  async updateDifficultyOfQuestion(id: string, request: DifficultyOfQuestionDto) {
    const updatedDifficultyOfQuestion = await this.questionsRepository.updateById(id, request);
    if (!updatedDifficultyOfQuestion) {
      throw new NotFoundException(`Question with id ${id} not found`);
    }
    return updatedDifficultyOfQuestion;
  }
}