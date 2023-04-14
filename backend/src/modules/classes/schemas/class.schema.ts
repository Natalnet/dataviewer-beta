import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ClassDocument = HydratedDocument<TClass>;

@Schema()
export class TClass {
  // Vou utilizar TClass para não confundir com a palavra reservada class
  @Prop({ required: true })
  class_id: string;

  @Prop()
  name: string;

  @Prop()
  year: number;

  @Prop()
  semester: number;

  @Prop()
  description: string;
}

export const ClassSchema = SchemaFactory.createForClass(TClass);
