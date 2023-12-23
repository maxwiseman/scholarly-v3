import puppeteer from "puppeteer-core";
import chrome from "chrome-aws-lambda";
import { capitalize, decapitalize, goToAcademics, login } from "./lib";

export async function getClasses() {
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
  if (!process.env.VERCEL_ENV) await page.screenshot({ path: "output.png" });

  // Get all of the class IDs
  const links = await page.$$eval(
    "tr:not(:first-of-type) > td:nth-of-type(2) > a",
    (elements) => elements.map((element) => element.getAttribute("href")),
  );
  const names = await page.$$eval(
    "#dataGrid tr:not(:first-of-type) > td:nth-of-type(2) > a",
    (elements) => elements.map((element) => element.innerText),
  );
  const schedule = await page.$$eval(
    "#dataGrid tr:not(:first-of-type) > td:nth-of-type(3)",
    (elements) => elements.map((element) => element.innerText),
  );
  const term = await page.$$eval(
    "#dataGrid tr:not(:first-of-type) > td:nth-of-type(4)",
    (elements) => elements.map((element) => element.innerText),
  );
  const teachers = await page.$$eval(
    "#dataGrid tr:not(:first-of-type) > td:nth-of-type(5)",
    (elements) => elements.map((element) => element.innerText),
  );
  const teacherEmails = await page.$$eval(
    "#dataGrid tr:not(:first-of-type) > td:nth-of-type(6) > a",
    (elements) => elements.map((element) => element.innerText),
  );
  const termGrades = await page.$$eval(
    "#dataGrid tr:not(:first-of-type) > td:nth-of-type(7)",
    (elements) => elements.map((element) => element.innerText),
  );
  const absences = await page.$$eval(
    "#dataGrid tr:not(:first-of-type) > td:nth-of-type(8)",
    (elements) => elements.map((element) => element.innerText),
  );
  const tardies = await page.$$eval(
    "#dataGrid tr:not(:first-of-type) > td:nth-of-type(9)",
    (elements) => elements.map((element) => element.innerText),
  );
  const dismissals = await page.$$eval(
    "#dataGrid tr:not(:first-of-type) > td:nth-of-type(10)",
    (elements) => elements.map((element) => element.innerText),
  );

  const formattedTeachers = teachers.map((teacher: string) => {
    const teacherSplit = teacher.split("; ");
    return teacherSplit.map((singleTeacher: string) => {
      const singleTeacherNames = singleTeacher.split(", ");
      return (
        capitalize(singleTeacherNames[1] ?? "") +
        " " +
        capitalize(singleTeacherNames[0] ?? "")
      );
    });
  });

  const data = links.map((link, index) => {
    return {
      id: /(?<=javascript:doParamSubmit\(2100, document.forms\['classListForm'\], ').*(?='\))/.exec(
        links[index] ?? "",
      )?.[0],
      name: decapitalize(names[index] ?? ""),
      schedule: schedule[index],
      term: term[index],
      teachers: formattedTeachers[index],
      teacherEmail: teacherEmails[index],
      termGrade: parseInt(termGrades[index] ?? "") || 100,
      absences: parseInt(absences[index] ?? ""),
      tardies: parseInt(tardies[index] ?? ""),
      dismissals: parseInt(dismissals[index] ?? ""),
    };
  });
  await browser.close();

  return data;
}
