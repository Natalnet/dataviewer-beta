import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Semester } from 'src/types/semester';

export type PerformanceDocument = HydratedDocument<Performance>;

@Schema()
export class Performance {
  @Prop({ required: true })
  year: number;

  @Prop({ required: true })
  semester: Semester;

  @Prop({ required: true })
  performanceRate: number;
}

export const PerformanceSchema = SchemaFactory.createForClass(Performance);
