import { Test } from '@nestjs/testing';

import { getModelToken } from '@nestjs/mongoose';
import { CoordinatorService } from 'src/modules/coordinator/coordinator.service';
import { Performance } from 'src/modules/coordinator/schemas/performance.schema';
import { SubjectPerformance } from 'src/modules/coordinator/schemas/subjectperformance.schema';

describe('CoordinatorService (unit)', () => {
  let coordinatorService: CoordinatorService;

  const mockSchema = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        CoordinatorService,
        {
          provide: getModelToken(Performance.name),
          useValue: mockSchema,
        },
        {
          provide: getModelToken(SubjectPerformance.name),
          useValue: mockSchema,
        },
      ],
    }).compile();

    coordinatorService = moduleRef.get<CoordinatorService>(CoordinatorService);

    jest.clearAllMocks();
  });

  describe('findPerformanceForSemester', () => {
    it('should successfully return performance for semester', async () => {
      const mockResponse: Performance = {
        year: 2024,
        semester: 1,
        performanceRate: 85.5,
      };

      mockSchema.findOne.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(mockResponse),
      });

      const result = await coordinatorService.findPerformanceForSemester(2024, 1);

      expect(result).toEqual(mockResponse);
      expect(mockSchema.findOne).toHaveBeenCalledWith({ year: 2024, semester: 1 });
    });
  });

  describe('findSubjectPerformanceForSemester', () => {
    it('should successfully return performance for semester', async () => {
      const mockResponse: SubjectPerformance = {
        code: 'ADM0561',
        semester: '2024.1',
        approved: 50,
        approvedByGrade: 40,
        canceled: 5,
        disapproved: 10,
        disapprovedByAbsence: 2,
        disapprovedByGrade: 5,
        disapprovedByGradeAndAbsence: 3,
        disapprovedByMeanAbsence: 1,
        excluded: 0,
        locked: 1,
        name: 'Administração Geral',
      };

      mockSchema.findOne.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(mockResponse),
      });

      const result = await coordinatorService.findSubjectPerformanceForSemester('ADM0561', '2024.1');

      expect(result).toEqual(mockResponse);
      expect(mockSchema.findOne).toHaveBeenCalledWith({ code: 'ADM0561', semester: '2024.1' });
    });
  });
});
