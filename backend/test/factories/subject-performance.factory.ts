import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SubjectPerformance, SubjectPerformanceDocument } from 'src/modules/coordinator/schemas/subjectperformance.schema';

export function makeSubjectPerformance(override: Partial<SubjectPerformance> = {}) {
  return {
    semester: 2,
    approved: faker.number.int({ min: 0, max: 100 }),
    approvedByGrade: faker.number.int({ min: 0, max: 100 }),
    canceled: faker.number.int({ min: 0, max: 50 }),
    code: faker.string.alphanumeric(6).toUpperCase(),
    disapproved: faker.number.int({ min: 0, max: 100 }),
    disapprovedByAbsence: faker.number.int({ min: 0, max: 50 }),
    disapprovedByGrade: faker.number.int({ min: 0, max: 50 }),
    disapprovedByGradeAndAbsence: faker.number.int({ min: 0, max: 50 }),
    disapprovedByMeanAbsence: faker.number.int({ min: 0, max: 50 }),
    excluded: faker.number.int({ min: 0, max: 50 }),
    locked: faker.number.int({ min: 0, max: 50 }),
    name: faker.person.fullName(),
    ...override,
  };
}

@Injectable()
export class SubjectPerformanceFactory {
  constructor(@InjectModel(SubjectPerformance.name) private subjectPerformanceModel: Model<SubjectPerformanceDocument>) {}

  async create(data: Partial<SubjectPerformance> = {}): Promise<SubjectPerformanceDocument> {
    const subjectPerformanceData = makeSubjectPerformance(data);

    const savedSubjectPerformance = new this.subjectPerformanceModel(subjectPerformanceData);
    await savedSubjectPerformance.save();

    return savedSubjectPerformance;
  }
}
