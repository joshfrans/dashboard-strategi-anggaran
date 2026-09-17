import { chromium } from "playwright";

const url = process.argv[2] || "http://127.0.0.1:4173/";
const browser = await chromium.launch({ headless: true, executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe" });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, acceptDownloads: true });
const errors = [];
page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
page.on("pageerror", (error) => errors.push(error.message));
await page.goto(url, { waitUntil: "networkidle", timeout: 60_000 });
await page.waitForTimeout(700);

const accept = await page.locator("#dataFile").getAttribute("accept");
await page.locator('[data-nav="strategy"]').click();
await page.locator('[data-detail="cr"]').first().click();
const modalOpen = await page.locator("#detailOverlay").isVisible();
await page.locator("#detailClose").click();

await page.locator("#exportMenuButton").click();
const jsonDownloadPromise = page.waitForEvent("download");
await page.locator('[data-export="json"]').click();
const jsonDownload = await jsonDownloadPromise;

await page.locator("#exportMenuButton").click();
const xlsxDownloadPromise = page.waitForEvent("download");
await page.locator('[data-export="xlsx"]').click();
const xlsxDownload = await xlsxDownloadPromise;

await page.locator('[data-nav="ev-infra"]').click();
await page.waitForTimeout(500);
const evDownloadPromise = page.waitForEvent("download");
await page.locator('[data-ev-export="xlsx"]').first().click();
const evDownload = await evDownloadPromise;

console.log(JSON.stringify({
  url,
  accept,
  modalOpen,
  jsonFile: jsonDownload.suggestedFilename(),
  xlsxFile: xlsxDownload.suggestedFilename(),
  evFile: evDownload.suggestedFilename(),
  errors
}, null, 2));
await browser.close();
