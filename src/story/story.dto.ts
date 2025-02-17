import { IsString } from 'class-validator';

export class GenerateStoryDto {
  @IsString()
  userPrompt: string;

  @IsString()
  storyType: string;
}
