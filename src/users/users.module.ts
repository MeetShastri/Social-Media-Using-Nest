import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schema/user.schema';
import { OtpService } from 'src/otp/otp.service';
import { EmailService } from 'src/email/email.service';
import { ProfilePicSchema } from 'src/profilepics/schema/profilepic.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'ProfilePic', schema: ProfilePicSchema },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService, OtpService, EmailService],
  // exports: [MongooseModule, UsersService],
})
export class UsersModule {}
