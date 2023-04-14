import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type ClassStudentsDocument = HydratedDocument<ClassStudents>; 

@Schema()
export class ClassStudents {
  @Prop() 
  class_id: string; 

  @Prop()
  students: string[];

}

export const ClassStudentsSchema = SchemaFactory.createForClass(ClassStudents); 