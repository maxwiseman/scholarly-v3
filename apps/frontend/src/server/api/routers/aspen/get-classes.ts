import { type AspenClass } from "@scholarly/backend/routes/get-classes";
import { eq } from "drizzle-orm";
import { getServerAuthSession } from "@/server/auth";
import { db } from "@/server/db";
import { users } from "@/server/db/schema";
import { env } from "@/env";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type -- We have a good type inference
export async function getClasses() {
  const session = await getServerAuthSession();
  const aspenCredentials = await db.query.users.findFirst({
    where: eq(users.id, session?.user.id || ""),
  });
  const data = await fetch(`${env.BACKEND_URL}/get-classes`, {
    headers: {
      Authorization: `Basic ${btoa(
        `${aspenCredentials?.aspenUsername}:${aspenCredentials?.aspenPassword}`,
      )}`,
    },
  }).then((res) => res.json() as Promise<AspenClass[]>);

  return data;
}
