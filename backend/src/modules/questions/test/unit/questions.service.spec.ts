import { Test } from "@nestjs/testing";
import { QuestionsRepository } from "../../questions.repository";
import { QuestionsService } from "../../questions.service";
import { QuestionsByDifficulty } from "../../schemas/questionsbydifficulty.schema";
import { questionStub } from "../stubs/question.stub";
import { NotFoundException } from "@nestjs/common";

jest.mock('../../questions.repository');

describe('QuestionsService', () => {
  let questionsService: QuestionsService;
  let questionsRepository: QuestionsRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [QuestionsService, QuestionsRepository],
    }).compile();

    questionsService = moduleRef.get<QuestionsService>(QuestionsService);
    questionsRepository = moduleRef.get<QuestionsRepository>(QuestionsRepository);
    jest.clearAllMocks();
  });

  describe('findDifficultyQuestionById', () => {
    describe('when findDifficultyQuestionById is called', () => {
      let question: QuestionsByDifficulty;

      beforeEach(async () => {
        jest.spyOn(questionsRepository, 'findById').mockResolvedValue(questionStub());
        question = await questionsService.findDifficultyQuestionById(questionStub().question_id);
      });

      test('should return a question', () => {
        expect(question).toEqual(questionStub());
      });
    });

    describe('when question is not found', () => {
      beforeEach(() => {
        jest.spyOn(questionsRepository, 'findById').mockResolvedValue(null);
      });

      test('should throw a NotFoundException', async () => {
        await expect(questionsService.findDifficultyQuestionById('invalid_id')).rejects.toThrow(NotFoundException);
      });
    });
  });

  describe('createDifficultyOfQuestion', () => {
    let createdQuestion: QuestionsByDifficulty;
    const requestDto = { question_id: '100', percentage: 23.5 };

    beforeEach(async () => {
      jest.spyOn(questionsRepository, 'create').mockResolvedValue(questionStub());
      createdQuestion = await questionsService.createDifficultyOfQuestion(requestDto);
    });

    test('should return the created question', () => {
      expect(createdQuestion).toEqual(questionStub());
    });
  });


  describe('updateDifficultyOfQuestion', () => {
    const requestDto = { question_id: '100', percentage: 23.5 };

    describe('when question is successfully updated', () => {
      let updatedQuestion: QuestionsByDifficulty;

      beforeEach(async () => {
        jest.spyOn(questionsRepository, 'updateById').mockResolvedValue(questionStub());
        updatedQuestion = await questionsService.updateDifficultyOfQuestion('100', requestDto);
      });

      test('should return the updated question', () => {
        expect(updatedQuestion).toEqual(questionStub());
      });
    });

    describe('when question to update is not found', () => {
      beforeEach(() => {
        jest.spyOn(questionsRepository, 'updateById').mockResolvedValue(null);
      });

      test('should throw a NotFoundException', async () => {
        await expect(questionsService.updateDifficultyOfQuestion('invalid_id', requestDto)).rejects.toThrow(
          new NotFoundException(`Question with id invalid_id not found`),
        );
      });
    });
  });
});
