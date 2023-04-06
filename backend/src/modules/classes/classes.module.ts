import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClassesController } from './classes.controller';
import { ClassesService } from './classes.service';
import { ClassSchema, TClass } from './schemas/class.schema';
import { ClassDifficulty, ClassDifficultySchema } from './schemas/classdifficulty.schema';
import { ClassList, ClassListSchema } from './schemas/classlist.schema';
import { ClassStudents, ClassStudentsSchema } from './schemas/classstudents.schema';
import { ListSubjectClass, ListSubjectClassSchema } from './schemas/listsubjectclass.schema';
import { Student, StudentSchema } from './schemas/student.schema';
import { TeacherClass, TeacherClassSchema } from './schemas/teacherclass.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TClass.name, schema: ClassSchema },
      { name: TeacherClass.name, schema: TeacherClassSchema },
      { name: ListSubjectClass.name, schema: ListSubjectClassSchema }, 
      { name: ClassList.name, schema: ClassListSchema},
      { name: ClassDifficulty.name, schema: ClassDifficultySchema},   
      { name: ClassStudents.name, schema: ClassStudentsSchema},  
      { name: Student.name, schema: StudentSchema}, 
    ]),
  ],
  controllers: [ClassesController],
  providers: [ClassesService], 
})
export class ClassesModule {}
