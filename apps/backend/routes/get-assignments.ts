import puppeteer, {
  type Page,
  type PuppeteerLaunchOptions,
} from "puppeteer-core";
import { capitalize, goToAcademics, login } from "../lib";

export default eventHandler(async (event) => {
  const creds = atob(
    event.headers.get("Authorization")?.replace("Basic ", "") || "",
  ).split(":");
  const classId = getQuery(event).id?.toString();

  const options: PuppeteerLaunchOptions = {
    args: ["--no-sandbox"],
    executablePath:
      // eslint-disable-next-line no-nested-ternary -- This isn't that confusing
      process.platform === "win32"
        ? "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
        : process.platform === "linux"
          ? "/usr/bin/chromium-browser"
          : "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  };
  const browser = await puppeteer.launch(options);
  const context = await browser.createIncognitoBrowserContext();
  const page = await context.newPage();

  // Login
  await login(
    page,
    async () => {
      await browser.close();
    },
    { username: creds[0], password: creds[1] },
  );

  // Go to the Academics tab
  await goToAcademics(page);

  // Go to class by ID
  await page.evaluate(
    `doParamSubmit(2100, document.forms['classListForm'], '${classId}');`,
  );

  // Go to Assignments page
  await page.waitForSelector("a[title='List of assignments']", {
    timeout: 10000,
  });
  await page.click("a[title='List of assignments']");
  await page.waitForSelector("#dataGrid", { timeout: 10000 });
  if (!process.env.VERCEL_ENV) await page.screenshot({ path: "output.png" });

  // Extract data
  const data = await extractData(page);

  for (let i = 0; i < 20; i++) {
    try {
      // eslint-disable-next-line no-await-in-loop -- This is necessary
      await page.waitForSelector("#topnextPageButton:not([disabled])", {
        timeout: 500,
      });
      // eslint-disable-next-line no-await-in-loop -- This is necessary
      await page.click("#topnextPageButton:not([disabled])");
      // eslint-disable-next-line no-await-in-loop -- This is necessary
      data.push(...(await extractData(page)));
    } catch {
      break;
    }
  }
  await browser.close();

  return data;
});

async function extractData(page: Page): Promise<AspenAssignment[]> {
  await page.waitForSelector("#dataGrid", { timeout: 10000 });
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
      elements.map((element) =>
        element
          .querySelector("td:last-of-type")
          ?.textContent?.replaceAll("(", "")
          .replaceAll(")", ""),
      ),
  );
  const feedback = await page.$$eval(
    "#dataGrid tr:not(:first-of-type) > td:nth-of-type(9)",
    (elements) => elements.map((element) => element.innerText),
  );

  const data: AspenAssignment[] = name.map((assignmentName, index) => {
    return {
      name: name[index] || "",
      category: category[index] || "",
      pointsPossible: parseFloat(pointsPossible[index] ?? ""),
      dateAssigned: dateAssigned[index] || "",
      dateDue: dateDue[index] || "",
      extraCredit: extraCredit[index] === "Y",
      points: score[index]?.match(/^(?:\(0\.0\)|0\.0|0|\(0\))$/)
        ? 0
        : parseFloat(score[index] ?? "") ||
          capitalize(score[index]?.toString() ?? ""),
      feedback: feedback[index] || "",
    };
  });

  return data;
}

export interface AspenAssignment {
  name: string;
  category: string;
  pointsPossible: number;
  dateAssigned: string;
  dateDue: string;
  extraCredit: boolean;
  points: string | number;
  feedback: string;
}
