import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type StudentDocument = HydratedDocument<Student>;


@Schema()
export class Student {  
  @Prop( ) 
  id: string;

  @Prop() 
  name: string; 

  @Prop() 
  email: string; 

  @Prop() 
  percent: number; 

 
}

export const StudentSchema = SchemaFactory.createForClass(Student);
