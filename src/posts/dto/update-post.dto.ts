import { IsOptional, IsString } from 'class-validator';

export class UpdatePostDto {
  @IsString()
  @IsOptional()
  text?: string;

  @IsString()
  @IsOptional()
  imagePath?: string;
}
