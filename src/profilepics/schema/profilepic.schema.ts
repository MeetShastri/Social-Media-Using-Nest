import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({
  timestamps: true,
})
export class ProfilePic {
  @Prop({ required: true })
  imagePath: string;

  @Prop({ required: true })
  imageName: string;

  @Prop({ required: true, type: Types.ObjectId, ref: 'User', index: false })
  user: Types.ObjectId;
}

export const ProfilePicSchema = SchemaFactory.createForClass(ProfilePic);
