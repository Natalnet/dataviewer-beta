import { questionStub } from "../test/stubs/question.stub";

export const QuestionsService = jest.fn().mockReturnValue({
  findDifficultyQuestionById: jest.fn().mockResolvedValue(questionStub()),
  createDifficultyOfQuestion: jest.fn().mockResolvedValue(questionStub()),
  updateDifficultyOfQuestion: jest.fn().mockResolvedValue(questionStub()),
});