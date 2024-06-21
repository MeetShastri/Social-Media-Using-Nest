import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { ProfilepicsModule } from './profilepics/profilepics.module';
import { MessagesModule } from './messages/messages.module';
import { FriendrequestsModule } from './friendrequests/friendrequests.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URL),
    UsersModule,
    PostsModule,
    CommentsModule,
    ProfilepicsModule,
    MessagesModule,
    FriendrequestsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
