import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SendFriendRequestDto } from './dto/friend-request.dto';
import { Model } from 'mongoose';
import { FriendRequest } from './schema/friendrequest.schema';
import { User } from 'src/users/schema/user.schema';
import { UpdateStatusDto } from './dto/update-status.dto';

@Injectable()
export class FriendrequestsService {
  constructor(
    @InjectModel('FriendRequest')
    private readonly friendRequestModel: Model<FriendRequest>,
    @InjectModel('User') private readonly userModel: Model<User>,
  ) {}

  async sendRequest(res, sendFriendRequestDto: SendFriendRequestDto) {
    const sender = await this.userModel.findById(sendFriendRequestDto.senderId);
    const recipient = await this.userModel.findById(
      sendFriendRequestDto.recipientId,
    );
    if (!sender || !recipient) {
      throw new Error('Sender or Recipient not found');
    }
    const friendRequest = await this.friendRequestModel.create({
      senderId: sendFriendRequestDto.senderId,
      recipientId: sendFriendRequestDto.recipientId,
    });
    return res.status(201).json({
      message: 'Friend request sent successfully',
      data: friendRequest,
    });
  }

  async acceptRequest(res, updateStatusDto: UpdateStatusDto) {
    const friendRequest = await this.friendRequestModel.findByIdAndUpdate(
      { _id: updateStatusDto.requestId },
      { status: 'accepted' },
      {
        new: true,
      },
    );
    if (!friendRequest) {
      throw new Error('Friend request not found');
    }
    return res.status(200).json({
      message: 'Friend request updated successfully',
      data: friendRequest,
    });
  }

  async declineRequest(res, updateStatusDto: UpdateStatusDto) {
    const friendRequest = await this.friendRequestModel.findByIdAndUpdate(
      { _id: updateStatusDto.requestId },
      { status: 'rejected' },
      {
        new: true,
      },
    );
    if (!friendRequest) {
      throw new Error('Friend request not found');
    }
    return res.status(200).json({
      message: 'Friend request updated successfully',
      data: friendRequest,
    });
  }
}
