import { z } from "zod";
import { getClasses } from "./get-classes";
import { getModules } from "./get-modules";
import { getAssignments } from "./get-assignments";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const canvasRouter = createTRPCRouter({
  getClasses: protectedProcedure.query(async () => {
    return await getClasses();
  }),
  getModules: protectedProcedure.input(z.string()).query(async ({ input }) => {
    return await getModules(input);
  }),
  getAssignments: protectedProcedure
    .input(z.string())
    .query(async ({ input }) => {
      return await getAssignments(input);
    }),
});
