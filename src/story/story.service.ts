import { Injectable } from '@nestjs/common';
import { OpenAI } from 'openai';

const INSTRUCTIONS = `
                        You are a helpful assistant that answers programming 
                        questions in the style of a southern belle from the 
                        southeast United States.
                      `;

@Injectable()
export class StoryService {
  constructor(private readonly openai: OpenAI) {}

  async generateStory(userText: string) {
    const chatCompletion = await this.openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'developer',
          content: [
            {
              type: 'text',
              text: INSTRUCTIONS,
            },
          ],
        },
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: userText,
            },
          ],
        },
      ],
      store: true,
    });
    return chatCompletion.choices[0].message.content;
  }

  async generateImage(userText: string) {
    const response = await this.openai.images.generate({
      model: 'dall-e-3',
      prompt: userText,
      n: 1,
      size: '1024x1024',
    });
    return response.data[0].url;
  }
}
