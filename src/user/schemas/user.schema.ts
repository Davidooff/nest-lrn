import { ParseEnumPipe } from '@nestjs/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Length } from 'class-validator';
import { HydratedDocument } from 'mongoose';

export type CatDocument = HydratedDocument<User>;

export enum Roles {
  User,
  Moderator,
  Administrator,
}

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, type: String })
  login: string;

  @Prop({ required: true, type: String })
  password: string;

  @Prop({ required: true, type: Number, enum: Roles, default: Roles.User })
  role: Roles;

  @Prop({ required: false, type: String })
  refreshToken: string;

  @Prop({
    required: false,
    type: Array<{
      action: string;
      timestamp: number;
    }>,
  })
  log: Array<{
    action: String;
    timestamp: number;
  }>;
}

export const UserSchema = SchemaFactory.createForClass(User);
