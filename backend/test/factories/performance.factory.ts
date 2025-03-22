import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Performance, PerformanceDocument } from 'src/modules/coordinator/schemas/performance.schema';

export function makePerformance(override: Partial<Performance> = {}) {
  return {
    year: faker.number.int({ min: 2000, max: 2030 }),
    semester: 1,
    performanceRate: parseFloat(faker.number.float({ min: 0, max: 100 }).toFixed(2)),
    ...override,
  };
}

@Injectable()
export class PerformanceFactory {
  constructor(@InjectModel(Performance.name) private performanceModel: Model<PerformanceDocument>) {}

  async create(data: Partial<Performance> = {}): Promise<PerformanceDocument> {
    const performanceData = makePerformance(data);

    const savedPerformance = new this.performanceModel(performanceData);
    await savedPerformance.save();

    return savedPerformance;
  }
}
