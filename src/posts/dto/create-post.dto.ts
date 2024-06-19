import { IsNotEmpty, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreatePostDto {
  @IsNotEmpty({ message: 'Text is required' })
  @IsString()
  text: string;

  imagePath: string;

  @IsNotEmpty({ message: 'User is required' })
  user: Types.ObjectId;

  @IsString()
  likes: string;
}
