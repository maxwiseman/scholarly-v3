import type { Page } from "puppeteer-core";

export async function login(
  page: Page,
  onError: () => void | Promise<void>,
  credentials: { username: string; password: string },
): Promise<void> {
  await page.goto("https://aspen.knoxschools.org");
  await page.waitForSelector("#username", { timeout: 10000 });
  await page.type("#username", credentials.username);
  await page.type("#password", credentials.password);
  await page.click("#logonButton");
  try {
    await page.waitForSelector(".navTab", { timeout: 10000 });
  } catch {
    try {
      await page.waitForSelector(".errorMessageH1", { timeout: 500 });
      console.error("Credentials incorrect!");
      await onError();
    } catch {
      console.error("Something went wrong!");
      await onError();
    }
  }
}

export async function goToAcademics(page: Page): Promise<void> {
  await page.goto(
    "https://aspen.knoxschools.org/aspen/portalClassList.do?navkey=academics.classes.list",
  );
  await page.waitForSelector(".listGrid", { timeout: 10000 });
}

export function decapitalize(text: string, separator = " "): string {
  return text
    .split(separator)
    .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
    .join(separator);
}
export function capitalize(text: string, separator = " "): string {
  return text
    .split(separator)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(separator);
}
