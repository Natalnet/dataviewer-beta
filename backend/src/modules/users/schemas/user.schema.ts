import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true, readOnly: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: false })
  emailConfirmed: boolean;

  @Prop({ required: true, readOnly: true })
  profile: string;

  @Prop({ required: false })
  avatar: string;

  @Prop({ required: false })
  registrationNumber: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
