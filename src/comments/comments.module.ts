import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PostSchema } from 'src/posts/schema/post.schema';
import { UserSchema } from 'src/users/schema/user.schema';
import { CommentSchema } from './schema/comment.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Comment', schema: CommentSchema },
      { name: 'User', schema: UserSchema },
      { name: 'Post', schema: PostSchema },
    ]),
  ],
  controllers: [CommentsController],
  providers: [CommentsService],
  // exports: [MongooseModule, CommentsService],
})
export class CommentsModule {}
