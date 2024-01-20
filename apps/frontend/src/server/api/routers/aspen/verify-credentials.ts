import { eq } from "drizzle-orm";
import { env } from "@/env";
import { getServerAuthSession } from "@/server/auth";
import { db } from "@/server/db";
import { users } from "@/server/db/schema";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type -- We have a good type inference
export async function verifyCredentials(input?: {
  username?: string;
  password?: string;
}) {
  const session = await getServerAuthSession();
  const aspenCredentials = await db.query.users.findFirst({
    where: eq(users.id, session?.user.id || ""),
  });

  const data = await fetch(`${env.BACKEND_URL}/verify-credentials`, {
    headers: {
      Authorization: `Basic ${btoa(
        `${input?.username || aspenCredentials?.aspenUsername}:${input?.password || aspenCredentials?.aspenPassword}`,
      )}`,
    },
  }).then((res) => res.json() as Promise<{ valid: boolean }>);

  return data;
}
