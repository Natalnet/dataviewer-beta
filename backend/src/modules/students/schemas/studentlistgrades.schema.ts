import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

class StudentList {
  description: string;
  percent: number;
}

@Schema()
export class StudentListGrades {
  @Prop()
  student_id: string;

  @Prop()
  reg_num: string;

  @Prop()
  meanU1: string;

  @Prop()
  meanU2: string;

  @Prop()
  meanU3: string;

  @Prop()
  lists: StudentList[];
}

export type StudentListGradesDocument = HydratedDocument<StudentListGrades>;

export const StudentListGradesSchema =
  SchemaFactory.createForClass(StudentListGrades);
