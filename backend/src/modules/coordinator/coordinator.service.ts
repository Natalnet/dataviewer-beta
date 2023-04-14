import { Injectable } from '@nestjs/common';
import { Semester } from 'src/types/semester';
import { Performance, PerformanceDocument } from './schemas/performance.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CoordinatorService {
  constructor(
    @InjectModel(Performance.name)
    private readonly performanceModel: Model<PerformanceDocument>,
  ) {}

  async findPerformanceForSemester(
    year: number,
    semester: Semester,
  ): Promise<Performance> {
    const performanceForSemester = await this.performanceModel
      .findOne({ year: year, semester: semester })
      .exec();

    return performanceForSemester;
  }
}
