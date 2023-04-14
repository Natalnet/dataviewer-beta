import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ClassDifficultyDocument = HydratedDocument<ClassDifficulty>;

class Difficulty {
  level: string;
  qt_acertos: number;
  qt_erros: number;
  qt_nao_fez: number;
}

@Schema()
export class ClassDifficulty {
  @Prop()
  class_id: string;

  @Prop()
  difficulty: Difficulty[];
}

export const ClassDifficultySchema =
  SchemaFactory.createForClass(ClassDifficulty);
