import puppeteer, { type Browser } from "puppeteer-core";
import { and, eq } from "drizzle-orm";
import { goToAcademics, login } from "./lib";
import { env } from "@/env";
import { getServerAuthSession } from "@/server/auth";
import { db } from "@/server/db";
import { classes } from "@/server/db/schema";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type -- We have good type inference
export async function getCategories(id: string) {
  const session = await getServerAuthSession();
  const aspenIdData = await db.query.classes.findFirst({
    where: and(eq(classes.id, id), eq(classes.userId, session?.user.id || "")),
  });
  const aspenId = aspenIdData?.aspenId;
  const options = {
    args: [],
    executablePath:
      // eslint-disable-next-line no-nested-ternary -- This isn't that confusing
      process.platform === "win32"
        ? "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
        : process.platform === "linux"
          ? "/usr/bin/google-chrome"
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

  await page.setViewport({ width: 1920, height: 1080 });

  // Login
  await login(page, async () => {
    await browser.close();
  });

  // Go to the Academics tab
  await goToAcademics(page);

  // Go to class by ID
  await page.evaluate(
    `doParamSubmit(2100, document.forms['classListForm'], '${aspenId}');`,
  );
  await page.waitForSelector("#dataGridRight", { timeout: 10000 });
  if (!process.env.VERCEL_ENV) await page.screenshot({ path: "output.png" });

  // Extract data
  const names = await page.$$eval(
    "#dataGridRight tr:nth-of-type(even):not(:last-of-type):not(:nth-last-of-type(2)) > td:nth-of-type(1)",
    (elements) => elements.map((element) => element.innerText),
  );
  const weights = await page.$$eval(
    "#dataGridRight tr:nth-of-type(even):not(:last-of-type):not(:nth-last-of-type(2)) > td:nth-of-type(3)",
    (elements) => elements.map((element) => element.innerText),
  );
  const values = await page.$$eval(
    "#dataGridRight tr:nth-of-type(odd):not(first-of-type):not(:last-of-type):not(:nth-last-of-type(2)) > td:nth-of-type(2)",
    (elements) => elements.map((element) => element.innerText),
  );
  const average = await page.$eval(
    "#dataGridRight tr:nth-last-of-type(2) > td:nth-of-type(2)",
    (element) => element.innerText,
  );

  const data = {
    average: parseFloat(average),
    categories: names.map((name, index) => {
      return {
        name: names[index],
        weight: parseFloat(weights[index] ?? "") / 100,
        value: parseFloat(values[index] ?? ""),
      };
    }),
  };

  await browser.close();

  return data;
}
