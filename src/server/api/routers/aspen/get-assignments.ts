import puppeteer, { type Browser } from "puppeteer-core";
import { capitalize, goToAcademics, login } from "./lib";
import { env } from "@/env";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type -- We have a good type inference
export async function getAssignments(id: string) {
  const options = {
    args: [],
    executablePath:
      // eslint-disable-next-line no-nested-ternary -- This isn't that confusing
      process.platform === "win32"
        ? "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe"
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
    `doParamSubmit(2100, document.forms['classListForm'], '${id}');`,
  );

  // Go to Assignments page
  await page.waitForSelector("a[title='List of assignments']", {
    timeout: 2000,
  });
  await page.click("a[title='List of assignments']");
  await page.waitForSelector("#dataGrid", { timeout: 2000 });
  if (!process.env.VERCEL_ENV) await page.screenshot({ path: "output.png" });

  // Extract data
  const name = await page.$$eval(
    "#dataGrid tr:not(:first-of-type) > td:nth-of-type(2) a",
    (elements) => elements.map((element) => element.innerText),
  );
  const category = await page.$$eval(
    "#dataGrid tr:not(:first-of-type) > td:nth-of-type(3)",
    (elements) => elements.map((element) => element.innerText),
  );
  const pointsPossible = await page.$$eval(
    "#dataGrid tr:not(:first-of-type) > td:nth-of-type(4)",
    (elements) => elements.map((element) => element.innerText),
  );
  const dateAssigned = await page.$$eval(
    "#dataGrid tr:not(:first-of-type) > td:nth-of-type(5)",
    (elements) => elements.map((element) => element.innerText),
  );
  const dateDue = await page.$$eval(
    "#dataGrid tr:not(:first-of-type) > td:nth-of-type(6)",
    (elements) => elements.map((element) => element.innerText),
  );
  const extraCredit = await page.$$eval(
    "#dataGrid tr:not(:first-of-type) > td:nth-of-type(7)",
    (elements) => elements.map((element) => element.innerText),
  );
  const score = await page.$$eval(
    "#dataGrid tr:not(:first-of-type) > td:nth-of-type(8) tr",
    (elements) =>
      elements.map(
        (element) =>
          element.querySelector("td:not(:has(.percentFieldContainer))")
            ?.textContent,
      ),
  );
  const feedback = await page.$$eval(
    "#dataGrid tr:not(:first-of-type) > td:nth-of-type(9)",
    (elements) => elements.map((element) => element.innerText),
  );

  const data = name.map((assignmentName, index) => {
    return {
      name: name[index],
      category: category[index],
      pointsPossible: parseFloat(pointsPossible[index] ?? ""),
      dateAssigned: Date.parse(dateAssigned[index] ?? ""),
      dateDue: Date.parse(dateDue[index] ?? ""),
      extraCredit: extraCredit[index] === "Y",
      score: score[index]?.match(/^0\.0.*/)
        ? 0
        : parseFloat(score[index] ?? "") ||
          capitalize(score[index]?.toString() ?? ""),
      feedback: feedback[index],
    };
  });

  await browser.close();

  return data;
}
