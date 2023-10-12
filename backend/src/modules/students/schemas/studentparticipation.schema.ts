import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class StudentParticipation {
  @Prop()
  matricula: string;

  @Prop()
  presenca1: string;

  @Prop()
  atividade1: string;

  @Prop()
  presenca2: string;

  @Prop()
  atividade2: string;

  @Prop()
  presenca3: string;

  @Prop()
  atividade3: string;
}

export type StudentParticipationDocument =
  HydratedDocument<StudentParticipation>;

export const StudentParticipationSchema =
  SchemaFactory.createForClass(StudentParticipation);
