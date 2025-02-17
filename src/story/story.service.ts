import { Injectable } from '@nestjs/common';
import { OpenAI } from 'openai';

const INSTRUCTIONS = `
You are a talented storyteller who creates engaging, creative, and kid-friendly stories. 
Your stories should be long, immersive, and always have a happy ending. 
Use vivid descriptions, friendly dialogue, and imaginative elements to captivate the reader.
`;

@Injectable()
export class StoryService {
  constructor(private readonly openai: OpenAI) {}

  async generateStory(userText: string, storyType: string) {
    try {
      const chatCompletion = await this.openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: [
              {
                type: 'text',
                text: INSTRUCTIONS,
              },
            ],
          },
          {
            role: 'user',
            content: `I want a story about: ${storyType}. Here is some additional input: "${userText}"`,
          },
        ],
        store: true,
      });
      const fullStory =
        chatCompletion.choices[0]?.message?.content ||
        "Sorry, I couldn't generate a story.";

      const wordsPerPage = 100;
      const storyPages = fullStory.split(' ').reduce((acc, word, index) => {
        const pageIndex = Math.floor(index / wordsPerPage);
        acc[pageIndex] = (acc[pageIndex] || '') + ' ' + word;
        return acc;
      }, [] as string[]);

      return storyPages;
    } catch (error) {
      console.error('Error generating story:', error);
      throw new Error('Failed to generate story. Please try again later.');
    }
  }

  async generateImage(userPrompt: string) {
    try {
      const response = await this.openai.images.generate({
        model: 'dall-e-3',
        prompt: `A vibrant, child-friendly illustration based on this story: ${userPrompt}`,
        n: 1,
        size: '1024x1024',
      });
      return response.data[0]?.url || null;
    } catch (error) {
      console.error('Error generating image:', error);
      throw new Error('Failed to generate image. Please try again later.');
    }
  }
}
