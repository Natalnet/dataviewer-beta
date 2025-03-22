import { Test } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';

import { StudentsService } from 'src/modules/students/students.service';
import { StudentListGrades } from 'src/modules/students/schemas/studentlistgrades.schema';
import { ExamGrades } from 'src/modules/students/schemas/examgrades.schema';
import { StudentParticipation } from 'src/modules/students/schemas/studentparticipation.schema';
import { StudentFrequency } from 'src/modules/students/schemas/studentfrequency.schema';

describe('StudentsService (unit)', () => {
  let studentsService: StudentsService;

  const mockSchema = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        StudentsService,
        {
          provide: getModelToken(StudentListGrades.name),
          useValue: mockSchema,
        },
        {
          provide: getModelToken(ExamGrades.name),
          useValue: mockSchema,
        },
        {
          provide: getModelToken(StudentParticipation.name),
          useValue: mockSchema,
        },
        {
          provide: getModelToken(StudentFrequency.name),
          useValue: mockSchema,
        },
      ],
    }).compile();

    studentsService = moduleRef.get<StudentsService>(StudentsService);
    
    jest.clearAllMocks();
  });

  describe('findStudentListGrades', () => {
    it('should return student list grades by student_id', async () => {
      const mockResponse = {
        lists: [{ description: 'Aluno 1', percent: 75 }],
      };

      mockSchema.findOne.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(mockResponse),
      });

      const result = await studentsService.findStudentListGrades('123');

      expect(result).toEqual([{ fullName: 'Aluno 1', progress: 75 }]);
      expect(mockSchema.findOne).toHaveBeenCalledWith({ student_id: '123' });
    });

    it('should return empty array if no data', async () => {
      mockSchema.findOne.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(null),
      });

      const result = await studentsService.findStudentListGrades('123');
      expect(result).toEqual([]);
    });
  });

  describe('findStudentListGradesByMat', () => {
    it('should return student list grades by reg_num', async () => {
      const mockResponse = {
        lists: [{ description: 'Aluno B', percent: 90 }],
      };

      mockSchema.findOne.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(mockResponse),
      });

      const result = await studentsService.findStudentListGradesByMat('MAT001');

      expect(result).toEqual([{ fullName: 'Aluno B', progress: 90 }]);
      expect(mockSchema.findOne).toHaveBeenCalledWith({ reg_num: 'MAT001' });
    });

    it('should return empty array if no data', async () => {
      mockSchema.findOne.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(null),
      });

      const result = await studentsService.findStudentListGradesByMat('MAT001');
      expect(result).toEqual([]);
    });
  });

  describe('findStudentListUnitGrades', () => {
    it('should return unit grades', async () => {
      const mockResponse = {
        meanU1: '8.5',
        meanU2: '7.5',
        meanU3: '9.0',
      };

      mockSchema.findOne.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(mockResponse),
      });

      const result = await studentsService.findStudentListUnitGrades('MAT123');

      expect(result).toEqual({
        meanU1: '8.5',
        meanU2: '7.5',
        meanU3: '9.0',
      });
      expect(mockSchema.findOne).toHaveBeenCalledWith({ reg_num: 'MAT123' });
    });

    it('should return default values if no data', async () => {
      mockSchema.findOne.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(null),
      });

      const result = await studentsService.findStudentListUnitGrades('MAT123');
      expect(result).toEqual({
        meanU1: '-',
        meanU2: '-',
        meanU3: '-',
      });
    });
  });

  describe('findExamGrades', () => {
    it('should return exam grades', async () => {
      const mockResponse = {
        nota1: '6',
        comentario1: 'Boa',
        nota2: '7',
        comentario2: 'Ok',
        nota3: '9',
        comentario3: 'Excelente',
      };

      mockSchema.findOne.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(mockResponse),
      });

      const result = await studentsService.findExamGrades('MATEX');

      expect(result).toEqual({
        grade1: '6',
        comment1: 'Boa',
        grade2: '7',
        comment2: 'Ok',
        grade3: '9',
        comment3: 'Excelente',
      });
      expect(mockSchema.findOne).toHaveBeenCalledWith({ matricula: 'MATEX' });
    });

    it('should return default if no data', async () => {
      mockSchema.findOne.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(null),
      });

      const result = await studentsService.findExamGrades('MATEX');

      expect(result).toEqual({
        grade1: '-',
        comment1: '-',
        grade2: '-',
        comment2: '-',
        grade3: '-',
        comment3: '-',
      });
    });
  });

  describe('findParticipations', () => {
    it('should return participation data', async () => {
      const mockResponse = {
        presenca1: 'P',
        atividade1: 'Atividade A',
        presenca2: 'F',
        atividade2: 'Atividade B',
        presenca3: 'P',
        atividade3: 'Atividade C',
      };

      mockSchema.findOne.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(mockResponse),
      });

      const result = await studentsService.findParticipations('MAT321');

      expect(result).toEqual({
        presence1: 'P',
        activities1: 'Atividade A',
        presence2: 'F',
        activities2: 'Atividade B',
        presence3: 'P',
        activities3: 'Atividade C',
      });

      expect(mockSchema.findOne).toHaveBeenCalledWith({ matricula: 'MAT321' });
    });

    it('should return default if no data', async () => {
      mockSchema.findOne.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(null),
      });

      const result = await studentsService.findParticipations('MAT321');

      expect(result).toEqual({
        presence1: '-',
        activities1: '-',
        presence2: '-',
        activities2: '-',
        presence3: '-',
        activities3: '-',
      });
    });
  });

  describe('findStudentFrequency', () => {
    it('should return student frequency', async () => {
      const mockResponse = {
        classCode: 'TURMA101',
        classFreqs: ['100%', '90%'],
      };

      mockSchema.findOne.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(mockResponse),
      });

      const result = await studentsService.findStudentFrequency('FREQ001');

      expect(result).toEqual({
        classCode: 'TURMA101',
        classFreqs: ['100%', '90%'],
      });

      expect(mockSchema.findOne).toHaveBeenCalledWith({ regNum: 'FREQ001' });
    });

    it('should return default if no data', async () => {
      mockSchema.findOne.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(null),
      });

      const result = await studentsService.findStudentFrequency('FREQ001');

      expect(result).toEqual({
        classCode: '-',
        classFreqs: ['-'],
      });
    });
  });
});
