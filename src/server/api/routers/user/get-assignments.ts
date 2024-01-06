import { and, eq, sql } from "drizzle-orm";
import { v4 as uuid } from "uuid";
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
  console.log("Fetching from Aspen...");
  api.aspen.getAssignments
    .query({
      id: aspenIdData.aspenId,
    })
    .then(async (assignmentData) => {
      console.log("Data fetched successfully!");
      try {
        await db
          .insert(aspenAssignments)
          .values(
            assignmentData.map((assignment) => {
              return {
                ...assignment,
                id: uuid(),
                userId: session?.user.id || "",
                classId,
                dateAssigned: new Date(assignment.dateAssigned),
                dateDue: new Date(assignment.dateDue),
              };
            }),
          ) // Replace with your schema and new data
          .onConflictDoUpdate({
            target: aspenAssignments.name, // Replace with the unique identifier column of your assignments
            set: {
              category: sql`EXCLUDED.category`,
              classId: sql`EXCLUDED.classId`,
              dateAssigned: sql`EXCLUDED.dateAssigned`,
              dateDue: sql`EXCLUDED.dateDue`,
              extraCredit: sql`EXCLUDED.extraCredit`,
              feedback: sql`EXCLUDED.feedback`,
              name: sql`EXCLUDED.name`,
              points: sql`EXCLUDED.points`,
              pointsPossible: sql`EXCLUDED.pointsPossible`,
              userId: sql`EXCLUDED.userId`,
            }, // Replace with the new data you want to update
          })
          .execute();
      } catch (err) {
        throw new Error(JSON.stringify(err));
      }
    })
    .catch((err: Error) => {
      throw new Error("Couldn't fetch from Aspen", err);
    });

  return dbData;
}
