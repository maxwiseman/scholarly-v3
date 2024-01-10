import { and, eq } from "drizzle-orm";
import { getServerAuthSession } from "@/server/auth";
import { db } from "@/server/db";
import { classes, users } from "@/server/db/schema";

export async function getQuiz({
  classId,
  quizId,
}: {
  classId: string;
  quizId: string;
}): Promise<Quiz> {
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
    `https://knoxschools.instructure.com/api/v1/courses/${classData?.canvasId}/quizzes/${quizId}`,
    {
      headers: {
        Authorization: `Bearer ${user?.canvasApiKey}`,
      },
    },
  ).then((res) => res.json() as Promise<Quiz>);
  return data;
}
export interface Quiz {
  id: number;
  title: string;
  html_url: string;
  mobile_url: string;
  description: string;
  quiz_type: string;
  time_limit: number;
  timer_autosubmit_disabled: boolean;
  shuffle_answers: boolean;
  show_correct_answers: boolean;
  scoring_policy: string;
  allowed_attempts: number;
  one_question_at_a_time: boolean;
  question_count: number;
  points_possible: number;
  cant_go_back: boolean;
  ip_filter: unknown;
  due_at: string;
  lock_at: string;
  unlock_at: string;
  published: boolean;
  locked_for_user: boolean;
  lock_info: {
    lock_at: string;
    can_view: boolean;
    asset_string: string;
  };
  lock_explanation: string;
  hide_results: string;
  show_correct_answers_at: unknown;
  hide_correct_answers_at: unknown;
  can_update: boolean;
  require_lockdown_browser: boolean;
  require_lockdown_browser_for_results: boolean;
  require_lockdown_browser_monitor: boolean;
  lockdown_browser_monitor_data: string;
  permissions: {
    manage: boolean;
    read: boolean;
    create: boolean;
    update: boolean;
    submit: boolean;
    preview: boolean;
    delete: boolean;
    read_statistics: boolean;
    grade: boolean;
    review_grades: boolean;
    view_answer_audits: boolean;
  };
  quiz_reports_url: string;
  quiz_statistics_url: string;
  important_dates: boolean;
  quiz_submission_versions_html_url: string;
  assignment_id: number;
  one_time_results: boolean;
  assignment_group_id: number;
  show_correct_answers_last_attempt: boolean;
  version_number: number;
  has_access_code: boolean;
  post_to_sis: boolean;
  migration_id: string;
  in_paced_course: boolean;
  question_types: string[];
}
