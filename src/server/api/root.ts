import { aspenRouter } from "./routers/aspen/aspen";
import { createTRPCRouter } from "@/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  aspen: aspenRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
