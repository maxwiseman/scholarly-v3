import { eq } from "drizzle-orm";
import { getServerAuthSession } from "@/server/auth";
import { db } from "@/server/db";
import { classes } from "@/server/db/schema";

export interface CourseData {
  id: string;
  name: string | null;
  userId: string | null;
  teachers: string[] | null;
  gradeAverage: number | null;
  gradeCategories:
    | {
        name: string;
        weight: number;
        value: number;
      }[]
    | null;
  schedule: string | null;
  term: string | null;
  teacherEmail: string | null;
  aspenId: string | null;
  canvasId: string | null;
}

export async function getClasses(): Promise<CourseData[]> {
  const session = await getServerAuthSession();

  const data = await db.query.classes.findMany({
    where: eq(classes.userId, session?.user.id || ""),
  });
  return data;
}
