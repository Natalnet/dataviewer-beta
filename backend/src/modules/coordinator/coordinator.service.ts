import { Injectable } from '@nestjs/common';
import { Semester } from 'src/types/semester';
import { Performance, PerformanceDocument } from './schemas/performance.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {
  SubjectPerformance,
  SubjectPerformanceDocument,
} from './schemas/subjectperformance.schema';

@Injectable()
export class CoordinatorService {
  constructor(
    @InjectModel(Performance.name)
    private readonly performanceModel: Model<PerformanceDocument>,
    @InjectModel(SubjectPerformance.name)
    private readonly subjectPerformaceModel: Model<SubjectPerformanceDocument>,
  ) {}

  async findPerformanceForSemester(year: number, semester: Semester): Promise<Performance> {
    const performanceForSemester = await this.performanceModel
      .findOne({ year: year, semester: semester })
      .exec();

    return performanceForSemester;
  }

  async findSubjectPerformanceForSemester(
    code: string,
    semester: string,
  ): Promise<SubjectPerformance> {
    const subjectPerformanceForSemester = await this.subjectPerformaceModel
      .findOne({ code: code, semester: semester })
      .exec();

    return subjectPerformanceForSemester;
  }
}
