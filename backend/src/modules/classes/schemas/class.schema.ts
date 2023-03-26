import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<TClass>;


@Schema()
export class TClass { // Vou utilizar TClass para não confundir com a palavra reservada class 
  @Prop() 
  id: string;

  @Prop() 
  name: string; 

  @Prop() 
  year: Number; 

  @Prop() 
  semester: Number; 

  @Prop() 
  description: string; 
}

export const ClassSchema = SchemaFactory.createForClass(TClass);
