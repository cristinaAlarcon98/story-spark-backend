import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { StoryModule } from './story/story.module';

@Module({
  imports: [ConfigModule.forRoot(), StoryModule],
})
export class AppModule {}
