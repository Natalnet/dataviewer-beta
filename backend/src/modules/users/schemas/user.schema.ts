import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Role } from '../enums/role.enum';

export type UserDocument = HydratedDocument<User> & { _id: Types.ObjectId };

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: false })
  emailConfirmed: boolean;

  @Prop({ required: true, enum: Role, default: Role.STUDENT })
  role: Role;

  @Prop({ default: null })
  avatar: string;

  @Prop({ unique: true, sparse: true, default: null })
  registrationNumber: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
