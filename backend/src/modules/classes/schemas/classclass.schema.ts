import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ClassClassDocument = HydratedDocument<ClassClass>;

class ClassDate {
  date: string;
  classTitle: string;
}

@Schema()
export class ClassClass {
  @Prop()
  classCode: string;

  @Prop()
  classTitles: ClassDate[];
}

export const ClassClassSchema = SchemaFactory.createForClass(ClassClass);
