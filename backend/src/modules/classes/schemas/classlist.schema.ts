import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';


export type ClassListDocument = HydratedDocument<ClassList>;

class List {  
  description: string;   
  qt_acertos: number;   
  qt_erros: number;   
  qt_nao_fez: number; 

}

@Schema()
export class ClassList { 
  @Prop() 
  class_id: string; 

  @Prop()
  lists: List[]; 

}

export const ClassListSchema = SchemaFactory.createForClass(ClassList); 

