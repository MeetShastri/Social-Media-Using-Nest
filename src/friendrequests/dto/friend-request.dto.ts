import { IsNotEmpty } from 'class-validator';
import { Status } from '../status.enum';
import { Types } from 'mongoose';

export class SendFriendRequestDto {
  @IsNotEmpty({ message: 'Recievers ID should not be empty' })
  readonly recipientId: Types.ObjectId;

  @IsNotEmpty({ message: 'Sender ID should not be empty' })
  readonly senderId: Types.ObjectId;

  readonly status: Status;
}
