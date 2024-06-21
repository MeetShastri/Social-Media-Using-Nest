import { Module } from '@nestjs/common';
import { FriendrequestsController } from './friendrequests.controller';
import { FriendrequestsService } from './friendrequests.service';
import { FriendRequestSchema } from './schema/friendrequest.schema';
import { UserSchema } from 'src/users/schema/user.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'FriendRequest', schema: FriendRequestSchema },
      { name: 'User', schema: UserSchema },
    ]),
  ],
  controllers: [FriendrequestsController],
  providers: [FriendrequestsService],
})
export class FriendrequestsModule {}
