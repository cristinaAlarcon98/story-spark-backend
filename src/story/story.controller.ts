import { Body, Controller, Post } from '@nestjs/common';
import { StoryService } from './story.service';
import { GenerateStoryDto } from './story.dto';

@Controller('generate')
export class StoryController {
  constructor(private readonly storyService: StoryService) {}

  @Post('text')
  async generateStory(@Body() generateStoryDto: GenerateStoryDto) {
    const { userText, storyType } = generateStoryDto;
    const generatedStoryResponse = await this.storyService.generateStory(
      userText,
      storyType,
    );
    return {
      story: generatedStoryResponse,
    };
  }

  @Post('image')
  async generateImage(@Body('userPrompt') userPrompt: string) {
    const generatedImageResponse =
      await this.storyService.generateImage(userPrompt);
    return {
      imageUrl: generatedImageResponse,
    };
  }
}
