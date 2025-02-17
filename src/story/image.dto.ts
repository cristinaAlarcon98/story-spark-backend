import { IsNumber, IsString } from 'class-validator';

export class GenerateImgDTO {
  @IsString()
  userPrompt: string;

  @IsNumber()
  numImages: number;
}
