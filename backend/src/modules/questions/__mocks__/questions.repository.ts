import { questionStub } from "../test/stubs/question.stub";

export const QuestionsRepository = jest.fn().mockReturnValue({
  findById: jest.fn().mockResolvedValue(questionStub()),
  create: jest.fn().mockResolvedValue(questionStub()),
  updateById: jest.fn().mockResolvedValue(questionStub()),
});