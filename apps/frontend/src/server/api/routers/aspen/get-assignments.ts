import { and, eq, sql } from "drizzle-orm";
import { v4 as uuid } from "uuid";
import { getServerAuthSession } from "@/server/auth";
import { db } from "@/server/db";
import { aspenAssignments, classes, users } from "@/server/db/schema";
import { env } from "@/env";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type -- We have a good type inference
export async function getAssignments(id: string) {
  const session = await getServerAuthSession();
  const aspenIdData = await db.query.classes.findFirst({
    where: and(eq(classes.id, id), eq(classes.userId, session?.user.id || "")),
  });
  if (!aspenIdData?.aspenId) return [];
  const aspenCredentials = await db.query.users.findFirst({
    where: eq(users.id, session?.user.id || ""),
  });
  const aspenId = aspenIdData.aspenId || "";

  const data = await fetch(`${env.BACKEND_URL}/get-assignments?id=${aspenId}`, {
    headers: {
      Authorization: `Basic ${btoa(
        `${aspenCredentials?.aspenUsername}:${aspenCredentials?.aspenPassword}`,
      )}`,
    },
  }).then((res) => res.json() as Promise<AspenAssignment[]>);

  await db
    .insert(aspenAssignments)
    .values(
      data.map((assignment) => {
        return {
          ...assignment,
          id: uuid(),
          userId: session?.user.id || "",
          classId: id,
          dateAssigned: new Date(Date.parse(assignment.dateAssigned)),
          dateDue: new Date(Date.parse(assignment.dateDue)),
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

  return data.map((assignment: AspenAssignment) => {
    return {
      ...assignment,
      dateAssigned: new Date(Date.parse(assignment.dateAssigned)),
      dateDue: new Date(Date.parse(assignment.dateDue)),
    };
  });
}

export interface AspenAssignment {
  name: string;
  category: string;
  pointsPossible: number;
  dateAssigned: string;
  dateDue: string;
  extraCredit: boolean;
  points: string | number;
  feedback: string;
}
