import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClassesController } from './classes.controller';
import { ClassesService } from './classes.service';
import { ClassSchema, TClass } from './schemas/class.schema';
import {
  ClassDifficulty,
  ClassDifficultySchema,
} from './schemas/classdifficulty.schema';
import { ClassList, ClassListSchema } from './schemas/classlist.schema';
import {
  ClassStudents,
  ClassStudentsSchema,
} from './schemas/classstudents.schema';
import {
  ListSubjectClass,
  ListSubjectClassSchema,
} from './schemas/listsubjectclass.schema';
import { Student, StudentSchema } from './schemas/student.schema';
import {
  TeacherClass,
  TeacherClassSchema,
} from './schemas/teacherclass.schema';
import {
  ExamGrades,
  ExamGradesSchema,
} from '../students/schemas/examgrades.schema';
import {
  StudentListGrades,
  StudentListGradesSchema,
} from '../students/schemas/studentlistgrades.schema';
import {
  StudentParticipation,
  StudentParticipationSchema,
} from '../students/schemas/studentparticipation.schema';
import { ClassClass, ClassClassSchema } from './schemas/classclass.schema';
import {
  ClassFrequency,
  ClassFrequencySchema,
} from './schemas/classfrequency.schema';
import { SubmissionCount, SubmissionCountSchema } from './schemas/submissioncount.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TClass.name, schema: ClassSchema },
      { name: TeacherClass.name, schema: TeacherClassSchema },
      { name: ListSubjectClass.name, schema: ListSubjectClassSchema },
      { name: ClassList.name, schema: ClassListSchema },
      { name: ClassDifficulty.name, schema: ClassDifficultySchema },
      { name: ClassStudents.name, schema: ClassStudentsSchema },
      { name: Student.name, schema: StudentSchema },
      { name: ExamGrades.name, schema: ExamGradesSchema },
      { name: StudentListGrades.name, schema: StudentListGradesSchema },
      { name: StudentParticipation.name, schema: StudentParticipationSchema },
      { name: ClassClass.name, schema: ClassClassSchema },
      { name: ClassFrequency.name, schema: ClassFrequencySchema },
      { name: SubmissionCount.name, schema: SubmissionCountSchema },
    ]),
  ],
  controllers: [ClassesController],
  providers: [ClassesService],
})
export class ClassesModule {}
