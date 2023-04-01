import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClassesController } from './classes.controller';
import { ClassesService } from './classes.service';
import { ClassSchema, TClass } from './schemas/class.schema';
import { ClassList, ClassListSchema } from './schemas/classlist.schema';
import { ListSubjectClass, ListSubjectClassSchema } from './schemas/listsubjectclass.schema';
import { TeacherClass, TeacherClassSchema } from './schemas/teacherclass.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TClass.name, schema: ClassSchema },
      { name: TeacherClass.name, schema: TeacherClassSchema },
      { name: ListSubjectClass.name, schema: ListSubjectClassSchema }, 
      { name: ClassList.name, schema: ClassListSchema},
    ]),
  ],
  controllers: [ClassesController],
  providers: [ClassesService], 
})
export class ClassesModule {}
