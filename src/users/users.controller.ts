import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Res,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('register')
  async createUser(
    @Body(new ValidationPipe()) createUser: CreateUserDto,
    @Res() res,
  ) {
    return this.usersService.createUser(createUser, res);
  }

  @Post('login')
  async loginUser(
    @Body(new ValidationPipe()) loginUser: LoginUserDto,
    @Res() res,
  ) {
    return this.usersService.loginUser(loginUser, res);
  }

  @Get('getuser/:id')
  async getUser(@Param('id') id: string, @Res() res) {
    return this.usersService.getUser(id, res);
  }

  @Patch('resetpassword/:id')
  async resetPassword(
    @Body(new ValidationPipe()) resetPassword: ResetPasswordDto,
    @Res() res,
  ) {
    return this.usersService.resetPassword(resetPassword, res);
  }

  @Get('search')
  async searchUsers(@Query('q') q: string, @Res() res) {
    return this.usersService.searchUsers(q, res);
  }
}
