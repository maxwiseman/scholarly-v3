import { and, eq } from "drizzle-orm";
import { getServerAuthSession } from "@/server/auth";
import { db } from "@/server/db";
import { classes, users } from "@/server/db/schema";

export async function createQuizSubmission({
  classId,
  quizId,
  accessCode,
}: {
  classId: string;
  quizId: string;
  accessCode?: string;
}): Promise<QuizSubmission> {
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
    `https://knoxschools.instructure.com/api/v1/courses/${classData?.canvasId}/quizzes/${quizId}/submissions?access_code=${accessCode}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user?.canvasApiKey}`,
      },
    },
  ).then((res) => res.json() as Promise<QuizSubmission>);
  return data;
}
export interface QuizSubmission {
  id: number;
  quiz_id: number;
  user_id: number;
  submission_id: number;
  started_at: string;
  finished_at: string;
  end_at: string;
  attempt: number;
  extra_attempts: number;
  extra_time: number;
  manually_unlocked: boolean;
  time_spent: number;
  score: number;
  score_before_regrade: number;
  kept_score: number;
  fudge_points: number;
  has_seen_results: boolean;
  workflow_state: string;
  overdue_and_needs_submission: boolean;
}
