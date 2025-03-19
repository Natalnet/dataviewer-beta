import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type DifficultyQuestionsDocument = HydratedDocument<DifficultyQuestions>;

@Schema()
export class DifficultyQuestions {
  @Prop({ unique: true, required: true })
  question_id: string;

  @Prop({ type: Number, min: 0, max: 100 })
  percentage: number;
}

export const DifficultyQuestionsSchema = SchemaFactory.createForClass(DifficultyQuestions);
