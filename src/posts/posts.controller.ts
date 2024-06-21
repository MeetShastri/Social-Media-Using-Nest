import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdatePostDto } from './dto/update-post.dto';

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

  @Get('getposts/:userid')
  async getPostsOfUser(@Res() res, @Param('userid') userid: string) {
    return this.postsService.getPostsOfUser(userid, res);
  }

  @Get('getpost/:postid')
  async getPost(@Res() res, @Param('postid') postid: string) {
    return this.postsService.getPost(postid, res);
  }

  @Patch('updatepost/:postid')
  async updatePost(
    @Req() req,
    @Res() res,
    @Param('postid') postid: string,
    @Body() updatePost: UpdatePostDto,
  ) {
    return this.postsService.updatePost(postid, updatePost, res, req);
  }

  @Get('deletepost/:postid')
  async deletePost(@Res() res, @Param('postid') postid: string) {
    return this.postsService.deletePost(postid, res);
  }

  @Get('search')
  async search(@Query('q') q: string, @Res() res) {
    return this.postsService.search(q, res);
  }
}
