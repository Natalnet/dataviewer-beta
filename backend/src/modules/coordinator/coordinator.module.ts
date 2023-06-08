import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PerformanceSchema } from './schemas/performance.schema';
import { Performance } from './schemas/performance.schema';
import { CoordinatorController } from './coordinator.controller';
import { CoordinatorService } from './coordinator.service';
import { SubjectPerformance, SubjectPerformanceSchema } from './schemas/subjectperformance.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Performance.name, schema: PerformanceSchema },
      { name: SubjectPerformance.name, schema: SubjectPerformanceSchema },
    ]),
  ],
  controllers: [CoordinatorController],
  providers: [CoordinatorService],
  exports: [CoordinatorService],
})
export class CoordinatorModule {}
