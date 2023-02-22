import { Configuration, OpenAIApi } from 'openai';
import type { Messages } from '@prisma/client';

import { env } from 'env.mjs';

import { createTRPCRouter, protectedProcedure } from '../trpc';

// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment
const configuration = new Configuration({
  apiKey: env.CHATGPT3_API_KEY,
});
// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment
const openai = new OpenAIApi(configuration);

export const chat = createTRPCRouter({
  getMessages: protectedProcedure.query(async ({ input, ctx }) => {
    const { id } = ctx.session.user;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    const messages = (await ctx.prisma.messages.findMany({
      where: {
        chat: {
          userId: id,
        },
      },
    })) as Array<Messages>;

    return {
      status: 201,
      result: {
        messages: messages,
      },
    };
  }),

  //   const response = await openai.createCompletion({
  //     model: 'text-davinci-003',
  //     prompt:
  //       'You: What have you been up to?\nFriend: Watching old movies.\nYou: Did you watch anything interesting?\nFriend:',
  //     temperature: 0.5,
  //     max_tokens: 60,
  //     top_p: 1.0,
  //     frequency_penalty: 0.5,
  //     presence_penalty: 0.0,
  //     stop: ['You:'],
  //   });

  //   return {
  //     status: 201,
  //     message: 'Message sent successfully',
  //     // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
  //     result: response?.data?.choices?.[0]?.text,
  //   };
  // }),

  // chatWithBot: protectedProcedure
  //   .input(
  //     z.object({
  //       message: z.string(),
  //     }),
  //   )
  //   .mutation(async ({ input, ctx }) => {
  //     const { message } = input;

  //     // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment
  //     const response = await openai.createCompletion({
  //       model: 'text-davinci-003',
  //       prompt:
  //         'You: What have you been up to?\nFriend: Watching old movies.\nYou: Did you watch anything interesting?\nFriend:',
  //       temperature: 0.5,
  //       max_tokens: 60,
  //       top_p: 1.0,
  //       frequency_penalty: 0.5,
  //       presence_penalty: 0.0,
  //       stop: ['You:'],
  //     });

  //     return {
  //       status: 201,
  //       message: 'Message sent successfully',
  //       // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
  //       result: response?.data?.choices?.[0]?.text,
  //     };
  //   }),
});
