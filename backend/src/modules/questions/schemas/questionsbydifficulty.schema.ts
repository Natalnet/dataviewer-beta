import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

@Schema()
export class QuestionsByDifficulty {
  @Prop()
  question_id: string;

  @Prop()
  percentage: number;
}

export type QuestionsByDifficultyDocument = 
  HydratedDocument<QuestionsByDifficulty>;

export const QuestionsByDifficultySchema = 
  SchemaFactory.createForClass(QuestionsByDifficulty);