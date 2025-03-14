import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class DifficultyQuestions {
  @Prop()
  question_id: string;

  @Prop()
  percentage: number;
}

export type DifficultyQuestionsDocument =
  HydratedDocument<DifficultyQuestions>;

export const DifficultyQuestionsSchema = SchemaFactory.createForClass(
  DifficultyQuestions,
);
