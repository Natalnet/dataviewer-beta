import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class StudentParticipation {
  @Prop()
  matricula: string;

  @Prop()
  pres1: string;

  @Prop()
  ativs1: string;

  @Prop()
  pres2: string;

  @Prop()
  ativs2: string;

  @Prop()
  pres3: string;

  @Prop()
  ativs3: string;
}

export type StudentParticipationDocument =
  HydratedDocument<StudentParticipation>;

export const StudentParticipationSchema =
  SchemaFactory.createForClass(StudentParticipation);
