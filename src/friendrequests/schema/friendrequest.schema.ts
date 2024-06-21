import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Status } from '../status.enum';
import { Types } from 'mongoose';

@Schema({
  timestamps: true,
})
export class FriendRequest {
  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  senderId: Types.ObjectId;
  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  recipientId: Types.ObjectId;
  @Prop({ required: true, enum: Status, default: Status.pending })
  status: Status;
}

export const FriendRequestSchema = SchemaFactory.createForClass(FriendRequest);
