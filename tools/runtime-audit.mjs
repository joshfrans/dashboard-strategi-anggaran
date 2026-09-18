import { chromium } from "playwright";

const url = process.argv[2] || "http://127.0.0.1:4173/";
const browser = await chromium.launch({
  headless: true,
  executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
});

async function inspect(viewport) {
  const page = await browser.newPage({ viewport });
  const consoleErrors = [];
  const pageErrors = [];
  const failedRequests = [];
  const cspViolations = [];

  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  page.on("pageerror", (error) => pageErrors.push(error.message));
  page.on("requestfailed", (request) => {
    failedRequests.push(`${request.method()} ${request.url()} :: ${request.failure()?.errorText || "unknown"}`);
  });
  await page.addInitScript(() => {
    window.__runtimeCspViolations = [];
    document.addEventListener("securitypolicyviolation", (event) => {
      window.__runtimeCspViolations.push({
        directive: event.effectiveDirective,
        blockedURI: event.blockedURI,
        disposition: event.disposition
      });
    });
  });

  await page.goto(url, { waitUntil: "networkidle", timeout: 60_000 });
  await page.waitForTimeout(1_500);

  const navResults = [];
  const navItems = page.locator("[data-nav]");
  for (let index = 0; index < await navItems.count(); index += 1) {
    const item = navItems.nth(index);
    const nav = await item.getAttribute("data-nav");
    await item.click();
    await page.waitForTimeout(nav === "ev-infra" ? 1_200 : 180);
    navResults.push(await page.evaluate((activeNav) => {
      const isVisible = (node) => {
        const style = getComputedStyle(node);
        const rect = node.getBoundingClientRect();
        return style.display !== "none" && style.visibility !== "hidden" && rect.width > 0 && rect.height > 0;
      };
      const visibleSections = [...document.querySelectorAll("main.dashboard > section")]
        .filter(isVisible)
        .map((node) => node.id || node.className.split(/\s+/)[0]);
      const malformedTableBodies = [...document.querySelectorAll("tbody")]
        .filter((body) => isVisible(body))
        .filter((body) => [...body.children].some((row) => row.tagName !== "TR") ||
          [...body.childNodes].some((node) => node.nodeType === Node.TEXT_NODE && node.textContent.trim()))
        .map((body) => body.id || body.closest("table")?.className || "anonymous-table");
      return {
        nav: activeNav,
        activeNav: document.querySelector(".nav-item.is-active")?.dataset.nav || "",
        title: document.querySelector(".title-block h1")?.textContent?.trim() || "",
        visibleSections,
        horizontalOverflow: document.documentElement.scrollWidth > innerWidth + 1,
        malformedTableBodies
      };
    }, nav));
  }

  await page.locator('[data-nav="ev-infra"]').click();
  await page.waitForTimeout(1_200);

  const state = await page.evaluate(() => {
    const ids = [...document.querySelectorAll("[id]")].map((node) => node.id);
    const duplicateIds = [...new Set(ids.filter((id, index) => ids.indexOf(id) !== index))];
    const map = document.querySelector("#evGeoMap");
    const visibleSections = [...document.querySelectorAll("main.dashboard > section")]
      .filter((node) => !node.hidden && getComputedStyle(node).display !== "none")
      .map((node) => node.id || node.className);
    return {
      title: document.title,
      sourceStatus: document.querySelector("#strategySourceStatus")?.textContent?.trim(),
      visibleSections,
      duplicateIds,
      viewportWidth: innerWidth,
      documentScrollWidth: document.documentElement.scrollWidth,
      bodyScrollWidth: document.body.scrollWidth,
      leafletPresent: Boolean(window.L),
      mapTiles: map?.querySelectorAll("img.leaflet-tile").length || 0,
      mapMarkers: map?.querySelectorAll(".leaflet-marker-icon").length || 0,
      cspViolations: window.__runtimeCspViolations || []
    };
  });

  await page.close();
  return { viewport, ...state, navResults, consoleErrors, pageErrors, failedRequests, cspViolations };
}

const desktop = await inspect({ width: 1600, height: 900 });
const mobile = await inspect({ width: 390, height: 844 });
console.log(JSON.stringify({ url, desktop, mobile }, null, 2));
await browser.close();
