import { and, eq } from "drizzle-orm";
import { getServerAuthSession } from "@/server/auth";
import { db } from "@/server/db";
import { classes, users } from "@/server/db/schema";

export async function getModules(
  classId: string,
): Promise<Module[] | undefined> {
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
    `https://knoxschools.instructure.com/api/v1/courses/${classData?.canvasId}/modules?include=items?per_page=50`,
    {
      headers: {
        Authorization: `Bearer ${user?.canvasApiKey}`,
      },
    },
  ).then((res) => res.json() as Promise<Module[] | undefined>);
  return data;
}
interface Module {
  id: number;
  name: string;
  position: number;
  unlock_at: string | null;
  require_sequential_progress: boolean;
  publish_final_grade: boolean;
  prerequisite_module_ids: number[];
  state: string;
  completed_at: string;
  items_count: number;
  items_url: string;
  items?: Item[];
}
interface Item {
  id: number;
  title: string;
  position: number;
  indent: number;
  quiz_lti: boolean;
  type: string;
  module_id: number;
  html_url: string;
  external_url: string;
  new_tab: boolean;
  content_id?: number;
  url?: string;
}
