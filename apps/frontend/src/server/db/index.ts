import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "./schema";
import { env } from "@/env";

export const db = drizzle(
  createClient({ url: env.DATABASE_URL, authToken: env.DATABASE_AUTH_TOKEN }),
  { schema },
);
