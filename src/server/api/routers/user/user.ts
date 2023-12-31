import { z } from "zod";
import { updateSettings } from "./settings";
import { addClasses } from "./classes";
import { getAssignments } from "./get-assignments";
import { getClasses } from "./get-classes";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const userRouter = createTRPCRouter({
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
  addClasses: protectedProcedure
    .input(
      z.array(
        z.object({
          id: z.string(),
          gradeCategories: z.array(
            z.object({
              name: z.string(),
              weight: z.number(),
              value: z.number(),
            }),
          ),
          name: z.string(),
          teachers: z.array(z.string()),
          teacherEmail: z.string(),
          gradeAverage: z.number(),
          aspenId: z.string(),
          canvasId: z.string(),
          schedule: z.string(),
          term: z.string(),
        }),
      ),
    )
    .mutation(async ({ input }) => {
      await addClasses(input);
    }),
  getAssignments: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      return await getAssignments(input.id);
    }),
  getClasses: protectedProcedure.query(async () => {
    return await getClasses();
  }),
});
