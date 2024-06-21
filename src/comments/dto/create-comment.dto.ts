import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  comment: string;

  @IsString()
  @IsNotEmpty()
  commentBy: string;

  @IsString()
  @IsNotEmpty()
  commentedOn: string;
}
