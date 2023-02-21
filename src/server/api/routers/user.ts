import { z } from 'zod';
import { TRPCError } from '@trpc/server';

import { createTRPCRouter, publicProcedure, protectedProcedure } from '../trpc';

export const user = createTRPCRouter({
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

  updateUserbyId: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        password: z.string(),
        email: z.string().email(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { id, name, email, password } = input;

      const user = await ctx.prisma.user.update({
        where: { id },
        data: {
          email,
          name,
          password,
        },
      });

      if (!user) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Unable to update user, please try again later',
        });
      }

      return {
        status: 201,
        message: 'User updated successfully',
      };
    }),

  getUserById: protectedProcedure
    .input(z.string())
    .query(async ({ input, ctx }) => {
      const user = await ctx.prisma.user.findUnique({
        where: { id: input },
      });

      if (!user) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'User not found',
        });
      }

      return {
        status: 201,
        message: 'User found',
        result: user,
      };
    }),
});
