import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
  ValidationPipe,
} from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentsService } from './comments.service';
import { UpdateMessageDto } from './dto/update-message.dto';

@Controller('comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @Post('createcomment')
  createComment(
    @Body(new ValidationPipe()) createComment: CreateCommentDto,
    @Res() res,
  ) {
    return this.commentsService.createComment(createComment, res);
  }

  @Get('getcomments/:postid')
  getComments(@Res() res, @Param('postid') postid: string) {
    return this.commentsService.getComments(postid, res);
  }

  @Patch('updatecomment/:commentid')
  updateComment(
    @Res() res,
    @Body() updateMessage: UpdateMessageDto,
    @Param('commentid')
    commentid: string,
  ) {
    return this.commentsService.updateComment(commentid, res, updateMessage);
  }

  @Delete('deletecomment/:commentid')
  deleteComment(@Res() res, @Param('commentid') commentid: string) {
    return this.commentsService.deleteComment(commentid, res);
  }
}
