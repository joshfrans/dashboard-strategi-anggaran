import { chromium } from "playwright";
import { deflateSync } from "node:zlib";

const url = process.argv[2] || "http://127.0.0.1:4173/";
// CHROME_PATH opsional (mis. Chrome Windows). Kosong = Chromium bawaan Playwright,
// sehingga skrip jalan di Linux/sesi Claude tanpa diubah.
const browser = await chromium.launch({
  headless: true,
  ...(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {})
});

// OFFLINE_TILES=1: tile OpenStreetMap dilayani dengan tile polos lokal. Untuk lingkungan
// tanpa akses internet ke OSM (proxy membalas 403), agar audit mengukur dashboard, bukan proxy.
function blankTilePng() {
  const crcTable = Array.from({ length: 256 }, (_, n) => {
    let c = n;
    for (let k = 0; k < 8; k += 1) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    return c >>> 0;
  });
  const crc = (buf) => {
    let c = 0xffffffff;
    for (const byte of buf) c = crcTable[(c ^ byte) & 0xff] ^ (c >>> 8);
    return (c ^ 0xffffffff) >>> 0;
  };
  const chunk = (type, data) => {
    const body = Buffer.concat([Buffer.from(type), data]);
    const out = Buffer.alloc(body.length + 8);
    out.writeUInt32BE(data.length, 0);
    body.copy(out, 4);
    out.writeUInt32BE(crc(body), body.length + 4);
    return out;
  };
  const header = Buffer.alloc(13);
  header.writeUInt32BE(256, 0);
  header.writeUInt32BE(256, 4);
  header.set([8, 2, 0, 0, 0], 8);
  const row = Buffer.concat([Buffer.from([0]), Buffer.alloc(256 * 3, 0xec)]);
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk("IHDR", header),
    chunk("IDAT", deflateSync(Buffer.concat(Array(256).fill(row)))),
    chunk("IEND", Buffer.alloc(0))
  ]);
}
const offlineTile = process.env.OFFLINE_TILES === "1" ? blankTilePng() : null;
async function useOfflineTiles(page) {
  if (!offlineTile) return;
  await page.route(/^https:\/\/([a-z]\.)?tile\.openstreetmap\.org\//, (route) =>
    route.fulfill({ status: 200, contentType: "image/png", body: offlineTile }));
}

async function inspect(viewport) {
  const page = await browser.newPage({ viewport });
  await useOfflineTiles(page);
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
const fallbackContext = await browser.newContext({ viewport: { width: 1280, height: 720 } });
const fallbackPage = await fallbackContext.newPage();
await fallbackPage.route("**/script.js*", (route) => route.abort());
await fallbackPage.goto(url, { waitUntil: "domcontentloaded", timeout: 60_000 });
await fallbackPage.waitForTimeout(500);
const safeFallback = await fallbackPage.evaluate(() => {
  const section = document.querySelector("#executiveDashboardView");
  const children = [...(section?.children || [])];
  return {
    loadingMessage: getComputedStyle(section, "::before").content.replace(/^['\"]|['\"]$/g, ""),
    hiddenLegacyChildren: children.length > 0 && children.every((child) => getComputedStyle(child).display === "none")
  };
});
await fallbackContext.close();
console.log(JSON.stringify({ url, desktop, mobile, safeFallback }, null, 2));
await browser.close();
