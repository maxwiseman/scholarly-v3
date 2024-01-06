import puppeteer, { type Browser } from "puppeteer-core";
import { v4 as uuid } from "uuid";
import { and, eq, sql } from "drizzle-orm";
import { capitalize, goToAcademics, login } from "./lib";
import { env } from "@/env";
import { db } from "@/server/db";
import { aspenAssignments, classes } from "@/server/db/schema";
import { getServerAuthSession } from "@/server/auth";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type -- We have a good type inference
export async function getAssignments(id: string) {
  const session = await getServerAuthSession();
  const aspenIdData = await db.query.classes.findFirst({
    where: and(eq(classes.id, id), eq(classes.userId, session?.user.id || "")),
  });
  const aspenId = aspenIdData?.aspenId || "";
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

  await db
    .insert(aspenAssignments)
    .values(
      data.map((assignment) => {
        return {
          ...assignment,
          id: uuid(),
          userId: session?.user.id || "",
          classId: id,
          dateAssigned: assignment.dateAssigned,
          dateDue: assignment.dateDue,
        };
      }),
    ) // Replace with your schema and new data
    .onConflictDoUpdate({
      target: aspenAssignments.name, // Replace with the unique identifier column of your assignments
      set: {
        category: sql`EXCLUDED.category`,
        classId: sql`EXCLUDED.classId`,
        dateAssigned: sql`EXCLUDED.dateAssigned`,
        dateDue: sql`EXCLUDED.dateDue`,
        extraCredit: sql`EXCLUDED.extraCredit`,
        feedback: sql`EXCLUDED.feedback`,
        name: sql`EXCLUDED.name`,
        points: sql`EXCLUDED.points`,
        pointsPossible: sql`EXCLUDED.pointsPossible`,
        userId: sql`EXCLUDED.userId`,
      }, // Replace with the new data you want to update
    })
    .execute();

  return data;
}
