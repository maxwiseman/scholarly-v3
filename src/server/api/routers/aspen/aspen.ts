import { z } from "zod";
import { getSettings } from "../user/settings";
import { getAssignments } from "./get-assignments";
import { getCategories } from "./get-categories";
import { getClasses } from "./get-classes";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const aspenRouter = createTRPCRouter({
  getAssignments: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      return await getAssignments(input.id);
    }),
  getCategories: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      return await getCategories(input.id);
    }),
  getClasses: protectedProcedure.query(async () => {
    return await getClasses();
  }),
  getSettings: protectedProcedure.query(async () => {
    return await getSettings();
  }),
});
