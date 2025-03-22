import { Test } from '@nestjs/testing';

import { QuestionsService } from 'src/modules/questions/questions.service';
import { DifficultyQuestions } from 'src/modules/questions/schemas/difficulty-question.schema';
import { NotFoundException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';

describe('QuestionsService (unit)', () => {
  let questionsService: QuestionsService;

  const mockSchema = {
    findOne: jest.fn(),
    create: jest.fn(),
    findOneAndUpdate: jest.fn(),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        QuestionsService,
        {
          provide: getModelToken(DifficultyQuestions.name),
          useValue: mockSchema,
        },
      ],
    }).compile();

    questionsService = moduleRef.get<QuestionsService>(QuestionsService);

    jest.clearAllMocks();
  });

  describe('findById', () => {
    it('should return difficult of question by id', async () => {
      const mockResponse: DifficultyQuestions = {
        question_id: '100',
        percentage: 50,
      };

      mockSchema.findOne.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(mockResponse),
      });

      const result = await questionsService.findById('100');

      expect(result).toEqual(mockResponse);
      expect(mockSchema.findOne).toHaveBeenCalledWith({ question_id: '100' });
    });

    it('should throw notFoundException', async () => {
      const questionId = '404';

      mockSchema.findOne.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(null),
      });

      await expect(questionsService.findById(questionId)).rejects.toThrowError(
        new NotFoundException(`Question with id ${questionId} not found`),
      );

      expect(mockSchema.findOne).toHaveBeenCalledWith({ question_id: questionId });
    });
  });

  describe('create', () => {
    it('should create difficulty of question', async () => {
      const difficultyQuestion: DifficultyQuestions = {
        question_id: '100',
        percentage: 30,
      };

      const mockResponse: DifficultyQuestions = {
        question_id: '100',
        percentage: 30,
      };

      mockSchema.create.mockReturnValueOnce({
        save: jest.fn().mockResolvedValueOnce(mockResponse),
      });

      const result = await questionsService.create(
        difficultyQuestion
      );

      expect(result).toEqual(mockResponse);
      expect(result.question_id).toBe(mockResponse.question_id);
      expect(result.percentage).toBe(mockResponse.percentage);
      expect(mockSchema.create).toHaveBeenCalledWith(difficultyQuestion);
    });
  });

  describe('update', () => {
    it('should update difficulty of question', async () => {
      const question_id = '200';
      const difficultyQuestion: DifficultyQuestions = {
        question_id: '100',
        percentage: 80,
      };

      const mockResponse: DifficultyQuestions = {
        question_id: '100',
        percentage: 80,
      };

      mockSchema.findOneAndUpdate.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(mockResponse),
      });

      const result = await questionsService.updateById(
        question_id,
        difficultyQuestion,
      );

      expect(result).toEqual(mockResponse);
      expect(result.question_id).toBe(mockResponse.question_id);
      expect(result.percentage).toBe(mockResponse.percentage);
      expect(mockSchema.findOneAndUpdate).toHaveBeenCalledWith(
        { question_id: question_id }, 
        { $set: difficultyQuestion }, 
        { new: true }
      );
    });

    it('should throw notFoundException', async () => {
      const questionId = '404';
      const difficultyQuestion: DifficultyQuestions = {
        question_id: questionId,
        percentage: 50,
      };

      mockSchema.findOneAndUpdate.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(null),
      });

      await expect(
        questionsService.updateById(questionId, difficultyQuestion),
      ).rejects.toThrowError(
        new NotFoundException(`Question with id ${questionId} not found for update`),
      );

      expect(mockSchema.findOneAndUpdate).toHaveBeenCalledWith(
        { question_id: questionId },
        { $set: difficultyQuestion },
        { new: true }
      );
    });
  });
});
