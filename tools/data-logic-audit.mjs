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

await page.locator('[data-nav="ao"]').click();
await page.waitForTimeout(250);
const aoOfficeView = await page.evaluate(() => ({
  text: document.querySelector("#aoCorporateView")?.textContent?.replace(/\s+/g, " ").trim() || "",
  iframeSrc: document.querySelector("#aoCorporateView iframe")?.getAttribute("src") || ""
}));
await page.locator('[data-nav="ao-office"]').click();
await page.waitForTimeout(250);
const aoCorporateView = await page.evaluate(() => ({
  text: document.querySelector("#aoOfficeView")?.textContent?.replace(/\s+/g, " ").trim() || "",
  iframeCount: document.querySelectorAll("#aoOfficeView iframe").length
}));
await page.locator('[data-nav="alerts"]').click();
await page.waitForTimeout(250);
const alertCenter = await page.evaluate(() => ({
  critical: Number(document.querySelector("#alertCriticalCount")?.textContent || 0),
  high: Number(document.querySelector("#alertHighCount")?.textContent || 0),
  medium: Number(document.querySelector("#alertMediumCount")?.textContent || 0),
  ok: Number(document.querySelector("#alertOkCount")?.textContent || 0),
  text: document.querySelector("#alertView")?.textContent?.replace(/\s+/g, " ").trim() || ""
}));

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
    message: document.querySelector("#performanceStatusMessage")?.textContent?.trim() || "",
    detailText: renderDetailPerformance().replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim()
  };
});
const businessDetail = await page.evaluate(() => {
  const html = renderDetailBusiness();
  return {
    text: html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim(),
    pendingBadge: html.includes('class="badge not-started"')
  };
});
await page.locator('[data-detail="performance"]').click();
await page.waitForTimeout(150);
const performanceModal = await page.locator("#detailOverlay").textContent();
await page.locator("#detailOverlay").screenshot({ path: "../outputs/dashboard-performance-unmeasured-audit.png" });
await page.locator("#detailClose").click();
await page.locator('[data-detail="business"]').click();
await page.waitForTimeout(150);
const businessModal = {
  text: (await page.locator("#detailOverlay").textContent())?.replace(/\s+/g, " ").trim() || "",
  pendingBadges: await page.locator("#detailOverlay .badge.not-started").count()
};
await page.locator("#detailOverlay").screenshot({ path: "../outputs/dashboard-business-detail-audit.png" });
await page.locator("#detailClose").click();
const junePerformance = await page.evaluate(() => {
  applyStrategyPeriod(5, 2026);
  const summary = getPerformanceStatusSummary();
  const policyRow = performanceMainRows().find((row) => String(row.no).trim() === "5");
  return {
    summary,
    policyStatus: policyRow?.status || "",
    policyAchievement: policyRow?.achievement ?? "",
    panelStatus: document.querySelector("#performanceMainStatus")?.textContent?.trim() || ""
  };
});

await page.locator('[data-nav="ev-infra"]').click();
await page.waitForTimeout(700);
const ev = await page.evaluate(() => ({
  header: document.querySelector(".ev-title strong")?.textContent?.trim() || "",
  geoSummary: document.querySelector(".ev-geo-actions span")?.textContent?.replace(/\s+/g, " ").trim() || "",
  approximateMarkers: document.querySelectorAll(".ev-unit-office-div-icon.is-approximate").length,
  recommendations: document.querySelector(".ev-recommendations")?.textContent?.replace(/\s+/g, " ").trim() || document.querySelector("#evInfraView")?.textContent?.replace(/\s+/g, " ").trim() || ""
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
    staleRecommendationsSuppressed: overview.text.includes("Data usang harus diperbarui") && overview.text.includes("Usang"),
    aoScopesDistinct: aoOfficeView.iframeSrc.includes("ao-kantor-pusat") && aoCorporateView.iframeCount === 0 && aoCorporateView.text.includes("2.931.185") && !aoCorporateView.text.includes("64 Divisi"),
    alertCardsReconcile: alertCenter.critical + alertCenter.high + alertCenter.medium + alertCenter.ok === 5,
    noRatificationQualified: alertCenter.text.includes("dicatat sebagai pengecualian") && alertCenter.text.includes("belum dinilai terbuka"),
    overduePriority: overview.text.includes("terlambat") && overview.text.includes("E-TRANSPORT"),
    achievementAbove100Formatted: strategy.performanceText.includes("110,00%") && !strategy.performanceText.includes(" 1,1%"),
    unmeasuredNkoNotGreen: unmeasuredNko.score === "-" && unmeasuredNko.status === "Belum Diukur" && unmeasuredNko.message.includes("belum memiliki pengukuran"),
    unmeasuredDetailNotGreen: performanceModal.includes("Belum Diukur") && !performanceModal.includes("Kinerja Aman") && !performanceModal.includes("zona hijau"),
    businessDetailCoverageHonest: businessModal.text.includes("1/2 semester telah diukur") && businessModal.text.includes("1 semester belum dinilai") && businessDetail.pendingBadge && businessModal.pendingBadges > 0,
    juneDateSerialNotScored: junePerformance.summary.green === 6 && junePerformance.summary.amber === 1 && junePerformance.summary.gray === 3 && junePerformance.policyStatus.toLowerCase().includes("belum") && junePerformance.policyAchievement === "",
    partialNkoQualified: junePerformance.panelStatus === "Tercapai Sementara",
    evDeduplicated: ev.header.includes("352") && ev.geoSummary.startsWith("352 unit pelaksana"),
    approximateMarkersFlagged: ev.approximateMarkers >= 13,
    evRecommendationGated: ev.recommendations.includes("PILOT / VALIDASI") && !ev.recommendations.includes("GO Program EV"),
    importHtmlSanitized: xss.executed === 0 && xss.eventAttributes === 0,
    dynamicTableStructure: Object.values(dynamicTables).every(
      (table) => table.rowCount > 0 && table.allRowsHaveExpectedCells && table.directTextNodes === 0
    )
  },
  evidence: { overview: overview.text.slice(0, 2200), aoOfficeView, aoCorporateView, alertCenter, strategy, dynamicTables, unmeasuredNko, junePerformance, performanceModal: performanceModal.replace(/\s+/g, " ").trim(), businessDetail, businessModal, ev, xss, errors }
};
console.log(JSON.stringify(result, null, 2));
await browser.close();
