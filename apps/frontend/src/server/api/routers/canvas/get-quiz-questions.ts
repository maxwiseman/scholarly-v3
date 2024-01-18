import { eq } from "drizzle-orm";
import { getServerAuthSession } from "@/server/auth";
import { db } from "@/server/db";
import { users } from "@/server/db/schema";

export async function getQuizQuestions({
  submissionId,
}: {
  submissionId: string;
}): Promise<QuizQuestion[]> {
  const session = await getServerAuthSession();
  const user = await db.query.users.findFirst({
    where: eq(users.id, session?.user.id || ""),
  });

  const data = await fetch(
    `https://knoxschools.instructure.com/api/v1/quiz_submissions/${submissionId}/questions?include=quiz_question`,
    {
      headers: {
        Authorization: `Bearer ${user?.canvasApiKey}`,
      },
    },
  ).then(
    (res) =>
      res.json() as Promise<{ quiz_submission_questions: QuizQuestion[] }>,
  );
  return data.quiz_submission_questions;
}

export interface QuizQuestion {
  id: number;
  flagged: boolean;
  answer: unknown;
  answers: unknown;
}
