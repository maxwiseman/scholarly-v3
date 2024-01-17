import { and, eq } from "drizzle-orm";
import { getServerAuthSession } from "@/server/auth";
import { db } from "@/server/db";
import { aspenAssignments } from "@/server/db/schema";

export async function getAssignments(classId: string): Promise<
  {
    id: string;
    name: string | null;
    category: string | null;
    userId: string | null;
    classId: string | null;
    pointsPossible: number | null;
    points: string | number | null;
    extraCredit: boolean | null;
    feedback: string | null;
    dateAssigned: Date | null;
    dateDue: Date | null;
  }[]
> {
  const session = await getServerAuthSession();
  const dbData = await db.query.aspenAssignments.findMany({
    where: and(
      eq(aspenAssignments.classId, classId),
      eq(aspenAssignments.userId, session?.user.id || ""),
    ),
  });

  return dbData;
}
