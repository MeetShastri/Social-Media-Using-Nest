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
  // @Prop({ type: [{ type: Types.ObjectId, ref: 'Comment' }] })  // Array of ObjectIds we cannot populate with it so if we want only object ids then we can use this
  // comment: Types.ObjectId[];

  @Prop({ type: [Types.ObjectId], ref: 'Comment' }) // Array of ObjectIds with reference we can use this when we want to populate.
  comment: Types.ObjectId[];
}

export const PostSchema = SchemaFactory.createForClass(Post);
