import puppeteer from "puppeteer-core";
import chrome from "chrome-aws-lambda";
import { goToAcademics, login } from "./lib";

export async function getCategories(id: string) {
  const options = process.env.AWS_REGION
    ? {
        args: chrome.args,
        executablePath: await chrome.executablePath,
        headless: chrome.headless,
      }
    : {
        args: [],
        executablePath:
          process.platform === "win32"
            ? "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe"
            : process.platform === "linux"
              ? "/usr/bin/google-chrome"
              : "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
      };
  const browser = await puppeteer.launch(options);
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
    `doParamSubmit(2100, document.forms['classListForm'], '${id}');`,
  );
  await page.waitForSelector("#dataGridRight", { timeout: 2000 });
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
