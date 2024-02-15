import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ExamGrades, ExamGradesSchema } from './schemas/examgrades.schema';
import {
  StudentListGrades,
  StudentListGradesSchema,
} from './schemas/studentlistgrades.schema';
import {
  StudentParticipation,
  StudentParticipationSchema,
} from './schemas/studentparticipation.schema';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';
import {
  StudentFrequency,
  StudentFrequencySchema,
} from './schemas/studentfrequency.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: StudentListGrades.name, schema: StudentListGradesSchema },
      { name: ExamGrades.name, schema: ExamGradesSchema },
      { name: StudentParticipation.name, schema: StudentParticipationSchema },
      { name: StudentFrequency.name, schema: StudentFrequencySchema },
    ]),
  ],
  controllers: [StudentsController],
  providers: [StudentsService],
})
export class StudentsModule {}
