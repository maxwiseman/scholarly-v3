import { z } from "zod";
import { getAssignments } from "./get-assignments";
import { getCategories } from "./get-categories";
import { getClasses } from "./get-classes";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const aspenRouter = createTRPCRouter({
  getAssignments: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      return await getAssignments(input.id);
    }),
  getCategories: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      return await getCategories(input.id);
    }),
  getClasses: publicProcedure.query(async () => {
    return await getClasses();
  }),
});
