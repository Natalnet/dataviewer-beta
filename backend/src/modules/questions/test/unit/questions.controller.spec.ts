import { Test } from "@nestjs/testing";
import { QuestionsController } from "../../questions.controller";
import { QuestionsService } from "../../questions.service";
import { QuestionsByDifficulty } from "../../schemas/questionsbydifficulty.schema";
import { questionStub } from "../stubs/question.stub";
import { NotFoundException } from "@nestjs/common";

jest.mock('../../questions.service');

describe('QuestionsController', () => {
  let questionsController: QuestionsController;
  let questionsService: QuestionsService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [QuestionsController],
      providers: [QuestionsService],
    }).compile();

    questionsController = moduleRef.get<QuestionsController>(QuestionsController);
    questionsService = moduleRef.get<QuestionsService>(QuestionsService);
    jest.clearAllMocks();
  });

  describe('findDifficultyQuestionById', () => {
    describe('when findDifficultyQuestionById is called', () => {
      let question: QuestionsByDifficulty;

      beforeEach(async () => {
        question = await questionsController.findDifficultyQuestionById(questionStub().question_id);
      });

      test("should call questionsService", () => {
        expect(questionsService.findDifficultyQuestionById).toBeCalledWith(questionStub().question_id);
      });

      test('should return a question', () => {
        expect(question).toEqual('');
      });
    });

    describe('when findDifficultyQuestionById is called with an invalid ID', () => {
      beforeEach(() => {
        jest.spyOn(questionsService, 'findDifficultyQuestionById').mockRejectedValue(new NotFoundException());
      });
  
      test('should throw a NotFoundException', async () => {
        await expect(questionsController.findDifficultyQuestionById('invalid_id')).rejects.toThrow(NotFoundException);
      });
    });
  });

  describe('createDifficultyForQuestion', () => {
    describe('when createDifficultyForQuestion is called', () => {
      let createdQuestion: QuestionsByDifficulty;
      const requestDto = { question_id: '100', percentage: 23.5 };

      beforeEach(async () => {
        createdQuestion = await questionsController.createDifficultyForQuestion(requestDto);
      });

      test('should call questionsService', () => {
        expect(questionsService.createDifficultyOfQuestion).toBeCalledWith(requestDto);
      });

      test('should return a created question', () => {
        expect(createdQuestion).toEqual(questionStub());
      });
    });

    describe('when createDifficultyForQuestion fails', () => {
      const requestDto = { question_id: '100', percentage: 23.5 };
  
      beforeEach(() => {
        jest.spyOn(questionsService, 'createDifficultyOfQuestion').mockRejectedValue(new NotFoundException());
      });
  
      test('should throw an error', async () => {
        await expect(questionsController.createDifficultyForQuestion(requestDto)).rejects.toThrow(NotFoundException);
      });
    });
  });

  describe('updateDifficultyForQuestion', () => {
    describe('when updateDifficultyForQuestion is called', () => {
      let updatedQuestion: QuestionsByDifficulty;
      const requestDto = { question_id: '100', percentage: 23.5 };

      beforeEach(async () => {
        updatedQuestion = await questionsController.updateDifficultyForQuestion('100', requestDto);
      });

      test('should call questionsService', () => {
        expect(questionsService.updateDifficultyOfQuestion).toBeCalledWith('100', requestDto);
      });

      test('should return a updated question', () => {
        expect(updatedQuestion).toEqual(questionStub());
      });
    });

    describe('when updateDifficultyForQuestion is called with a valid ID', () => {
      let updatedQuestion: QuestionsByDifficulty;
      const requestDto = { question_id: '100', percentage: 23.5 };
  
      beforeEach(async () => {
        jest.spyOn(questionsService, 'updateDifficultyOfQuestion').mockResolvedValue(questionStub());
        updatedQuestion = await questionsController.updateDifficultyForQuestion('100', requestDto);
      });
  
      test('should return an updated question', () => {
        expect(updatedQuestion).toEqual(questionStub());
      });
    });
  });

});
