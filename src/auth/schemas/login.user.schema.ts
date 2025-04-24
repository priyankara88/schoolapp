import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema()
export class LoginUser extends Document {
  @Prop({ required: true, type: mongoose.Types.ObjectId })
  userid: mongoose.Types.ObjectId;
  @Prop({ required: true })
  reffreshtoken: String;
  @Prop({ required: true })
  expiredate: Date;
}

export const LoginSchema = SchemaFactory.createForClass(LoginUser);
