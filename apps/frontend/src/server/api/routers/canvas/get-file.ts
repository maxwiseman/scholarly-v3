import { and, eq } from "drizzle-orm";
import { getServerAuthSession } from "@/server/auth";
import { db } from "@/server/db";
import { classes, users } from "@/server/db/schema";

export async function getFile({
  classId,
  fileId,
}: {
  classId: string;
  fileId: string;
}): Promise<File> {
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
    `https://knoxschools.instructure.com/api/v1/courses/${classData?.canvasId}/files/${fileId}`,
    {
      headers: {
        Authorization: `Bearer ${user?.canvasApiKey}`,
      },
    },
  ).then((res) => res.json() as Promise<File>);
  return data;
}

interface File {
  id: number;
  uuid: string;
  folder_id: number;
  display_name: string;
  filename: string;
  upload_status: string;
  "content-type": string;
  url: string;
  size: number;
  created_at: string;
  updated_at: string;
  unlock_at: string | null;
  locked: boolean;
  hidden: boolean;
  lock_at: string | null;
  hidden_for_user: boolean;
  thumbnail_url: string | null;
  modified_at: string;
  mime_class: string;
  media_entry_id: string | null;
  category: string;
  locked_for_user: boolean;
  visibility_level: string;
  canvadoc_session_url: string;
  crocodoc_session_url: string | null;
}
