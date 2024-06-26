import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PostSchema } from './schema/post.schema';
import { UserSchema } from 'src/users/schema/user.schema';
import { UsersController } from 'src/users/users.controller';
import { UsersService } from 'src/users/users.service';
import { OtpService } from 'src/otp/otp.service';
import { EmailService } from 'src/email/email.service';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { CommentSchema } from 'src/comments/schema/comment.schema';
import { ProfilepicsService } from 'src/profilepics/profilepics.service';
import { ProfilepicsController } from 'src/profilepics/profilepics.controller';
import { ProfilepicsModule } from 'src/profilepics/profilepics.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Post', schema: PostSchema },
      { name: 'User', schema: UserSchema },
      { name: 'Comment', schema: CommentSchema },
    ]),
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const suffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          callback(null, `${suffix}-${file.originalname}`);
        },
      }),
    }),
    ProfilepicsModule,
  ],
  controllers: [PostsController, UsersController, ProfilepicsController],
  providers: [
    PostsService,
    UsersService,
    OtpService,
    EmailService,
    ProfilepicsService,
  ],
  // exports: [MongooseModule, PostsService],
})
export class PostsModule {}
