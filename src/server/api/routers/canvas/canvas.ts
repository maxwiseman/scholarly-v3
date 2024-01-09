import { z } from "zod";
import { getAssignments } from "./get-assignments";
import { getClasses } from "./get-classes";
import { getModules } from "./get-modules";
import { getAssignment } from "./get-assignment";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { getPage } from "./get-page";

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
  getAssignment: protectedProcedure
    .input(z.object({ classId: z.string(), assignmentId: z.string() }))
    .query(async ({ input }) => {
      return await getAssignment(input);
    }),
  getPage: protectedProcedure
    .input(z.object({ classId: z.string(), pageId: z.string() }))
    .query(async ({ input }) => {
      return await getPage(input);
    }),
});
