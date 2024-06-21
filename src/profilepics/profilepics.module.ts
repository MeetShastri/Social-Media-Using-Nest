import { Module } from '@nestjs/common';
import { ProfilepicsController } from './profilepics.controller';
import { ProfilepicsService } from './profilepics.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfilePicSchema } from './schema/profilepic.schema';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { UserSchema } from 'src/users/schema/user.schema';
import { UsersService } from 'src/users/users.service';
import { UsersController } from 'src/users/users.controller';
import { OtpService } from 'src/otp/otp.service';
import { EmailService } from 'src/email/email.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'ProfilePic', schema: ProfilePicSchema },
      { name: 'User', schema: UserSchema },
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
  controllers: [ProfilepicsController, UsersController],
  providers: [ProfilepicsService, UsersService, OtpService, EmailService],
  exports: [MongooseModule, ProfilepicsService],
})
export class ProfilepicsModule {}
