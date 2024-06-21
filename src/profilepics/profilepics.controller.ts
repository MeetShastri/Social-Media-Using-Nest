import {
  Body,
  Controller,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ProfilepicsService } from './profilepics.service';
import { CreateProfilePicDto } from './dto/create-profilepic.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('profilepics')
export class ProfilepicsController {
  constructor(private readonly profilepicsService: ProfilepicsService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('imagePath'))
  uploadProfilePic(
    @Body() createProfilePic: CreateProfilePicDto,
    @Res() res,
    @UploadedFile() file,
  ) {
    return this.profilepicsService.uploadProfilePic(
      createProfilePic,
      res,
      file,
    );
  }
}
