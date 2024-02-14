import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class StudentFrequency {
  @Prop()
  regNum: string;

  @Prop()
  classFreqs: string[];
}

export type StudentFrequencyDocument = HydratedDocument<StudentFrequency>;

export const StudentFrequencySchema =
  SchemaFactory.createForClass(StudentFrequency);
