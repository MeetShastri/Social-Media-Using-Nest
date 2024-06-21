import { IsString } from 'class-validator';

export class CreateProfilePicDto {
  imagePath: string;
  @IsString()
  imageName: string;
  user: string;
}
