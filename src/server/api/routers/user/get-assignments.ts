import { and, eq } from "drizzle-orm";
import { db } from "@/server/db";
import { aspenAssignments, classes } from "@/server/db/schema";
import { api } from "@/trpc/server";
import { getServerAuthSession } from "@/server/auth";

export async function getAssignments(classId: string): Promise<
  {
    id: string;
    name: string | null;
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
  const aspenIdData = await db.query.classes.findFirst({
    where: and(
      eq(classes.id, classId),
      eq(classes.userId, session?.user.id || ""),
    ),
  });
  if (!aspenIdData?.aspenId) throw new Error("Aspen ID could not be loaded!");
  api.aspen.getAssignments
    .query({
      id: aspenIdData.aspenId,
    })
    .catch(() => {
      throw new Error("Couldn't fetch from Aspen");
    });

  return dbData;
}
