import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

class Frequencies {
  [key: string]: any;
}

@Schema()
export class ClassFrequency {
  @Prop()
  classCode: string;

  @Prop()
  classFreqs: Frequencies;

  @Prop()
  studentNumber: number;
}

export type ClassFrequencyDocument = HydratedDocument<ClassFrequency>;

export const ClassFrequencySchema =
  SchemaFactory.createForClass(ClassFrequency);
