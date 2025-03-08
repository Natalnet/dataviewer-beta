import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

class Counter {
  date: string;
  count: number;
}

@Schema()
export class SubmissionCount {
  @Prop()
  classCode: string;

  @Prop()
  counts: Counter[];
}

export type SubmissionCountDocument = HydratedDocument<SubmissionCount>;

export const SubmissionCountSchema =
  SchemaFactory.createForClass(SubmissionCount);