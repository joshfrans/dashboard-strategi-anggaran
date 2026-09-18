import { chromium } from "playwright";

const url = process.argv[2] || "http://127.0.0.1:4173/";
const browser = await chromium.launch({
  headless: true,
  executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
});

const page = await browser.newPage({ viewport: { width: 1600, height: 900 } });
const errors = [];
page.on("console", (message) => {
  if (message.type() === "error") errors.push(message.text());
});
page.on("pageerror", (error) => errors.push(error.message));
await page.goto(url, { waitUntil: "networkidle", timeout: 60_000 });
await page.waitForTimeout(1_000);

const views = ["dashboard", "strategy", "investment", "ao", "ao-office", "ev-infra", "analytics", "alerts", "settings"];
const results = [];
for (const view of views) {
  await page.locator(`[data-nav="${view}"]`).click();
  await page.waitForTimeout(view === "ev-infra" || view.startsWith("ao") ? 1_000 : 250);
  const state = await page.evaluate((expectedView) => {
    const activeNav = document.querySelector(".nav-item.is-active")?.dataset.nav || "";
    const visibleSections = [...document.querySelectorAll("main.dashboard > section")]
      .filter((node) => {
        const style = getComputedStyle(node);
        const rect = node.getBoundingClientRect();
        return style.display !== "none" && style.visibility !== "hidden" && rect.width > 0 && rect.height > 0;
      })
      .map((node) => node.id || node.className.split(/\s+/)[0]);
    return {
      expectedView,
      activeNav,
      visibleSections,
      title: document.querySelector(".title-block h1")?.textContent?.trim() || "",
      documentOverflow: document.documentElement.scrollWidth > innerWidth + 1,
      brokenImages: [...document.images]
        .filter((image) => image.complete && image.naturalWidth === 0)
        .map((image) => image.currentSrc || image.src)
    };
  }, view);
  await page.screenshot({ path: `../outputs/dashboard-view-${view}.png`, fullPage: false });
  results.push(state);
}

console.log(JSON.stringify({ url, views: results, errors }, null, 2));
await browser.close();
