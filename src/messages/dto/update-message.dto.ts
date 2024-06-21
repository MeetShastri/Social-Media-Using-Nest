import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateMessageDto {
  @IsString()
  @IsNotEmpty({ message: 'Content should not be empty' })
  readonly content?: string;
}
