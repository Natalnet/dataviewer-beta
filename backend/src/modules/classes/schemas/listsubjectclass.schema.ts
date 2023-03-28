import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ListSubjectClassDocument = HydratedDocument<ListSubjectClass>;

@Schema()
export class ListSubjectClass { 
  @Prop() 
  fullName: string; 

  @Prop() 
  name: string; 

  @Prop() 
  acertos: string; 

  @Prop() 
  erros: string; 

  @Prop() 
  restantes: string; 

}

export const ListSubjectClassSchema = SchemaFactory.createForClass(ListSubjectClass); 

