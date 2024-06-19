import {
  Body,
  Controller,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Post('createpost')
  @UseInterceptors(FileInterceptor('imagePath'))
  async createPost(
    @UploadedFile() file,
    @Body(new ValidationPipe()) createPost: CreatePostDto,
    @Res() res,
  ) {
    return this.postsService.createPost(createPost, file, res);
  }
}
