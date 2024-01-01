import { aspenRouter } from "./routers/aspen/aspen";
import { canvasRouter } from "./routers/canvas/canvas";
import { userRouter } from "./routers/user/user";
import { createTRPCRouter } from "@/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  aspen: aspenRouter,
  canvas: canvasRouter,
  user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
