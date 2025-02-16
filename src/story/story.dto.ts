import { IsString } from 'class-validator';

export class GenerateStoryDto {
  @IsString()
  userText: string;

  @IsString()
  storyType: string;
}
