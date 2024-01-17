import puppeteer from "puppeteer-core";
import { capitalize, goToAcademics, login } from "../lib";

export default eventHandler(async (event) => {
  const creds = atob(
    event.headers.get("Authorization")?.replace("Basic ", "") || "",
  ).split(":");
  const classId = getQuery(event).id?.toString();

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
  const browser = await puppeteer.launch(options);
  const context = await browser.createIncognitoBrowserContext();
  const page = await context.newPage();

  await page.setViewport({ width: 1920, height: 1080 });

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
      name: name[index] || "",
      category: category[index] || "",
      pointsPossible: parseFloat(pointsPossible[index] ?? ""),
      dateAssigned: new Date(Date.parse(dateAssigned[index] ?? "")),
      dateDue: new Date(Date.parse(dateDue[index] ?? "")),
      extraCredit: extraCredit[index] === "Y",
      points: score[index]?.match(/^0\.0.*/)
        ? 0
        : parseFloat(score[index] ?? "") ||
          capitalize(score[index]?.toString() ?? ""),
      feedback: feedback[index] || "",
    };
  });

  await browser.close();

  return data;
});