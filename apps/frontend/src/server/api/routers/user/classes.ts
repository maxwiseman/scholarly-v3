import {
  type SQLiteColumn,
  type SQLiteTableWithColumns,
} from "drizzle-orm/sqlite-core";
import { getServerAuthSession } from "@/server/auth";
import { db } from "@/server/db";
import { classes } from "@/server/db/schema";

export type ClassInfo = {
  [K in typeof classes extends SQLiteTableWithColumns<infer U>
    ? keyof U["columns"]
    : never]: typeof classes extends SQLiteTableWithColumns<infer T>
    ? T["columns"][K] extends SQLiteColumn<infer C>
      ? C["data"]
      : never
    : never;
};
export async function addClasses(
  input: Omit<ClassInfo, "userId">[],
): Promise<void> {
  const session = await getServerAuthSession();

  // eslint-disable-next-line @typescript-eslint/no-misused-promises -- This should be ok
  input.forEach(async (data) => {
    await db
      .insert(classes)
      .values({ ...data, userId: session?.user.id || "" });
  });
}
