import { and, eq } from "drizzle-orm";
import { getServerAuthSession } from "@/server/auth";
import { db } from "@/server/db";
import { classes, users } from "@/server/db/schema";

export async function submitAssignment({
  type,
  classId,
  assignmentId,
  body,
}: {
  type:
    | "online_text_entry"
    | "online_url"
    | "online_upload"
    | "media_recording"
    | "basic_lti_launch"
    | "student_annotation";
  classId: string;
  assignmentId: string;
  body: string;
}): Promise<unknown> {
  const session = await getServerAuthSession();
  const user = await db.query.users.findFirst({
    where: eq(users.id, session?.user.id || ""),
  });

  let submissionType;
  if (type === "online_text_entry") {
    submissionType = "body";
  } else if (type === "online_url") {
    submissionType = "url";
  } else if (type === "online_upload") {
    submissionType = "file_ids";
  }

  const classData = await db.query.classes.findFirst({
    where: and(
      eq(classes.id, classId),
      eq(classes.userId, session?.user.id || ""),
    ),
  });

  const data = await fetch(
    `https://knoxschools.instructure.com/api/v1/courses/${classData?.canvasId}/assignments/${assignmentId}/submissions?submission[submission_type]=${type}&submission[${submissionType}]=${body}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user?.canvasApiKey}`,
      },
    },
  ).then((res) => res.json() as Promise<unknown>);
  return data;
}
