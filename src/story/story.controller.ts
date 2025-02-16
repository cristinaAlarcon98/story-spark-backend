import { Body, Controller, Post } from '@nestjs/common';
import { StoryService } from './story.service';

@Controller('generate')
export class StoryController {
  constructor(private readonly storyService: StoryService) {}

  @Post('text')
  async generateStory(@Body('message') message: string) {
    const generatedStoryResponse =
      await this.storyService.generateStory(message);
    return {
      story: generatedStoryResponse,
    };
  }

  @Post('image')
  async generateImage(@Body('message') message: string) {
    const generatedImageResponse =
      await this.storyService.generateImage(message);
    return {
      imageUrl: generatedImageResponse,
    };
  }
}
