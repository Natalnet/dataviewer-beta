import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';


export type ListSubjectClassDocument = HydratedDocument<ListSubjectClass>;

class ListSubjet {  
  subject: string;   
  qt_acertos: number;   
  qt_erros: number;   
  qt_nao_fez: number; 

}

@Schema()
export class ListSubjectClass { 
  @Prop() 
  class_id: string; 

  @Prop()
  tags: ListSubjet[]; 

}

export const ListSubjectClassSchema = SchemaFactory.createForClass(ListSubjectClass); 

