import { z } from 'zod';
import { Configuration, OpenAIApi } from 'openai';
import type { Messages } from '@prisma/client';

import { env } from 'env.mjs';

import { createTRPCRouter, protectedProcedure } from '../trpc';

const configuration = new Configuration({
  apiKey: env.CHATGPT3_API_KEY,
});

const openai = new OpenAIApi(configuration);

export const chat = createTRPCRouter({
  getMessages: protectedProcedure.query(async ({ input, ctx }) => {
    const { id } = ctx.session.user;

    const messages = await ctx.prisma.messages.findMany({
      where: {
        chat: {
          userId: id,
        },
      },
    });

    return {
      status: 201,
      result: {
        messages: messages,
      },
    };
  }),

  chatWithBot: protectedProcedure
    .input(
      z.object({
        message: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { message } = input;
      const { id } = ctx.session.user;

      const messages = await ctx.prisma.messages.findMany({
        where: {
          chat: {
            userId: id,
          },
        },
      });

      const previousChatContext = messages.reduce((acc, message) => {
        if (message.isBot) {
          return acc + `Friend: ${message.message}\n`;
        }

        return acc + `You: ${message.message}\n`;
      }, '');

      const prompt = `${previousChatContext}You: ${message}\nFriend: `;

      const response = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt,
        temperature: 0.5,
        max_tokens: 60,
        top_p: 1.0,
        frequency_penalty: 0.5,
        presence_penalty: 0.0,
        stop: ['You:'],
      });

      await ctx.prisma.chat.update({
        where: {
          id: messages?.[0]?.chatId,
        },
        data: {
          messages: {
            create: [
              {
                message,
                isBot: false,
              },
              {
                message: response?.data?.choices?.[0]?.text as string,
                isBot: true,
              },
            ],
          },
        },
      });

      return {
        status: 201,
        message: 'Message sent successfully',
        result: response?.data?.choices?.[0]?.text,
      };
    }),
});
