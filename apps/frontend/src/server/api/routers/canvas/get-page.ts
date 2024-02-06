import { and, eq } from "drizzle-orm";
import { getServerAuthSession } from "@/server/auth";
import { db } from "@/server/db";
import { classes, users } from "@/server/db/schema";

export async function getPage({
  classId,
  pageId,
}: {
  classId: string;
  pageId: string;
}): Promise<Page> {
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
    `https://knoxschools.instructure.com/api/v1/courses/${classData?.canvasId}/pages/${pageId}`,
    {
      headers: {
        Authorization: `Bearer ${user?.canvasApiKey}`,
      },
    },
  ).then((res) => res.json() as Promise<Page>);
  return data;
}
export interface Page {
  title: string;
  created_at: string;
  url: string;
  editing_roles: string;
  page_id: number;
  last_edited_by: {
    id: number;
    anonymous_id: string;
    display_name: string;
    avatar_image_url: string;
    html_url: string;
    pronouns: string | null;
  };
  published: boolean;
  hide_from_students: boolean;
  front_page: boolean;
  html_url: string;
  todo_date: string | null;
  publish_at: string | null;
  updated_at: string;
  locked_for_user: boolean;
  body: string;
}
