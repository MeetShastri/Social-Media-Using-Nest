import { IsOptional, IsString } from 'class-validator';

export class updateProfilePicDto {
  @IsOptional()
  imagePath?: string;
  @IsString()
  @IsOptional()
  imageName?: string;
}
