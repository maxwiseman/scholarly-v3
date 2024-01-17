import { eq } from "drizzle-orm";
import { getServerAuthSession } from "@/server/auth";
import { db } from "@/server/db";
import { users } from "@/server/db/schema";

export async function getClasses(): Promise<Course[]> {
  const session = await getServerAuthSession();
  const user = await db.query.users.findFirst({
    where: eq(users.id, session?.user.id || ""),
  });

  const data = await fetch(
    "https://knoxschools.instructure.com/api/v1/courses?enrollment_state=active",
    {
      headers: {
        Authorization: `Bearer ${user?.canvasApiKey}`,
      },
    },
  ).then((res) => res.json() as Promise<Course[]>);
  return data;
}

export interface Course {
  id: number;
  name: string;
  account_id: number;
  uuid: string;
  start_at: string | null;
  grading_standard_id: number | null;
  is_public: boolean | null;
  created_at: string;
  course_code: string;
  default_view: string;
  root_account_id: number;
  enrollment_term_id: number;
  license: string | null;
  grade_passback_setting: string | null;
  end_at: string | null;
  public_syllabus: boolean;
  public_syllabus_to_auth: boolean;
  storage_quota_mb: number;
  is_public_to_auth_users: boolean;
  homeroom_course: boolean;
  course_color: string | null;
  friendly_name: string | null;
  apply_assignment_group_weights: boolean;
  calendar: {
    ics: string;
  };
  time_zone: string;
  original_name: string;
  blueprint: boolean;
  template: boolean;
  enrollments: Array<{
    // Enrollment data structure, you can specify it here if needed
  }>;
  hide_final_grades: boolean;
  workflow_state: string;
  restrict_enrollments_to_course_dates: boolean;
}
