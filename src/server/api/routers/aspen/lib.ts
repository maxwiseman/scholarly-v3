import { getServerAuthSession } from "@/server/auth";
import { db } from "@/server/db";
import { users } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import type { Page } from "puppeteer-core";

export async function login(page: Page, onError: () => void | Promise<void>) {
  const session = await getServerAuthSession();
  if (!session) {
    await onError();
    return;
  }
  const dbUser = await db.query.users.findFirst({
    where: eq(users.id, session.user.id),
  });

  console.log("DB data received");

  await page.goto("https://aspen.knoxschools.org");
  await page.waitForSelector("#username", { timeout: 2000 });
  await page.type("#username", dbUser?.aspenUsername ?? "");
  await page.type("#password", dbUser?.aspenPassword ?? "");
  await page.click("#logonButton");
  try {
    await page.waitForSelector(".navTab", { timeout: 1000 });
    console.log("Login successful!");
  } catch {
    try {
      await page.waitForSelector(".errorMessageH1", { timeout: 500 });
      console.log("Credentials incorrect!");
      await onError();
    } catch {
      console.error("Something went wrong!");
      await onError();
    }
  }
}

export async function goToAcademics(page: Page) {
  await page.goto(
    "https://aspen.knoxschools.org/aspen/portalClassList.do?navkey=academics.classes.list",
  );
  await page.waitForSelector(".listGrid", { timeout: 2000 });
}

export function decapitalize(text: string, separator = " ") {
  return text
    .split(separator)
    .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
    .join(separator);
}
export function capitalize(text: string, separator = " ") {
  return text
    .split(separator)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(separator);
}
