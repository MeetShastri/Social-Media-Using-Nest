import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class ResetPasswordDto {
  @IsNotEmpty({ message: 'Old password is required' })
  @IsEmail()
  email: string;

  @IsNotEmpty({ message: 'New password is required' })
  @IsString()
  oldPassword: string;

  @IsNotEmpty({ message: 'Confirm password is required' })
  @IsString()
  newPassword: string;
}
