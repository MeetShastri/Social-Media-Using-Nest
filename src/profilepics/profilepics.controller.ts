import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ProfilepicsService } from './profilepics.service';
import { CreateProfilePicDto } from './dto/create-profilepic.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { updateProfilePicDto } from './dto/update-profilepic.dto';

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

  @Patch('update/:id')
  async updateProfilePic(
    @Body() updateProfilePic: updateProfilePicDto,
    @Res() res,
    @Req() req,
    @Param('id') id: string,
  ) {
    return this.profilepicsService.updateProfilePic(
      updateProfilePic,
      res,
      req,
      id,
    );
  }

  @Get('getprofilepic/:id')
  async getProfilePic(@Res() res, @Param('id') id: string) {
    return this.profilepicsService.getProfilePic(res, id);
  }

  @Delete('deleteprofilepic/:id')
  async deleteProfilePic(@Res() res, @Param('id') id: string) {
    return this.profilepicsService.deleteProfilePic(res, id);
  }
}
