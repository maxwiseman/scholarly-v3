import puppeteer from "puppeteer-core";
import { login } from "../lib";

export default defineEventHandler(async (event) => {
  const creds = atob(
    event.headers.get("Authorization")?.replace("Basic ", "") || "",
  ).split(":");

  const options = {
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
  let error = false;

  await page.setViewport({ width: 1920, height: 1080 });

  // Login
  await login(
    page,
    async () => {
      await browser.close();
      error = true;
    },
    { username: creds[0], password: creds[1] },
  );
  await browser.close();
  return { valid: !error };
});
