import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({
  timestamps: true,
})
export class Post {
  @Prop({ required: true })
  text: string;
  @Prop({ required: true })
  imagePath: string;
  @Prop({ required: true, type: Types.ObjectId, ref: 'User', index: false })
  user: Types.ObjectId;
  @Prop({ default: 0 })
  likes: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);
