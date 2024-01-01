import { z } from "zod";
import { getAssignments } from "./get-assignments";
import { getCategories } from "./get-categories";
import { getClasses } from "./get-classes";
import { getSettings, updateSettings } from "./settings";
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
  updateSettings: protectedProcedure
    .input(
      z.object({
        name: z.string().optional(),
        email: z.string().optional(),
        emailVerified: z.date().optional(),
        image: z.string().optional(),
        canvasApiKey: z.string().optional(),
        aspenUsername: z.string().optional(),
        aspenPassword: z.string().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      return await updateSettings(input);
    }),
});
