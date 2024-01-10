import { z } from "zod";
import { getAssignment } from "./get-assignment";
import { getAssignments } from "./get-assignments";
import { getClasses } from "./get-classes";
import { getModules } from "./get-modules";
import { getPage } from "./get-page";
import { getQuiz } from "./get-quiz";
import { createQuizSubmission } from "./create-quiz-submission";
import { getQuizSubmissions } from "./get-quiz-submissions";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { getQuizQuestions } from "./get-quiz-questions";

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
  getQuiz: protectedProcedure
    .input(z.object({ classId: z.string(), quizId: z.string() }))
    .query(async ({ input }) => {
      return await getQuiz(input);
    }),
  getQuizSubmissions: protectedProcedure
    .input(z.object({ classId: z.string(), quizId: z.string() }))
    .query(async ({ input }) => {
      return await getQuizSubmissions(input);
    }),
  getQuizQuestions: protectedProcedure
    .input(z.object({ submissionId: z.string() }))
    .query(async ({ input }) => {
      return await getQuizQuestions(input);
    }),
  createQuizSubmission: protectedProcedure
    .input(z.object({ classId: z.string(), quizId: z.string() }))
    .mutation(async ({ input }) => {
      return await createQuizSubmission(input);
    }),
});
