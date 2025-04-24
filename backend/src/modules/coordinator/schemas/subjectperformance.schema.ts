import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Semester } from 'src/types/semester';

export type SubjectPerformanceDocument = HydratedDocument<SubjectPerformance>
@Schema({ _id: false })
export class PerformanceStats {
  @Prop()
  aproved: number;
  
  @Prop()
  aprovedByGrade: number;

  @Prop()
  canceled: number;

  @Prop()
  disaproved: number;

  @Prop()
  disaprovedByAbsence: number;

  @Prop()
  disaprovedByGrade: number;

  @Prop()
  disaprovedByGradeAndEssense: number;

  @Prop()
  disaprovedByMeanAbsence: number;

  @Prop()
  exclued: number;

  @Prop()
  locked: number;
}

export const PerformanceStatsSchema = SchemaFactory.createForClass(PerformanceStats);

@Schema()
export class SubjectPerformance extends Document{
  @Prop()
  semester: string;

  @Prop()
  code: string;

  @Prop()
  name: string;

  @Prop()
  stats: PerformanceStats;
}

export const SubjectPerformanceSchema = SchemaFactory.createForClass(SubjectPerformance);
