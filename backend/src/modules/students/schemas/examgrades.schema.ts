import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";


@Schema()
export class ExamGrades {
  @Prop()
  matricula: string;

  @Prop()
  nota1: string;

  @Prop()
  comentario1: string; 

  @Prop()
  nota2: string;

  @Prop()
  comentario2: string; 

  @Prop()
  nota3: string;

  @Prop()
  comentario3: string; 

}

export type ExamGradesDocument = HydratedDocument<ExamGrades> 

export const ExamGradesSchema = SchemaFactory.createForClass(ExamGrades)