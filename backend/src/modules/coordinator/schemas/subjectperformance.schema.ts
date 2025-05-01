import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Semester } from 'src/types/semester';

export type SubjectPerformanceDocument = HydratedDocument<SubjectPerformance>

@Schema({ _id: false })
export class PerformanceStats {
  @Prop()
  approved: number;
  
  @Prop()
  approvedByGrade: number;

  @Prop()
  canceled: number;

  @Prop()
  disapproved: number;

  @Prop()
  disapprovedByAbsence: number;

  @Prop()
  disapprovedByGrade: number;

  @Prop()
  disapprovedByGradeAndEssense: number;

  @Prop()
  disapprovedByMeanAbsence: number;

  @Prop()
  excluded: number;

  @Prop()
  locked: number;
}

@Schema()
export class SubjectPerformance extends Document{
  @Prop()
  semester: string;

  @Prop()
  code: string;

  @Prop()
  name: string;

  @Prop({ type: () => PerformanceStats })
  stats: PerformanceStats;
}

export const SubjectPerformanceSchema = SchemaFactory.createForClass(SubjectPerformance);
