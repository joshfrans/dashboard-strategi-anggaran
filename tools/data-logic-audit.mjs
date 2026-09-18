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

await page.locator('[data-nav="dashboard"]').click();
await page.waitForTimeout(250);
const overview = await page.evaluate(() => ({
  text: document.querySelector("#executiveDashboardView")?.textContent?.replace(/\s+/g, " ").trim() || "",
  html: document.querySelector("#executiveDashboardView")?.innerHTML || ""
}));
await page.screenshot({ path: "../outputs/dashboard-overview-audit.png", fullPage: false });

await page.locator('[data-nav="strategy"]').click();
await page.waitForTimeout(250);
const strategy = await page.evaluate(() => ({
  performanceText: document.querySelector("#performanceRows")?.textContent?.replace(/\s+/g, " ").trim() || "",
  statusText: document.querySelector("#performanceStatusGrid")?.textContent?.replace(/\s+/g, " ").trim() || ""
}));
const dynamicTables = await page.evaluate(() => {
  const inspectBody = (selector, expectedCells) => {
    const body = document.querySelector(selector);
    const rows = Array.from(body?.children || []);
    return {
      childTags: rows.map((row) => row.tagName),
      rowCount: rows.length,
      allRowsHaveExpectedCells: rows.every(
        (row) => row.tagName === "TR" && row.children.length === expectedCells
      ),
      directTextNodes: Array.from(body?.childNodes || []).filter(
        (node) => node.nodeType === Node.TEXT_NODE && node.textContent.trim()
      ).length
    };
  };
  return {
    changeRequests: inspectBody("#crRows", 6),
    policyPreparation: inspectBody("#policyPrepRows", 6),
    alertActions: inspectBody("#alertActionRows", 4)
  };
});
await page.locator(".cr-panel").screenshot({ path: "../outputs/dashboard-cr-audit.png" });
const unmeasuredNko = await page.evaluate(() => {
  applyStrategyPeriod(8, 2026);
  return {
    score: document.querySelector("#performanceScore")?.textContent?.trim() || "",
    status: document.querySelector("#performanceMainStatus")?.textContent?.trim() || "",
    message: document.querySelector("#performanceStatusMessage")?.textContent?.trim() || ""
  };
});

await page.locator('[data-nav="ev-infra"]').click();
await page.waitForTimeout(700);
const ev = await page.evaluate(() => ({
  header: document.querySelector(".ev-title strong")?.textContent?.trim() || "",
  geoSummary: document.querySelector(".ev-geo-actions span")?.textContent?.replace(/\s+/g, " ").trim() || "",
  approximateMarkers: document.querySelectorAll(".ev-unit-office-div-icon.is-approximate").length
}));
await page.screenshot({ path: "../outputs/dashboard-ev-map-audit.png", fullPage: false });

const xss = await page.evaluate(() => {
  window.__dashboardXss = 0;
  applyStrategyDataSource({
    crData: [{
      app: '<img src=x onerror="window.__dashboardXss=1">',
      request: '<svg onload="window.__dashboardXss=2"></svg>',
      progress: 50,
      status: "On Progress",
      target: "18 Sep 2026"
    }]
  });
  renderCrRows();
  return {
    executed: window.__dashboardXss,
    eventAttributes: document.querySelectorAll("#crRows [onerror], #crRows [onload], #crRows script").length,
    text: document.querySelector("#crRows")?.textContent?.replace(/\s+/g, " ").trim() || ""
  };
});

const result = {
  url,
  checks: {
    businessExcellenceMeasuredOnly: overview.text.includes("100,18% · 1/2 semester diukur"),
    noInventedAkiForecast: overview.text.includes("Proyeksi sumber (AO saja)") && !overview.text.includes("Forecast"),
    mixedPeriodDisclosure: overview.text.includes("Periode lintas domain berbeda"),
    overduePriority: overview.text.includes("terlambat") && overview.text.includes("E-TRANSPORT"),
    achievementAbove100Formatted: strategy.performanceText.includes("110,00%") && !strategy.performanceText.includes(" 1,1%"),
    unmeasuredNkoNotGreen: unmeasuredNko.score === "-" && unmeasuredNko.status === "Belum Diukur" && unmeasuredNko.message.includes("belum memiliki pengukuran"),
    evDeduplicated: ev.header.includes("352") && ev.geoSummary.startsWith("352 unit pelaksana"),
    approximateMarkersFlagged: ev.approximateMarkers >= 13,
    importHtmlSanitized: xss.executed === 0 && xss.eventAttributes === 0,
    dynamicTableStructure: Object.values(dynamicTables).every(
      (table) => table.rowCount > 0 && table.allRowsHaveExpectedCells && table.directTextNodes === 0
    )
  },
  evidence: { overview: overview.text.slice(0, 1600), strategy, dynamicTables, unmeasuredNko, ev, xss, errors }
};
console.log(JSON.stringify(result, null, 2));
await browser.close();
