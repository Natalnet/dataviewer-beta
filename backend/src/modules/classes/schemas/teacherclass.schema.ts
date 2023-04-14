import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TeacherClassDocument = HydratedDocument<TeacherClass>;

@Schema()
export class TeacherClass {
  @Prop()
  email: string;

  @Prop()
  classes: [string];
}

export const TeacherClassSchema = SchemaFactory.createForClass(TeacherClass);
