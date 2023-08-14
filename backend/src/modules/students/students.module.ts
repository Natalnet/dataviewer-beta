import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ExamGrades, ExamGradesSchema } from './schemas/examgrades.schema';
import { StudentListGrades, StudentListGradesSchema } from './schemas/studentlistgrades.schema';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';

@Module({
  imports: [ MongooseModule.forFeature([{name: StudentListGrades.name, schema: StudentListGradesSchema}, {name: ExamGrades.name, schema: ExamGradesSchema}])],
  controllers: [StudentsController],
  providers: [StudentsService]
})
export class StudentsModule {}
