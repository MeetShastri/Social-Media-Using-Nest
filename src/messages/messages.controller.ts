import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post('sendmessage')
  createMessage(@Body() createMessage: CreateMessageDto, @Res() res) {
    return this.messagesService.createMessage(createMessage, res);
  }

  @Get('getmessages/:senderid/:receiverid')
  getMessages(
    @Param('senderid') senderid: string,
    @Param('receiverid') receiverid: string,
    @Res() res,
  ) {
    return this.messagesService.getMessages(senderid, receiverid, res);
  }

  @Patch('updatemessage/:id')
  updateMessage(
    @Param('id') id: string,
    @Body() updateMessageDto: UpdateMessageDto,
  ) {
    return this.messagesService.updateMessage(id, updateMessageDto);
  }

  @Delete('deletemessage/:id')
  deleteMessage(@Param('id') id: string, @Res() res) {
    return this.messagesService.deleteMessage(id, res);
  }
}
