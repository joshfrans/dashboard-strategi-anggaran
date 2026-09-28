/* Add-on Energi Kelistrikan — Investasi (2026-09)
 * Menyisipkan banner bertema investasi energi kelistrikan dan tab navigasi bagian ke dalam
 * tampilan Investasi yang sudah ada (setelah header & strip sumber). Tidak ada
 * elemen lama yang dihapus: angka dibaca dari investmentData (script.js) dan
 * dari panel yang sudah dirender redesign.js.
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
  const num = (value, fallback = NaN) => {
    if (typeof value === "number") return Number.isFinite(value) ? value : fallback;
    const m = String(value ?? "").replace(/\s/g, "").match(/-?[\d.]*\d(?:,\d+)?/);
    if (!m) return fallback;
    const n = Number(m[0].replace(/\./g, "").replace(",", "."));
    return Number.isFinite(n) ? n : fallback;
  };
  const reduceMotion = () => window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const CHIP_ICON = {
    good: '<path d="m5 12 5 5 9-10"/>',
    watch: '<path d="M12 4 2.5 20h19z"/><path d="M12 10v4"/><path d="M12 17h.01"/>',
    serious: '<circle cx="12" cy="12" r="9"/><path d="M12 7v6"/><path d="M12 16h.01"/>',
    neutral: '<path d="M6 12h12"/>'
  };
  const svg = (paths, cls = "") => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`;
  const ICON = {
    wallet: '<path d="M4 7.5A2.5 2.5 0 0 1 6.5 5H18v3"/><rect x="4" y="8" width="16" height="11" rx="2.5"/><path d="M16 13.5h.01"/>',
    gauge: '<path d="M4 17a8 8 0 1 1 16 0"/><path d="m12 17 4-5"/><path d="M8 17h8"/>',
    decide: '<path d="M9 11 12 14 20 6"/><path d="M20 12v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h9"/>',
    pie: '<path d="M12 3v9h9"/><circle cx="12" cy="12" r="9"/>',
    steps: '<circle cx="5" cy="12" r="2.2"/><circle cx="12" cy="12" r="2.2"/><circle cx="19" cy="12" r="2.2"/><path d="M7.2 12h2.6M14.2 12h2.6"/>',
    rocket: '<path d="M5 19c1-3 2.5-4.5 5-5"/><path d="M14 4c3.5 0 6 2.5 6 6-2 3.5-5 6-9 7l-4-4c1-4 3.5-7 7-9z"/><circle cx="14.5" cy="9.5" r="1.5"/>',
    building: '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2"/>',
    grid: '<rect x="3" y="3" width="7.5" height="7.5" rx="1.5"/><rect x="13.5" y="3" width="7.5" height="7.5" rx="1.5"/><rect x="3" y="13.5" width="7.5" height="7.5" rx="1.5"/><rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1.5"/>',
    arrow: '<path d="M5 12h14"/><path d="m13 6 6 6-6 6"/>'
  };
  const chip = (tone, label) => `<span class="ig-chip ${tone}">${svg(CHIP_ICON[tone] || CHIP_ICON.neutral)}${esc(label)}</span>`;

  /* Ilustrasi energi kelistrikan: pembangkit, menara transmisi dengan aliran listrik,
     kota yang menyala, dan grafik investasi yang tumbuh (SVG vektor, aman untuk CSP). */
  const pylon = (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})" fill="none" stroke="#dbe8f7" stroke-width="2" stroke-linejoin="round">
      <path d="M-15 110 L-4 0 L4 0 L15 110"/>
      <path d="M-12 84 L10 60 M12 84 L-10 60 M-9 58 L7 36 M9 58 L-7 36 M-6 34 L4 14 M6 34 L-4 14"/>
      <path d="M-26 14 H26 M-20 32 H20" stroke-width="2.4"/>
      <path d="M-24 14 v7 M24 14 v7 M-18 32 v7 M18 32 v7" stroke="#9fc3f0" stroke-width="1.6"/>
    </g>`;
  const city = () => {
    const b = [[410, 128, 30, 72], [442, 104, 26, 96], [470, 140, 22, 60], [494, 116, 30, 84], [526, 146, 26, 54]];
    let out = "";
    b.forEach(([x, y, w, h], i) => {
      out += `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="2" fill="#16305f" stroke="#2c5aa0" stroke-width="1"/>`;
      for (let r = y + 8; r < y + h - 8; r += 12) {
        for (let c = x + 5; c < x + w - 5; c += 8) {
          const lit = (r + c + i * 7) % 3 !== 0;
          out += `<rect x="${c}" y="${r}" width="4" height="5" rx="1" fill="${lit ? "#ffd24a" : "#27497f"}"${lit ? ' class="ig-lit"' : ""}/>`;
        }
      }
    });
    return out;
  };
  const ILLUSTRATION = `<svg class="ig-art" viewBox="0 0 560 230" role="img" aria-label="Ilustrasi energi kelistrikan: pembangkit, menara transmisi dengan aliran listrik menuju kota yang menyala, dan grafik investasi yang tumbuh">
    <defs>
      <radialGradient id="igGlow" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#7dd3fc" stop-opacity=".55"/><stop offset="1" stop-color="#7dd3fc" stop-opacity="0"/></radialGradient>
      <linearGradient id="igGround" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a5fb0"/><stop offset="1" stop-color="#123a74"/></linearGradient>
      <linearGradient id="igBar" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7dd3fc"/><stop offset="1" stop-color="#2f6fd0"/></linearGradient>
    </defs>
    <circle cx="300" cy="70" r="120" fill="url(#igGlow)"/>
    <g transform="translate(468 42)">
      <circle r="26" fill="#ffd24a" opacity=".18"/><circle r="18" fill="#ffd24a"/>
      <path d="M3 -12 -7 3h7l-3 10 10-15h-7z" fill="#14213d"/>
    </g>
    <path d="M0 200 C 120 186 250 196 360 190 C 450 186 510 192 560 188 L560 230 L0 230Z" fill="url(#igGround)"/>
    <g transform="translate(20 132)">
      <rect x="0" y="18" width="64" height="52" rx="3" fill="#16305f" stroke="#2c5aa0"/>
      <rect x="44" y="-16" width="11" height="36" fill="#1f427c" stroke="#2c5aa0"/>
      <path d="M8 18 v-12 l10 6 v-6 l10 6 v-6 l10 6 v6" fill="#1f427c" stroke="#2c5aa0"/>
      <path d="M36 32 26 48h8l-3 12 12-18h-8z" fill="#ffd24a"/>
    </g>
    ${pylon(170, 88, 1)}${pylon(310, 80, 1.05)}
    <g fill="none" stroke-linecap="round">
      <path d="M84 150 C 120 116 140 104 144 102 M196 102 C 240 124 262 124 283 95 M337 95 C 370 118 392 120 410 128" stroke="#9fc3f0" stroke-width="1.4"/>
      <path d="M84 162 C 120 134 140 124 150 120 M190 120 C 240 140 262 140 289 114 M331 114 C 370 136 392 138 442 104" stroke="#9fc3f0" stroke-width="1.4"/>
      <path class="ig-flow" d="M84 150 C 120 116 140 104 144 102 M196 102 C 240 124 262 124 283 95 M337 95 C 370 118 392 120 410 128" stroke="#ffd24a" stroke-width="2.6" stroke-dasharray="3 14"/>
      <path class="ig-flow" style="animation-delay:-.6s" d="M84 162 C 120 134 140 124 150 120 M190 120 C 240 140 262 140 289 114 M331 114 C 370 136 392 138 442 104" stroke="#7dd3fc" stroke-width="2.6" stroke-dasharray="3 14"/>
    </g>
    <g>${city()}</g>
    <g>${[[206, 40], [230, 58], [254, 78]].map(([x, h]) => `<rect x="${x}" y="${204 - h}" width="16" height="${h}" rx="3" fill="url(#igBar)"/>`).join("")}</g>
    <path class="ig-trend" d="M198 176 L222 160 L246 140 L276 116" fill="none" stroke="#ffd24a" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M266 114 L278 114 L278 126" fill="none" stroke="#ffd24a" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;

  /* ---------- data ---------- */
  const investmentView = () => dashboard.querySelector(':scope > .rd-view[data-rd="investment"]');
  const cardByTitle = (root, re) => [...root.querySelectorAll(":scope .rd-card")].find((c) => re.test(c.querySelector(".rd-card-head h2")?.textContent || ""));
  const clean = (v) => String(v ?? "").trim();

  function collect(view) {
    let d = {};
    try { d = (typeof investmentData === "object" && investmentData) ? investmentData : {}; } catch (e) { d = {}; }
    const freshness = call("dashboardFreshness", d.reportDate) || null;
    const reportLabel = clean(d.reportDate).replace(/^Report ANG Investasi\s*-\s*/i, "");
    const akiPct = num(d.akiRealizationPct, NaN);
    const aiPct = num(d.aiRealizationPct, NaN);
    const step = view.querySelector(".rd-step.progress") || view.querySelector(".rd-step.waiting");
    const steps = view.querySelectorAll(".rd-step").length;
    const stepIndex = step ? [...view.querySelectorAll(".rd-step")].indexOf(step) + 1 : 0;
    const prio = cardByTitle(view, /Prioritas keputusan/i);
    const decisions = prio ? prio.querySelectorAll(".rd-list-row").length : 0;
    return {
      reportLabel, freshness,
      akiPctText: clean(d.akiRealizationPct) || "—", akiPct,
      akiReal: clean(d.akiRealization), akiTotal: clean(d.akiTotal),
      gapText: clean(d.akiGapChip).replace(/^Sisa\s*/i, ""), gapPct: clean(d.akiGapPct),
      aiTotal: clean(d.totalInvestment) || "—", aiReal: clean(d.aiRealization), aiPctText: clean(d.aiRealizationPct), aiPct,
      stepName: step ? clean(step.querySelector("strong")?.textContent) : "", stepIndex, steps,
      unused: clean(d.aiCarryoverUnused), carryTotal: clean(d.aiCarryoverTotal),
      decisions
    };
  }

  /* ---------- sections for tabs ---------- */
  const SECTIONS = [
    { key: "ringkasan", label: "Ringkasan", icon: "grid", find: (v) => v.querySelector(":scope > .rd-grid.k4") },
    { key: "aki", label: "Penyerapan AKI", icon: "gauge", find: (v) => cardByTitle(v, /penyerapan AKI/i) },
    { key: "prioritas", label: "Prioritas keputusan", icon: "decide", find: (v) => cardByTitle(v, /Prioritas keputusan/i) },
    { key: "komposisi", label: "Komposisi AI & AKI", icon: "pie", find: (v) => cardByTitle(v, /Komposisi AI/i) },
    { key: "usulan", label: "Usulan AI 2027", icon: "steps", find: (v) => cardByTitle(v, /usulan AI 2027/i) },
    { key: "luncuran", label: "AI luncuran", icon: "rocket", find: (v) => cardByTitle(v, /AI luncuran/i) },
    { key: "sarpras", label: "Sarpras Unit", icon: "building", find: (v) => cardByTitle(v, /Sarpras Unit/i) }
  ];
  function tagSections(view) {
    SECTIONS.forEach((s) => {
      const el = s.find(view);
      if (el && el.dataset.igSection !== s.key) el.dataset.igSection = s.key;
    });
  }

  /* ---------- render ---------- */
  let hero = null;
  let tabs = null;
  let lastHero = "";

  function heroHtml(d) {
    const tone = !Number.isFinite(d.akiPct) ? "neutral" : d.akiPct < 50 ? "watch" : "good";
    const toneLabel = tone === "watch" ? "Di bawah laju" : tone === "good" ? "Sesuai jalur" : "Belum ada data";
    const f = d.freshness;
    const fresh = f && f.known && f.stale ? chip("serious", `Data usang ${f.ageDays} hari`) : "";
    const stat = (key, icon, label, value, sub) => `
      <button type="button" class="ig-stat" data-ig-go="${key}" aria-label="${esc(`${label}: ${value}. ${sub}. Buka bagian ${label}`)}">
        <span class="ig-stat-ico">${svg(ICON[icon])}</span>
        <span class="ig-stat-body"><span class="ig-stat-label">${esc(label)}</span><b>${esc(value)}</b><small>${esc(sub)}</small></span>
        ${svg(ICON.arrow, "ig-stat-go")}
      </button>`;
    const lead = d.akiReal && d.akiTotal
      ? `${d.akiReal} dari ${d.akiTotal} anggaran kas investasi terserap${d.gapText ? ` · sisa ${d.gapText}${d.gapPct ? ` (${d.gapPct})` : ""}` : ""}`
      : "Data penyerapan AKI belum tersedia.";
    return `
      <div class="ig-hero-copy">
        <p class="ig-eyebrow">Investasi GA · memperkuat aset &amp; keandalan kelistrikan${d.reportLabel ? ` · ${esc(d.reportLabel)}` : ""}</p>
        <div class="ig-nko">
          <span class="ig-nko-label">Serapan AKI 2026</span>
          <span class="ig-nko-row"><b class="ig-nko-val">${esc(d.akiPctText)}</b><span class="ig-nko-tgt">terserap</span>${chip(tone, toneLabel)}${fresh}</span>
          <span class="ig-nko-lead">${esc(lead)}</span>
        </div>
      </div>
      <div class="ig-stats">
        ${stat("komposisi", "wallet", "Anggaran Investasi (AI) 2026", d.aiTotal, d.aiReal ? `realisasi ${d.aiReal}${d.aiPctText ? ` · ${d.aiPctText}` : ""}` : "realisasi belum tersedia")}
        ${stat("prioritas", "decide", "Keputusan menunggu", `${d.decisions} butir`, "agar penyerapan terkendali")}
        ${stat("usulan", "steps", "Usulan AI 2027", d.stepName || "—", d.stepIndex ? `tahap ${d.stepIndex} dari ${d.steps}` : "tahapan belum tersedia")}
        ${stat("luncuran", "rocket", "AI luncuran belum dipakai", d.unused || "—", d.carryTotal ? `dari total ${d.carryTotal}` : "")}
      </div>
      <div class="ig-hero-art">${ILLUSTRATION}</div>`;
  }

  function tabsHtml() {
    return `<div class="ig-tabs-inner" role="tablist" aria-label="Bagian Investasi">${SECTIONS.map((s, i) => `
      <button type="button" class="ig-tab${i === 0 ? " is-active" : ""}" role="tab" aria-selected="${i === 0}" data-ig-go="${s.key}">${svg(ICON[s.icon])}<span>${esc(s.label)}</span></button>`).join("")}</div>`;
  }

  // Sisipkan setelah strip sumber (atau header) di dalam tampilan Investasi.
  function place(view) {
    if (!hero) {
      hero = document.createElement("section");
      hero.className = "ig-hero";
      hero.dataset.igOwn = "1";
      hero.setAttribute("aria-label", "Sorotan Investasi");
    }
    if (!tabs) {
      tabs = document.createElement("nav");
      tabs.className = "ig-tabs";
      tabs.dataset.igOwn = "1";
      tabs.setAttribute("aria-label", "Navigasi bagian Investasi");
      tabs.innerHTML = tabsHtml();
    }
    const anchor = view.querySelector(":scope > .rd-strip") || view.querySelector(":scope > .rd-header");
    const ref = anchor ? anchor.nextElementSibling : view.firstElementChild;
    if (hero.parentNode !== view || hero.previousElementSibling !== anchor) {
      view.insertBefore(hero, ref);
      lastHero = "";
    }
    if (tabs.parentNode !== view || tabs.previousElementSibling !== hero) view.insertBefore(tabs, hero.nextElementSibling);
  }

  function render() {
    const view = investmentView();
    if (!view || !view.firstElementChild) return;
    place(view);
    tagSections(view);
    let html = "";
    try { html = heroHtml(collect(view)); } catch (error) {
      console.warn("Banner Energi Investasi gagal dirender:", error);
      hero.hidden = true;
      return;
    }
    hero.hidden = false;
    if (html !== lastHero) { hero.innerHTML = html; lastHero = html; }
    watchSections(view);
  }

  /* ---------- scroll & active tab ---------- */
  function setActive(key) {
    if (!tabs) return;
    tabs.querySelectorAll(".ig-tab").forEach((t) => {
      const on = t.dataset.igGo === key;
      t.classList.toggle("is-active", on);
      t.setAttribute("aria-selected", String(on));
      if (on && tabs.scrollWidth > tabs.clientWidth) t.scrollIntoView({ block: "nearest", inline: "nearest" });
    });
  }
  function go(key) {
    const view = investmentView();
    const target = view && view.querySelector(`[data-ig-section="${key}"]`);
    if (!target) return;
    target.scrollIntoView({ behavior: reduceMotion() ? "auto" : "smooth", block: "start" });
    target.classList.remove("ig-flash");
    void target.offsetWidth;
    target.classList.add("ig-flash");
    lockUntil = Date.now() + 1400;
    setActive(key);
  }

  let io = null;
  let lockUntil = 0;
  const seen = new Map();
  function watchSections(view) {
    if (!("IntersectionObserver" in window)) return;
    const targets = [...view.querySelectorAll("[data-ig-section]")];
    if (io && targets.length === seen.size && targets.every((t) => seen.has(t))) return;
    if (io) io.disconnect();
    seen.clear();
    io = new IntersectionObserver((entries) => {
      entries.forEach((e) => seen.set(e.target, e.isIntersecting ? e.intersectionRatio : 0));
      if (Date.now() < lockUntil) return;
      // Scrollspy: bagian terakhir yang judulnya sudah melewati tab lengket.
      const ordered = [...seen.keys()].sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top);
      let best = ordered[0] || null;
      ordered.forEach((el) => { if (el.getBoundingClientRect().top <= 120) best = el; });
      if (best) setActive(best.dataset.igSection);
    }, { rootMargin: "-80px 0px -45% 0px", threshold: [0, 0.01, 0.25] });
    targets.forEach((t) => { seen.set(t, 0); io.observe(t); });
  }

  document.addEventListener("click", (event) => {
    const trigger = event.target.closest && event.target.closest("[data-ig-go]");
    if (!trigger || !trigger.closest(".ig-hero, .ig-tabs")) return;
    event.preventDefault();
    go(trigger.dataset.igGo);
  });
  document.addEventListener("keydown", (event) => {
    const tab = event.target.closest && event.target.closest(".ig-tab");
    if (!tab || !tabs || (event.key !== "ArrowRight" && event.key !== "ArrowLeft")) return;
    const list = [...tabs.querySelectorAll(".ig-tab")];
    const i = list.indexOf(tab);
    list[(i + (event.key === "ArrowRight" ? 1 : list.length - 1)) % list.length].focus();
    event.preventDefault();
  });

  /* ---------- lifecycle ---------- */
  let timer = null;
  const schedule = (delay = 120) => { clearTimeout(timer); timer = setTimeout(render, delay); };
  const own = (node) => node && node.nodeType === 1 && node.closest && node.closest("[data-ig-own]");
  let viewObserver = null;
  let observedView = null;
  function hookView() {
    const view = investmentView();
    if (!view || view === observedView) return;
    observedView = view;
    if (viewObserver) viewObserver.disconnect();
    // redesign.js mengganti isi tampilan saat data berubah; sisipkan ulang banner setelahnya.
    viewObserver = new MutationObserver((mutations) => {
      for (const m of mutations) {
        const node = m.target.nodeType === 1 ? m.target : m.target.parentElement;
        if (!own(node)) { schedule(); return; }
      }
    });
    viewObserver.observe(view, { childList: true, subtree: true, characterData: true });
    schedule(0);
  }
  new MutationObserver(hookView).observe(dashboard, { childList: true });
  hookView();
  schedule(400);
})();
