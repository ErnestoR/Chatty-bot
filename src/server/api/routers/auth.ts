import { z } from 'zod';
import { TRPCError } from '@trpc/server';

import { createTRPCRouter, publicProcedure, protectedProcedure } from '../trpc';

export const auth = createTRPCRouter({
  signup: publicProcedure
    .input(
      z.object({
        name: z.string(),
        password: z.string(),
        email: z.string().email(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { name, email, password } = input;

      const exists = await ctx.prisma.user.findFirst({
        where: { email },
      });

      if (exists) {
        throw new TRPCError({
          code: 'CONFLICT',
          message: 'User already exists.',
        });
      }

      const result = await ctx.prisma.user.create({
        data: { name, email, password },
      });

      return {
        status: 201,
        message: 'Account created successfully',
        result: result.email,
      };
    }),

  getSecretMessage: protectedProcedure.query(() => {
    return 'you can now see this secret message!';
  }),
});
