import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type SubjectPerformanceDocument = HydratedDocument<SubjectPerformance>

@Schema() 
export class SubjectPerformance {
  @Prop()
  semester: string;

  @Prop()
  approved: number;

  @Prop()
  approvedByGrade: number;

  @Prop()
  canceled: number;

  @Prop()
  Code:string;

  @Prop()
  disapproved: number;

  @Prop()
  disapprovedByAbsence: number;

  @Prop()
  disapprovedByGrade: number;

  @Prop()
  disapprovedByGradeAndAbsence: number;

  @Prop()
  disapprovedByMeanAbsence: number;

  @Prop()
  excluded: number;

  @Prop()
  locked: number;

  @Prop()
  name:string;
}

export const SubjectPerformanceSchema = SchemaFactory.createForClass(SubjectPerformance) 
