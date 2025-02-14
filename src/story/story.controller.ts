import { Body, Controller, Post } from '@nestjs/common';
import { StoryService } from './story.service';

@Controller('story')
export class StoryController {
  constructor(private readonly storyService: StoryService) {}

  @Post('generate')
  async generateStory(@Body('message') message: string) {
    const generatedStory = await this.storyService.generateStory(message);
    return { story: generatedStory };
  }
}
