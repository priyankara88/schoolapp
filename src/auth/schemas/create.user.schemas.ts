import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Users extends Document {
  @Prop({ required: true })
  name: String;
  @Prop({ required: true })
  email: String;
  @Prop({ required: true })
  password: String;
}

export const UserSchema = SchemaFactory.createForClass(Users);
