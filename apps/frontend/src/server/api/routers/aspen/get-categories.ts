import { and, eq } from "drizzle-orm";
import { getServerAuthSession } from "@/server/auth";
import { db } from "@/server/db";
import { classes, users } from "@/server/db/schema";
import { env } from "@/env";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type -- We have good type inference
export async function getCategories(id: string) {
  const session = await getServerAuthSession();
  const aspenIdData = await db.query.classes.findFirst({
    where: and(eq(classes.id, id), eq(classes.userId, session?.user.id || "")),
  });
  const aspenCredentials = await db.query.users.findFirst({
    where: eq(users.id, session?.user.id || ""),
  });
  const aspenId = aspenIdData?.aspenId;
  const data = await fetch(`${env.BACKEND_URL}/get-categories?id=${aspenId}`, {
    headers: {
      Authorization: `Basic ${btoa(
        `${aspenCredentials?.aspenUsername}:${aspenCredentials?.aspenPassword}`,
      )}`,
    },
  }).then((res) => res.json() as Promise<AspenCategories>);

  await db
    .update(classes)
    .set({
      gradeCategories: data.categories,
      gradeAverage: data.average,
    })
    .where(eq(classes.id, id));

  return data;
}

export interface AspenCategories {
  average: number;
  categories: {
    accurate?: boolean;
    name: string;
    weight: number;
    value: number;
  }[];
}
