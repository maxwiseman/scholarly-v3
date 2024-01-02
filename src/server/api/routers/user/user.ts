import { z } from "zod";
import { updateSettings } from "./settings";
import { addClasses } from "./classes";
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
          name: z.string().optional(),
          teachers: z.array(z.string()).optional(),
          gradeAverage: z.number().optional(),
          aspenId: z.string().optional(),
          canvasId: z.string().optional(),
        }),
      ),
    )
    .mutation(async ({ input }) => {
      await addClasses(input);
    }),
});
