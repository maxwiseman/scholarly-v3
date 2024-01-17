import { eq } from "drizzle-orm";
import {
  type SQLiteColumn,
  type SQLiteTableWithColumns,
} from "drizzle-orm/sqlite-core";
import puppeteer, { type Browser } from "puppeteer-core";
import { type Course } from "../canvas/get-classes";
import { login } from "../aspen/lib";
import { getServerAuthSession } from "@/server/auth";
import { db } from "@/server/db";
import { users } from "@/server/db/schema";
import { env } from "@/env";

db.update(users);

export type Settings = {
  [K in typeof users extends SQLiteTableWithColumns<infer U> ?
    keyof U["columns"]
  : never]: typeof users extends SQLiteTableWithColumns<infer T> ?
    T["columns"][K] extends SQLiteColumn<infer C> ?
      C["data"]
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
  if (settings.aspenPassword || settings.aspenUsername) {
    const options = {
      args: [],
      executablePath:
        // eslint-disable-next-line no-nested-ternary -- This isn't that confusing
        process.platform === "win32" ?
          "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
        : process.platform === "linux" ? "/usr/bin/google-chrome"
        : "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    };
    let browser: Browser;
    if (process.env.VERCEL) {
      browser = await puppeteer.connect({
        browserWSEndpoint: `wss://chrome.browserless.io?token=${env.BROWSERLESS_API_KEY}`,
      });
    } else {
      browser = await puppeteer.launch(options);
    }
    const context = await browser.createIncognitoBrowserContext();
    const page = await context.newPage();
    await login(
      page,
      async () => {
        await browser.close();
        errors.aspenPassword = true;
        errors.aspenUsername = true;
      },
      { username: settings.aspenUsername, password: settings.aspenPassword },
    );
    await browser.close();
  }
  return errors;
}
