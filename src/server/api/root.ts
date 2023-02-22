import { createTRPCRouter } from './trpc';
import { auth } from './routers/auth';
import { user } from './routers/user';
import { chat } from './routers/chat';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  auth,
  user,
  chat,
});

// export type definition of API
export type AppRouter = typeof appRouter;
