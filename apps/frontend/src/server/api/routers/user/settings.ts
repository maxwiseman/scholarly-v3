import { eq } from "drizzle-orm";
import {
  type SQLiteColumn,
  type SQLiteTableWithColumns,
} from "drizzle-orm/sqlite-core";
import { type Course } from "../canvas/get-classes";
import { getServerAuthSession } from "@/server/auth";
import { db } from "@/server/db";
import { users } from "@/server/db/schema";
import { api } from "@/trpc/server";

db.update(users);

export type Settings = {
  [K in typeof users extends SQLiteTableWithColumns<infer U>
    ? keyof U["columns"]
    : never]: typeof users extends SQLiteTableWithColumns<infer T>
    ? T["columns"][K] extends SQLiteColumn<infer C>
      ? C["data"]
      : never
    : never;
};

export async function getSettings(): Promise<
  { [P in keyof Settings]?: Settings[P] | null } | undefined
> {
  const session = await getServerAuthSession();
  const settings = await db.query.users.findFirst({
    where: eq(users.id, session?.user.id || ""),
  });
  return settings;
}

export async function updateSettings(settings: Partial<Settings>): Promise<{
  canvasApiKey: boolean;
  aspenUsername: boolean;
  aspenPassword: boolean;
}> {
  const session = await getServerAuthSession();
  await db
    .update(users)
    .set(settings)
    .where(eq(users.id, session?.user.id || ""));
  const errors = {
    canvasApiKey: false,
    aspenUsername: false,
    aspenPassword: false,
  };
  if (settings.canvasApiKey) {
    const res = await fetch(
      "https://knoxschools.instructure.com/api/v1/courses?enrollment_state=active",
      {
        headers: {
          Authorization: `Bearer ${settings.canvasApiKey}`,
        },
      },
    ).then(
      (resData) =>
        resData.json() as Promise<
          Course[] | { errors: [{ message: "Invalid access token." }] }
        >,
    );
    if (!Array.isArray(res)) errors.canvasApiKey = true;
  }
  if (settings.aspenUsername || settings.aspenPassword) {
    // const aspenVerification = await api.aspen.verifyCredentials.query({
    //   username: settings.aspenUsername,
    //   password: settings.aspenPassword,
    // });
    // if (!aspenVerification.valid) {
    //   errors.aspenUsername = true;
    //   errors.aspenPassword = true;
    // }
  }
  return errors;
}
