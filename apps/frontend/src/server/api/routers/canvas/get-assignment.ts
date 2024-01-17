import { and, eq } from "drizzle-orm";
import { getServerAuthSession } from "@/server/auth";
import { db } from "@/server/db";
import { classes, users } from "@/server/db/schema";

export async function getAssignment({
  classId,
  assignmentId,
}: {
  classId: string;
  assignmentId: string;
}): Promise<Assignment> {
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
    `https://knoxschools.instructure.com/api/v1/courses/${classData?.canvasId}/assignments/${assignmentId}`,
    {
      headers: {
        Authorization: `Bearer ${user?.canvasApiKey}`,
      },
    },
  ).then((res) => res.json() as Promise<Assignment>);
  return data;
}
export interface Assignment {
  id: number;
  description: string;
  due_at: string;
  unlock_at: string;
  lock_at: string;
  points_possible: number;
  grading_type: string;
  assignment_group_id: number;
  grading_standard_id: string;
  created_at: string;
  updated_at: string;
  peer_reviews: boolean;
  automatic_peer_reviews: boolean;
  position: number;
  grade_group_students_individually: boolean;
  anonymous_peer_reviews: boolean;
  group_category_id: string;
  post_to_sis: boolean;
  moderated_grading: boolean;
  omit_from_final_grade: boolean;
  intra_group_peer_reviews: boolean;
  anonymous_instructor_annotations: boolean;
  anonymous_grading: boolean;
  graders_anonymous_to_graders: boolean;
  grader_count: number;
  grader_comments_visible_to_graders: boolean;
  final_grader_id: string;
  grader_names_visible_to_final_grader: boolean;
  allowed_attempts: number;
  annotatable_attachment_id: string;
  hide_in_gradebook: boolean;
  secure_params: string;
  lti_context_id: string;
  course_id: number;
  name: string;
  submission_types: string[];
  has_submitted_submissions: boolean;
  due_date_required: boolean;
  max_name_length: number;
  in_closed_grading_period: boolean;
  graded_submissions_exist: boolean;
  is_quiz_assignment: boolean;
  can_duplicate: boolean;
  original_course_id: string;
  original_assignment_id: string;
  original_lti_resource_link_id: string;
  original_assignment_name: string;
  original_quiz_id: string;
  workflow_state: string;
  important_dates: boolean;
  is_quiz_lti_assignment: boolean;
  frozen_attributes: string[];
  external_tool_tag_attributes: {
    url: string;
    new_tab: string;
    resource_link_id: string;
    external_data: string;
    content_type: string;
    content_id: number;
    custom_params: string;
  };
  muted: boolean;
  html_url: string;
  url: string;
  published: boolean;
  only_visible_to_overrides: boolean;
  locked_for_user: boolean;
  submissions_download_url: string;
  post_manually: boolean;
  anonymize_students: boolean;
  require_lockdown_browser: boolean;
  restrict_quantitative_data: boolean;
}
