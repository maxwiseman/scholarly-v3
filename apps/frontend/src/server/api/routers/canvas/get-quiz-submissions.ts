import { and, eq } from "drizzle-orm";
import { type QuizSubmission } from "./create-quiz-submission";
import { getServerAuthSession } from "@/server/auth";
import { db } from "@/server/db";
import { classes, users } from "@/server/db/schema";

export async function getQuizSubmissions({
  classId,
  quizId,
}: {
  classId: string;
  quizId: string;
}): Promise<QuizSubmission[]> {
  const session = await getServerAuthSession();
  const user = await db.query.users.findFirst({
    where: eq(users.id, session?.user.id || ""),
  });
  const classData = await db.query.classes.findFirst({
    where: and(
      eq(classes.id, classId),
      eq(classes.userId, session?.user.id || ""),
    ),
  });

  const data = await fetch(
    `https://knoxschools.instructure.com/api/v1/courses/${classData?.canvasId}/quizzes/${quizId}/submissions`,
    {
      headers: {
        Authorization: `Bearer ${user?.canvasApiKey}`,
      },
    },
  ).then(
    (res) => res.json() as Promise<{ quiz_submissions: QuizSubmission[] }>,
  );
  return data.quiz_submissions;
}
