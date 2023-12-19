import type { Page } from "puppeteer";

export async function login(page: Page, onError: () => void | Promise<void>) {
  await page.goto("https://aspen.knoxschools.org");
  await page.waitForSelector("#username", { timeout: 2000 });
  await page.type("#username", process.env.ASPEN_USERNAME ?? "");
  await page.type("#password", process.env.ASPEN_PASSWORD ?? "");
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
