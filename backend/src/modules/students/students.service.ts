import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StudentListGradesDto } from './dto/get-student-list-grades.dto';
import { ExamGradesDto } from './dto/get-student-exam-grades.dto';
import {
  StudentListGrades,
  StudentListGradesDocument,
} from './schemas/studentlistgrades.schema';
import { ExamGrades, ExamGradesDocument } from './schemas/examgrades.schema';
import {
  StudentParticipation,
  StudentParticipationDocument,
} from './schemas/studentparticipation.schema';
import { StudentParticipationsDto } from './dto/get-student-participations.dto';
import { StudentListUnitGradesDto } from './dto/get-student-list-unit-grades.dto';
import { StudentFrequencyDto } from './dto/get-student-frequency.dto';
import {
  StudentFrequency,
  StudentFrequencyDocument,
} from './schemas/studentfrequency.schema';

@Injectable()
export class StudentsService {
  constructor(
    @InjectModel(StudentListGrades.name)
    private readonly studentListGradesModel: Model<StudentListGradesDocument>,
    @InjectModel(ExamGrades.name)
    private readonly examGradesModel: Model<ExamGradesDocument>,
    @InjectModel(StudentParticipation.name)
    private readonly stdudentParticipationModel: Model<StudentParticipationDocument>,
    @InjectModel(StudentFrequency.name)
    private readonly studentFrequencyModel: Model<StudentFrequencyDocument>,
  ) {}

  async findStudentListGrades(id: string): Promise<StudentListGradesDto[]> {
    const data = await this.studentListGradesModel
      .findOne({ student_id: id })
      .exec();
    if (!data) return [];

    return data['lists'].map((l) => ({
      fullName: l.description,
      progress: l.percent,
    }));
  }

  async findStudentListGradesByMat(
    mat: string,
  ): Promise<StudentListGradesDto[]> {
    const data = await this.studentListGradesModel
      .findOne({ reg_num: mat })
      .exec();
    if (!data) return [];

    return data['lists'].map((l) => ({
      fullName: l.description,
      progress: l.percent,
    }));
  }

  async findStudentListUnitGrades(
    mat: string,
  ): Promise<StudentListUnitGradesDto> {
    const data = await this.studentListGradesModel
      .findOne({ reg_num: mat })
      .exec();
    if (!data)
      return {
        meanU1: '-',
        meanU2: '-',
        meanU3: '-',
      };

    return {
      meanU1: data.meanU1,
      meanU2: data.meanU2,
      meanU3: data.meanU3,
    };
  }

  async findExamGrades(mat: string): Promise<ExamGradesDto> {
    const data = await this.examGradesModel.findOne({ matricula: mat }).exec();

    if (!data)
      return {
        grade1: '-',
        comment1: '-',
        grade2: '-',
        comment2: '-',
        grade3: '-',
        comment3: '-',
      };

    return {
      grade1: data.nota1,
      comment1: data.comentario1,
      grade2: data.nota2,
      comment2: data.comentario2,
      grade3: data.nota3,
      comment3: data.comentario3,
    };
  }

  async findParticipations(mat: string): Promise<StudentParticipationsDto> {
    const data = await this.stdudentParticipationModel
      .findOne({ matricula: mat })
      .exec();

    if (!data)
      return {
        presence1: '-',
        activities1: '-',
        presence2: '-',
        activities2: '-',
        presence3: '-',
        activities3: '-',
      };

    return {
      presence1: data.presenca1,
      activities1: data.atividade1,
      presence2: data.presenca2,
      activities2: data.atividade2,
      presence3: data.presenca3,
      activities3: data.atividade3,
    };
  }

  async findStudentFrequency(mat: string): Promise<StudentFrequencyDto> {
    const data = await this.studentFrequencyModel
      .findOne({ regNum: mat })
      .exec();

    if (!data)
      return {
        classCode: '-',
        classFreqs: ['-'],
      };

    return {
      classCode: data.classCode,
      classFreqs: data.classFreqs,
    };
  }
}
