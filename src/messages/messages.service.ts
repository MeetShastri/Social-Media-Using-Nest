import { Injectable } from '@nestjs/common';
import { Message } from './schema/message.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/users/schema/user.schema';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel('Message') private readonly messageModel: Model<Message>,
    @InjectModel('User') private readonly userModel: Model<User>,
  ) {}

  async createMessage(createMessage: CreateMessageDto, res) {
    if (!createMessage.senderId || !createMessage.recipientId) {
      throw new Error('Sender or Recipient not found');
    }
    const sender = await this.userModel.findById(createMessage.senderId);
    const recipient = await this.userModel.findById(createMessage.recipientId);
    if (!sender || !recipient) {
      throw new Error('Sender or Recipient not found');
    }
    const message = await this.messageModel.create({
      senderId: createMessage.senderId,
      recipientId: createMessage.recipientId,
      content: createMessage.content,
    });
    return res
      .status(201)
      .json({ message: 'Message sent successfully', data: message });
  }

  async getMessages(senderId: string, recipientId: string, res): Promise<any> {
    const messages = await this.messageModel
      .find({
        $or: [
          { senderId: senderId, recipientId: recipientId },
          { senderId: recipientId, recipientId: senderId },
        ],
      })
      .populate('senderId', '-password -profilePic')
      .populate('recipientId', '-password -profilePic');
    return res
      .status(200)
      .json({ message: 'Messages fetched successfully', data: messages });
  }

  async updateMessage(id: string, updateMessageDto: UpdateMessageDto) {
    const updatedMessage = await this.messageModel
      .findByIdAndUpdate(id, updateMessageDto, { new: true })
      .populate('senderId', '-password -profilePic')
      .populate('recipientId', '-password -profilePic');
    if (!updatedMessage) {
      throw new Error('Message not found');
    }
    return updatedMessage;
  }

  async deleteMessage(id: string, res) {
    const deletedMessage = await this.messageModel.findByIdAndDelete(id);
    if (!deletedMessage) {
      throw new Error('Message not found');
    }
    return res
      .status(200)
      .json({ message: 'Message deleted successfully', data: deletedMessage });
  }
}
