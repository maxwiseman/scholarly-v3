import { getClasses } from "./get-classes";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const canvasRouter = createTRPCRouter({
  getClasses: protectedProcedure.query(async () => {
    return await getClasses();
  }),
});
