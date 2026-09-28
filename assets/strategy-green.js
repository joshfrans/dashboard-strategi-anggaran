/* Add-on Green Energy — Strategi & Evaluasi (2026-09)
 * Menambahkan banner bertema energi hijau dan navigasi bagian (tab lengket)
 * DI ATAS tampilan Strategi & Evaluasi yang sudah ada. Tidak ada elemen lama
 * yang dihapus atau diubah: angka dibaca dari fungsi data yang sama
 * (script.js) dan dari status yang sudah dirender redesign.js.
 * Nonaktif bila URL memuat ?legacy=1 atau ?green=0.
 */
(function () {
  "use strict";

  const params = new URLSearchParams(window.location.search);
  if (params.get("legacy") === "1" || params.get("green") === "0") return;

  const dashboard = document.querySelector("main.dashboard, .dashboard");
  if (!dashboard) return;

  /* ---------- helpers ---------- */
  const call = (name, ...args) => {
    try { return typeof window[name] === "function" ? window[name](...args) : undefined; } catch (e) { return undefined; }
  };
  const esc = (v) => String(v ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const fmt = (v, d = 0) => Number(v).toLocaleString("id-ID", { minimumFractionDigits: d, maximumFractionDigits: d });
  const reduceMotion = () => window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const TONE = { green: "good", amber: "watch", red: "serious", gray: "neutral" };
  const CHIP_ICON = {
    good: '<path d="m5 12 5 5 9-10"/>',
    watch: '<path d="M12 4 2.5 20h19z"/><path d="M12 10v4"/><path d="M12 17h.01"/>',
    serious: '<circle cx="12" cy="12" r="9"/><path d="M12 7v6"/><path d="M12 16h.01"/>',
    neutral: '<path d="M6 12h12"/>'
  };
  const svg = (paths, cls = "") => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`;
  const ICON = {
    shield: '<path d="M12 3 4.5 6v5.5c0 4.6 3.2 8.4 7.5 9.5 4.3-1.1 7.5-4.9 7.5-9.5V6z"/><path d="m8.8 12 2.2 2.2 4.2-4.4"/>',
    code: '<rect x="3" y="4" width="18" height="16" rx="2.5"/><path d="m9.5 10-2.5 2.5L9.5 15"/><path d="m14.5 10 2.5 2.5-2.5 2.5"/>',
    pen: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/><path d="M9 13h6"/><path d="M9 17h4"/>',
    target: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="1"/>',
    award: '<circle cx="12" cy="9" r="5.5"/><path d="m8.5 13.3-1.3 7.2L12 18l4.8 2.5-1.3-7.2"/>',
    grid: '<rect x="3" y="3" width="7.5" height="7.5" rx="1.5"/><rect x="13.5" y="3" width="7.5" height="7.5" rx="1.5"/><rect x="3" y="13.5" width="7.5" height="7.5" rx="1.5"/><rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1.5"/>',
    heat: '<rect x="3" y="3" width="18" height="18" rx="2.5"/><path d="M3 9h18M3 15h18M9 3v18M15 3v18"/>',
    note: '<path d="M4 5h16M4 10h16M4 15h10M4 20h7"/>',
    leaf: '<path d="M5 19c0-8 5-14 15-14 0 10-6 15-14 15"/><path d="M5 19c3-4 6-6.5 10-8.5"/>',
    arrow: '<path d="M5 12h14"/><path d="m13 6 6 6-6 6"/>'
  };
  const chip = (tone, label) => `<span class="sg-chip ${tone}">${svg(CHIP_ICON[tone] || CHIP_ICON.neutral)}${esc(label)}</span>`;

  /* Ilustrasi energi hijau (SVG vektor, tanpa berkas eksternal — aman untuk CSP). */
  const blades = `<g class="sg-blades"><path d="M0 0 C 3 -10 2 -32 0 -46 C -2 -32 -3 -10 0 0Z"/><path d="M0 0 C 3 -10 2 -32 0 -46 C -2 -32 -3 -10 0 0Z" transform="rotate(120)"/><path d="M0 0 C 3 -10 2 -32 0 -46 C -2 -32 -3 -10 0 0Z" transform="rotate(240)"/><circle r="3.2"/></g>`;
  const turbine = (x, y, s, delay) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-2.2 0 L2.2 0 L3.6 96 L-3.6 96Z" fill="#e8f1f8"/><g class="sg-rotor" style="animation-delay:${delay}s" fill="#f4f8fc">${blades}</g></g>`;
  const panelRow = (x, y) => {
    let out = "";
    for (let i = 0; i < 4; i += 1) {
      const px = x + i * 38;
      out += `<g transform="translate(${px} ${y})"><path d="M0 22 L10 0 L44 0 L34 22Z" fill="#1d3f8f" stroke="#9fc3f0" stroke-width="1"/><path d="M11.5 7.3 H41 M8 14.7 H37.6 M19 0 L9 22 M27.5 0 L17.5 22 M36 0 L26 22" stroke="#6f9fe0" stroke-width=".7"/><path d="M20 22 v8 M30 22 v6" stroke="#c9d6e6" stroke-width="1.6"/></g>`;
    }
    return out;
  };
  const ILLUSTRATION = `<svg class="sg-art" viewBox="0 0 560 230" role="img" aria-label="Ilustrasi energi hijau: panel surya, turbin angin, gedung hijau, dan stasiun pengisian kendaraan listrik">
    <defs>
      <radialGradient id="sgSun" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#ffe89a"/><stop offset=".55" stop-color="#ffd24a" stop-opacity=".9"/><stop offset="1" stop-color="#ffd24a" stop-opacity="0"/></radialGradient>
      <linearGradient id="sgHillA" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3fbf8f"/><stop offset="1" stop-color="#1b7a5c"/></linearGradient>
      <linearGradient id="sgHillB" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a9e79" stop-opacity=".85"/><stop offset="1" stop-color="#145c48" stop-opacity=".9"/></linearGradient>
      <linearGradient id="sgGlass" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#bfe3ff"/><stop offset="1" stop-color="#6aa6dc"/></linearGradient>
    </defs>
    <circle cx="438" cy="54" r="46" fill="url(#sgSun)"/>
    <circle cx="438" cy="54" r="17" fill="#ffe27a"/>
    <path d="M0 170 C 90 130 170 150 260 138 C 350 126 440 150 560 128 L560 230 L0 230Z" fill="url(#sgHillB)"/>
    ${turbine(92, 76, 0.9, 0)}${turbine(160, 96, 0.68, -1.3)}${turbine(505, 86, 0.78, -0.7)}
    <path d="M0 196 C 110 168 230 186 330 176 C 430 166 500 182 560 172 L560 230 L0 230Z" fill="url(#sgHillA)"/>
    <g transform="translate(300 96)">
      <rect x="0" y="0" width="74" height="96" rx="5" fill="#f4f8fc"/>
      <rect x="6" y="8" width="62" height="80" rx="2" fill="url(#sgGlass)"/>
      <path d="M6 28 H68 M6 48 H68 M6 68 H68 M27 8 V88 M47 8 V88" stroke="#f4f8fc" stroke-width="2"/>
      <path d="M-6 0 H80" stroke="#2fa37c" stroke-width="7" stroke-linecap="round"/>
      <path d="M20 -18 c 0 -14 12 -22 26 -22 c 0 14 -9 22 -26 22z" fill="#46c795"/><path d="M22 -19 c 7 -7 13 -11 22 -18" stroke="#1b7a5c" stroke-width="1.6" fill="none"/>
    </g>
    <g>${panelRow(146, 170)}</g>
    <g transform="translate(410 150)">
      <rect x="0" y="0" width="30" height="50" rx="6" fill="#f4f8fc"/>
      <rect x="5" y="6" width="20" height="13" rx="2" fill="#1d3f8f"/>
      <path d="M16.5 22 10 33h5l-1.5 9 7-12h-5z" fill="#ffd24a"/>
      <path d="M30 26 c 12 0 14 6 14 14" stroke="#e8f1f8" stroke-width="3" fill="none" stroke-linecap="round"/>
      <path d="M44 38 h24 c 4 0 7 -9 12 -10 h26 c 7 0 12 7 14 12 v10 h-76z" fill="#e8f1f8"/>
      <path d="M81 30 h22 l7 9 h-33z" fill="#6aa6dc"/>
      <circle cx="58" cy="51" r="6.5" fill="#14213d"/><circle cx="58" cy="51" r="2.5" fill="#c9d6e6"/>
      <circle cx="104" cy="51" r="6.5" fill="#14213d"/><circle cx="104" cy="51" r="2.5" fill="#c9d6e6"/>
    </g>
  </svg>`;

  /* ---------- data ---------- */
  const strategyView = () => dashboard.querySelector(':scope > .rd-view[data-rd="strategy"]');
  const cardByTitle = (root, re) => [...root.querySelectorAll(".rd-card")].find((c) => re.test(c.querySelector(".rd-card-head h2")?.textContent || ""));
  const lateCount = (card) => (card ? [...card.querySelectorAll(".rd-chip")].filter((c) => /terlambat/i.test(c.textContent)).length : 0);

  function collect(view) {
    const periodKey = call("strategyPeriodKey") || "";
    const periodLabel = call("strategyPeriodFullLabel") || "";
    const rows = call("performanceRowsForPeriodKey", periodKey) || [];
    const measured = !!call("hasTrustedPerformanceMeasurement", periodKey, rows);
    const score = measured ? Number(call("calculatePerformanceScore")) : NaN;
    const summary = call("getPerformanceStatusSummary") || { total: 0, green: 0, amber: 0, red: 0, gray: 0 };
    const status = measured ? (call("performanceScoreStatus", score, summary) || {}) : { tone: "gray", label: "Belum diukur" };
    const nkoText = measured && Number.isFinite(score) ? (call("nkoLabel", score) || fmt(score, 2)) : "—";
    const policy = call("policyMetrics") || { total: 0, done: 0 };
    let cr = [];
    let prep = [];
    try { cr = Array.isArray(crData) ? crData : []; } catch (e) { cr = []; }
    try { prep = Array.isArray(policyPrepData) ? policyPrepData : []; } catch (e) { prep = []; }
    const crDone = cr.filter((r) => String(r.status || "").toLowerCase() === "selesai").length;
    const prepDone = prep.filter((r) => /selesai/i.test(r.status || "")).length;
    return {
      periodLabel, measured, nkoText, summary,
      statusTone: TONE[status.tone] || "neutral", statusLabel: status.label || "Belum diukur",
      policy, polPct: policy.total ? (policy.done / policy.total) * 100 : NaN,
      crTotal: cr.length, crDone, crLate: lateCount(cardByTitle(view, /Change Request/i)),
      prepTotal: prep.length, prepOpen: prep.length - prepDone, prepLate: lateCount(cardByTitle(view, /Penyusunan kebijakan/i))
    };
  }

  /* ---------- sections for tabs ---------- */
  const SECTIONS = [
    { key: "ringkasan", label: "Ringkasan", icon: "grid", find: (v) => v.querySelector(":scope > .rd-grid.k5") },
    { key: "nko", label: "Kinerja NKO", icon: "target", find: (v) => cardByTitle(v, /NKO per indikator/i) },
    { key: "cr", label: "Change Request", icon: "code", find: (v) => cardByTitle(v, /Change Request/i) },
    { key: "kebijakan", label: "Kebijakan", icon: "pen", find: (v) => cardByTitle(v, /Penyusunan kebijakan/i) },
    { key: "be", label: "Business Excellence", icon: "award", find: (v) => cardByTitle(v, /Business Excellence/i) },
    { key: "ratifikasi", label: "Ratifikasi", icon: "heat", find: (v) => cardByTitle(v, /ratifikasi/i) },
    { key: "catatan", label: "Catatan eksekutif", icon: "note", find: (v) => v.querySelector(":scope > .rd-execsum") }
  ];

  function tagSections(view) {
    SECTIONS.forEach((s) => {
      const el = s.find(view);
      if (el && el.dataset.sgSection !== s.key) el.dataset.sgSection = s.key;
    });
  }

  /* ---------- render ---------- */
  let hero = null;
  let tabs = null;
  let lastHero = "";

  function heroHtml(d) {
    const s = d.summary || {};
    const parts = [];
    if (s.green) parts.push(`${fmt(s.green)} tercapai`);
    if (s.amber) parts.push(`${fmt(s.amber)} hampir tercapai`);
    if (s.red) parts.push(`${fmt(s.red)} perlu peningkatan`);
    if (s.gray) parts.push(`${fmt(s.gray)} belum diukur`);
    const total = (s.green || 0) + (s.amber || 0) + (s.red || 0) + (s.gray || 0);
    const lead = d.measured ? `${fmt(s.green || 0)} dari ${fmt(total)} indikator tercapai${parts.length > 1 ? ` · ${parts.slice(1).join(" · ")}` : ""}` : "Periode ini belum memiliki pengukuran NKO lengkap.";
    const stat = (key, icon, label, value, sub, extra = "") => `
      <button type="button" class="sg-stat" data-sg-go="${key}" aria-label="${esc(`${label}: ${value}. ${sub}. Buka bagian ${label}`)}">
        <span class="sg-stat-ico">${svg(ICON[icon])}</span>
        <span class="sg-stat-body"><span class="sg-stat-label">${esc(label)}</span><b>${esc(value)}</b><small>${esc(sub)}</small>${extra}</span>
        ${svg(ICON.arrow, "sg-stat-go")}
      </button>`;
    const late = (n) => (n ? `<span class="sg-late">${esc(`${fmt(n)} terlambat`)}</span>` : "");
    return `
      <div class="sg-hero-copy">
        <p class="sg-eyebrow">${svg(ICON.leaf)}Divisi Umum &amp; Aset Properti · menuju operasi GA yang efisien &amp; hijau</p>
        <div class="sg-nko">
          <span class="sg-nko-label">NKO${d.periodLabel ? ` s.d. ${esc(d.periodLabel)}` : ""}</span>
          <span class="sg-nko-row"><b class="sg-nko-val">${esc(d.nkoText)}</b><span class="sg-nko-tgt">/ target 100</span>${chip(d.statusTone, d.statusLabel)}</span>
          <span class="sg-nko-lead">${esc(lead)}</span>
        </div>
      </div>
      <div class="sg-stats">
          ${stat("ratifikasi", "shield", "Ratifikasi kebijakan", Number.isFinite(d.polPct) ? `${fmt(d.polPct, 0)}% selesai` : "—", `${fmt(d.policy.done || 0)} dari ${fmt(d.policy.total || 0)} status`)}
          ${stat("cr", "code", "Change Request", `${fmt(d.crDone)} dari ${fmt(d.crTotal)} selesai`, "aplikasi transformasi GA", late(d.crLate))}
          ${stat("kebijakan", "pen", "Penyusunan juknis", `${fmt(d.prepOpen)} on progress`, `${fmt(d.prepTotal)} juknis layanan GA`, late(d.prepLate))}
        </div>
      <div class="sg-hero-art">${ILLUSTRATION}</div>`;
  }

  function tabsHtml() {
    return `<div class="sg-tabs-inner" role="tablist" aria-label="Bagian Strategi & Evaluasi">${SECTIONS.map((s, i) => `
      <button type="button" class="sg-tab${i === 0 ? " is-active" : ""}" role="tab" aria-selected="${i === 0}" data-sg-go="${s.key}">${svg(ICON[s.icon])}<span>${esc(s.label)}</span></button>`).join("")}</div>`;
  }

  function ensureShell(view) {
    if (!hero || !hero.isConnected) {
      hero = document.createElement("section");
      hero.className = "rd-view sg-hero";
      hero.dataset.rd = "strategy-green";
      hero.setAttribute("aria-label", "Sorotan Strategi & Evaluasi");
      dashboard.insertBefore(hero, view);
      lastHero = "";
    }
    if (!tabs || !tabs.isConnected) {
      tabs = document.createElement("nav");
      tabs.className = "rd-view sg-tabs";
      tabs.dataset.rd = "strategy-green-tabs";
      tabs.setAttribute("aria-label", "Navigasi bagian Strategi & Evaluasi");
      tabs.innerHTML = tabsHtml();
      dashboard.insertBefore(tabs, view);
    }
    if (hero.nextElementSibling !== tabs) dashboard.insertBefore(hero, tabs);
    if (tabs.nextElementSibling !== view) dashboard.insertBefore(tabs, view);
  }

  function render() {
    const view = strategyView();
    if (!view) return;
    ensureShell(view);
    tagSections(view);
    let html = "";
    try { html = heroHtml(collect(view)); } catch (error) {
      console.warn("Banner Green Energy gagal dirender:", error);
      hero.hidden = true;
      return;
    }
    hero.hidden = false;
    if (html !== lastHero) { hero.innerHTML = html; lastHero = html; }
    watchSections(view);
  }

  /* ---------- scroll & active tab ---------- */
  function go(key) {
    const view = strategyView();
    const target = view && view.querySelector(`[data-sg-section="${key}"]`);
    if (!target) return;
    target.scrollIntoView({ behavior: reduceMotion() ? "auto" : "smooth", block: "start" });
    target.classList.remove("sg-flash");
    void target.offsetWidth;
    target.classList.add("sg-flash");
    setActive(key);
  }
  function setActive(key) {
    if (!tabs) return;
    tabs.querySelectorAll(".sg-tab").forEach((t) => {
      const on = t.dataset.sgGo === key;
      t.classList.toggle("is-active", on);
      t.setAttribute("aria-selected", String(on));
      if (on && t.scrollIntoView && tabs.scrollWidth > tabs.clientWidth) t.scrollIntoView({ block: "nearest", inline: "nearest" });
    });
  }

  let io = null;
  const seen = new Map();
  function watchSections(view) {
    if (!("IntersectionObserver" in window)) return;
    const targets = [...view.querySelectorAll("[data-sg-section]")];
    if (io && targets.every((t) => seen.has(t))) return;
    if (io) io.disconnect();
    seen.clear();
    io = new IntersectionObserver((entries) => {
      entries.forEach((e) => seen.set(e.target, e.isIntersecting ? e.intersectionRatio : 0));
      let best = null;
      let bestTop = Infinity;
      seen.forEach((ratio, el) => {
        if (!ratio) return;
        const top = Math.abs(el.getBoundingClientRect().top - 90);
        if (top < bestTop) { bestTop = top; best = el; }
      });
      if (best) setActive(best.dataset.sgSection);
    }, { rootMargin: "-80px 0px -45% 0px", threshold: [0, 0.01, 0.25] });
    targets.forEach((t) => { seen.set(t, 0); io.observe(t); });
  }

  document.addEventListener("click", (event) => {
    const trigger = event.target.closest && event.target.closest("[data-sg-go]");
    if (!trigger || !trigger.closest(".sg-hero, .sg-tabs")) return;
    event.preventDefault();
    go(trigger.dataset.sgGo);
  });
  document.addEventListener("keydown", (event) => {
    const tab = event.target.closest && event.target.closest(".sg-tab");
    if (!tab || (event.key !== "ArrowRight" && event.key !== "ArrowLeft")) return;
    const list = [...tabs.querySelectorAll(".sg-tab")];
    const i = list.indexOf(tab);
    const next = list[(i + (event.key === "ArrowRight" ? 1 : list.length - 1)) % list.length];
    next.focus();
    event.preventDefault();
  });

  /* ---------- lifecycle ---------- */
  let timer = null;
  const schedule = (delay = 160) => { clearTimeout(timer); timer = setTimeout(render, delay); };
  let viewObserver = null;
  let observedView = null;
  function hookView() {
    const view = strategyView();
    if (!view || view === observedView) return;
    observedView = view;
    if (viewObserver) viewObserver.disconnect();
    viewObserver = new MutationObserver(() => schedule());
    viewObserver.observe(view, { childList: true, subtree: true, characterData: true });
    schedule(0);
  }
  new MutationObserver(() => { hookView(); if (hero && !hero.isConnected) schedule(0); })
    .observe(dashboard, { childList: true });
  hookView();
  schedule(400);
})();
