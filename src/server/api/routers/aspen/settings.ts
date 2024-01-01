import { type ResultSet } from "@libsql/client";
import { eq } from "drizzle-orm";
import {
  type SQLiteColumn,
  type SQLiteTableWithColumns,
} from "drizzle-orm/sqlite-core";
import { users } from "@/server/db/schema";
import { db } from "@/server/db";
import { getServerAuthSession } from "@/server/auth";

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

export async function updateSettings(
  settings: Partial<Settings>,
): Promise<ResultSet> {
  const session = await getServerAuthSession();
  const updatedSettings = await db
    .update(users)
    .set(settings)
    .where(eq(users.id, session?.user.id || ""));
  return updatedSettings;
}
