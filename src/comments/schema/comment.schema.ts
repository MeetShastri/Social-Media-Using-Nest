import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({
  timestamps: true,
})
export class Comment {
  @Prop({ required: true })
  comment: string;

  @Prop({ required: true, type: Types.ObjectId, ref: 'User', index: false })
  commentBy: Types.ObjectId;

  @Prop({ required: true, type: Types.ObjectId, ref: 'Post', index: false })
  commentedOn: Types.ObjectId;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
