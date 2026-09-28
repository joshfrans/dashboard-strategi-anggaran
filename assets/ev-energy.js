/* Add-on Kendaraan Listrik — Kesiapan Infrastruktur EV (2026-09)
 * Menyisipkan banner bernuansa kendaraan listrik & SPKLU dan tab navigasi bagian ke
 * dalam tampilan Kesiapan Infrastruktur EV yang sudah ada (setelah header & strip
 * sumber). Tidak ada elemen lama yang dihapus: angka dibaca dari
 * evInfrastructureData (script.js) dengan rumus yang sama seperti redesign.js.
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
    plug: '<path d="M9 3v5M15 3v5"/><path d="M6 8h12v3a6 6 0 0 1-12 0z"/><path d="M12 17v4"/>',
    bolt: '<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',
    route: '<circle cx="6" cy="18" r="2.5"/><circle cx="18" cy="6" r="2.5"/><path d="M8.5 18H15a3 3 0 0 0 0-6H9a3 3 0 0 1 0-6h6.5"/>',
    pin: '<path d="M12 21s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12z"/><circle cx="12" cy="9" r="2.5"/>',
    list: '<path d="M9 6h11M9 12h11M9 18h11"/><path d="M4 6h.01M4 12h.01M4 18h.01"/>',
    bars: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
    warn: '<path d="M12 4 2.5 20h19z"/><path d="M12 10v4"/><path d="M12 17h.01"/>',
    idea: '<path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z"/>',
    map: '<path d="m9 4-6 2v14l6-2 6 2 6-2V4l-6 2z"/><path d="M9 4v14M15 6v14"/>',
    grid: '<rect x="3" y="3" width="7.5" height="7.5" rx="1.5"/><rect x="13.5" y="3" width="7.5" height="7.5" rx="1.5"/><rect x="3" y="13.5" width="7.5" height="7.5" rx="1.5"/><rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1.5"/>',
    arrow: '<path d="M5 12h14"/><path d="m13 6 6 6-6 6"/>'
  };
  const chip = (tone, label) => `<span class="eg-chip ${tone}">${svg(CHIP_ICON[tone] || CHIP_ICON.neutral)}${esc(label)}</span>`;

  /* Ilustrasi kendaraan listrik: SPKLU beratap panel surya mengisi daya mobil listrik,
     jaringan titik SPKLU yang berdenyut, dan jalan (SVG vektor, aman untuk CSP). */
  const NODES = [[40, 40], [96, 22], [150, 52], [212, 30], [268, 58], [330, 26], [392, 50], [450, 24], [512, 46]];
  const network = () => {
    let lines = "";
    for (let i = 0; i < NODES.length - 1; i += 1) lines += `M${NODES[i][0]} ${NODES[i][1]} L${NODES[i + 1][0]} ${NODES[i + 1][1]} `;
    lines += "M96 22 L212 30 M268 58 L392 50 M330 26 L450 24";
    const dots = NODES.map(([x, y]) => `<circle class="eg-node" cx="${x}" cy="${y}" r="4" fill="#22d3ee"/><circle cx="${x}" cy="${y}" r="9" fill="#22d3ee" opacity=".16"/>`).join("");
    return `<path d="${lines}" stroke="#7fd8e8" stroke-width="1" opacity=".45" fill="none"/>${dots}`;
  };
  const ILLUSTRATION = `<svg class="eg-art" viewBox="0 0 560 230" role="img" aria-label="Ilustrasi kendaraan listrik mengisi daya di SPKLU beratap panel surya dengan jaringan titik SPKLU di latar">
    <defs>
      <radialGradient id="egGlow" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#22d3ee" stop-opacity=".45"/><stop offset="1" stop-color="#22d3ee" stop-opacity="0"/></radialGradient>
      <linearGradient id="egRoad" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1b4a63"/><stop offset="1" stop-color="#0d2c3f"/></linearGradient>
      <linearGradient id="egCar" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f4f8fc"/><stop offset="1" stop-color="#c9d9e8"/></linearGradient>
    </defs>
    <circle cx="300" cy="120" r="140" fill="url(#egGlow)"/>
    <g>${network()}</g>
    <path d="M0 188 H560 V230 H0Z" fill="url(#egRoad)"/>
    <path class="eg-road" d="M0 210 H560" stroke="#ffd24a" stroke-width="3" stroke-dasharray="22 18" opacity=".8"/>
    <g transform="translate(150 78)">
      <path d="M-14 0 L150 0 L140 -14 L-4 -14Z" fill="#1d3f8f" stroke="#9fc3f0" stroke-width="1"/>
      <path d="M14 -14 L10 0 M42 -14 L38 0 M70 -14 L66 0 M98 -14 L94 0 M126 -14 L122 0 M-9 -7 H145" stroke="#6f9fe0" stroke-width=".8"/>
      <rect x="0" y="0" width="8" height="110" fill="#dbe8f7"/>
      <rect x="126" y="0" width="8" height="110" fill="#dbe8f7"/>
      <g transform="translate(22 40)">
        <rect x="0" y="0" width="34" height="70" rx="7" fill="#f4f8fc"/>
        <rect x="6" y="8" width="22" height="16" rx="2" fill="#0b5f70"/>
        <path d="M18.5 29 12 41h5l-1.5 10 7-13h-5z" fill="#0e9aa7"/>
        <rect x="6" y="58" width="22" height="4" rx="2" fill="#22d3ee"/>
      </g>
      <path class="eg-flow" d="M56 70 C 80 70 86 104 118 100" stroke="#22d3ee" stroke-width="3" fill="none" stroke-dasharray="4 8" stroke-linecap="round"/>
      <path d="M56 70 C 80 70 86 104 118 100" stroke="#e8f1f8" stroke-width="1.2" fill="none" opacity=".6"/>
    </g>
    <g transform="translate(262 142)">
      <path d="M6 44 C 6 30 16 26 30 24 L58 8 C 64 5 72 4 80 4 H138 C 150 4 160 10 168 20 L178 30 C 186 31 194 36 194 44 V50 H6Z" fill="url(#egCar)"/>
      <path d="M64 12 H100 V28 H44Z" fill="#6aa6dc"/><path d="M106 12 H140 C 146 12 152 18 158 28 H106Z" fill="#6aa6dc"/>
      <circle cx="46" cy="50" r="13" fill="#14213d"/><circle cx="46" cy="50" r="5" fill="#c9d6e6"/>
      <circle cx="154" cy="50" r="13" fill="#14213d"/><circle cx="154" cy="50" r="5" fill="#c9d6e6"/>
      <circle cx="20" cy="34" r="4" fill="#22d3ee"/>
      <rect x="176" y="34" width="12" height="5" rx="2" fill="#ffd24a"/>
    </g>
    <g transform="translate(310 102)">
      <rect x="0" y="0" width="70" height="28" rx="6" fill="#0d2c3f" stroke="#a5f3fc" stroke-width="2"/>
      <rect x="70" y="9" width="5" height="10" rx="1.5" fill="#a5f3fc"/>
      <rect class="eg-charge" x="5" y="5" width="60" height="18" rx="3" fill="#22d3ee"/>
      <path d="M38 4 29 15h6l-2 9 9-12h-6z" fill="#ffd24a"/>
    </g>
    <g transform="translate(486 108)">
      <path d="M0 58 C -16 36 -24 26 -24 14 A24 24 0 0 1 24 14 C 24 26 16 36 0 58Z" fill="#ffd24a"/>
      <circle cx="0" cy="12" r="13" fill="#14213d"/>
      <path d="M3 2 -5 14h5l-2 8 8-11h-5z" fill="#ffd24a"/>
    </g>
  </svg>`;

  /* ---------- data ---------- */
  const evView = () => dashboard.querySelector(':scope > .rd-view[data-rd="ev-infra"]');
  const cardByTitle = (root, re) => [...root.querySelectorAll(":scope .rd-card")].find((c) => re.test(c.querySelector(".rd-card-head h2")?.textContent || ""));
  const fmt = (v, dg = 0) => Number(v).toLocaleString("id-ID", { minimumFractionDigits: dg, maximumFractionDigits: dg });
  const pctText = (n, total) => (total ? `${fmt(n / total * 100, 1)}%` : "—");
  // Sama dengan redesign.js: "241,6 km - 241,6 km" ditampilkan sekali.
  const range = (r) => { const p = String(r || "").split(/\s+-\s+/); return p.length === 2 && p[0].replace(/\s*km/i, "") === p[1].replace(/\s*km/i, "") ? p[1] : String(r || "—"); };

  function collect() {
    let d = {};
    try { d = (typeof evInfrastructureData === "object" && evInfrastructureData) ? evInfrastructureData : {}; } catch (e) { d = {}; }
    const cats = d.categories || [];
    const by = Object.fromEntries(cats.map((c) => [c.label, c]));
    const total = d.implementingUnits || cats.reduce((s, c) => s + (c.units || 0), 0);
    const near = (by["Satu Lokasi"]?.units || 0) + (by["< 5 KM"]?.units || 0);
    const groups = d.riskGroups || [];
    const farthest = [...groups].reverse().find((g) => g.units > 0);
    const fast = (d.chargingAccess || []).find((a) => /fast/i.test(a.label || ""));
    return {
      source: d.sourceUpdated || "", total, near, far: total - near,
      nearPct: total ? near / total * 100 : NaN,
      spklu: d.spkluLocations || 0, chargers: d.chargerUnits || 0,
      fast, farthest, recs: (d.recommendations || []).length
    };
  }

  /* ---------- sections for tabs ---------- */
  const SECTIONS = [
    { key: "ringkasan", label: "Ringkasan", icon: "grid", find: (v) => v.querySelector(":scope > .rd-grid.k5") },
    { key: "distribusi", label: "Distribusi jarak", icon: "bars", find: (v) => cardByTitle(v, /^Distribusi/i) },
    { key: "risiko", label: "UP > 5 km", icon: "warn", find: (v) => cardByTitle(v, /SPKLU terdekat > 5 km/i) },
    { key: "rekomendasi", label: "Rekomendasi Direksi", icon: "list", find: (v) => cardByTitle(v, /Rekomendasi/i) },
    { key: "insight", label: "Highlight insight", icon: "idea", find: (v) => cardByTitle(v, /Highlight insight/i) },
    { key: "peta", label: "Peta geolokasi", icon: "map", find: () => document.querySelector("#evInfraView .ev-geo-card") }
  ];
  const sectionEl = (key) => {
    const view = evView();
    if (key === "peta") return document.querySelector('#evInfraView [data-eg-section="peta"]');
    return view && view.querySelector(`[data-eg-section="${key}"]`);
  };
  function tagSections(view) {
    SECTIONS.forEach((s) => {
      const el = s.find(view);
      if (el && el.dataset.egSection !== s.key) el.dataset.egSection = s.key;
    });
  }

  /* ---------- render ---------- */
  let hero = null;
  let tabs = null;
  let lastHero = "";

  function heroHtml(d) {
    const tone = !Number.isFinite(d.nearPct) ? "neutral" : d.nearPct >= 90 ? "good" : d.nearPct >= 70 ? "watch" : "serious";
    const toneLabel = { good: "Siap untuk pilot", watch: "Perlu penguatan", serious: "Belum siap", neutral: "Belum ada data" }[tone];
    const stat = (key, icon, label, value, sub) => `
      <button type="button" class="eg-stat" data-eg-go="${key}" aria-label="${esc(`${label}: ${value}. ${sub}. Buka bagian ${label}`)}">
        <span class="eg-stat-ico">${svg(ICON[icon])}</span>
        <span class="eg-stat-body"><span class="eg-stat-label">${esc(label)}</span><b>${esc(value)}</b><small>${esc(sub)}</small></span>
        ${svg(ICON.arrow, "eg-stat-go")}
      </button>`;
    const lead = d.total ? `${fmt(d.near)} dari ${fmt(d.total)} unit pelaksana punya SPKLU di lokasi atau < 5 km · jaringan ${fmt(d.spklu)} lokasi SPKLU · ${fmt(d.chargers)} charger` : "Data kesiapan SPKLU belum tersedia.";
    const far = d.farthest;
    return `
      <div class="eg-hero-copy">
        <p class="eg-eyebrow">Transisi kendaraan listrik PLN · kesiapan jaringan SPKLU${d.source ? ` · analisis ${esc(d.source)}` : ""}</p>
        <div class="eg-nko">
          <span class="eg-nko-label">UP siap charging (≤ 5 km)</span>
          <span class="eg-nko-row"><b class="eg-nko-val">${esc(Number.isFinite(d.nearPct) ? `${fmt(d.nearPct, 1)}%` : "—")}</b><span class="eg-nko-tgt">dari ${esc(fmt(d.total))} UP</span>${chip(tone, toneLabel)}</span>
          <span class="eg-nko-lead">${esc(lead)}</span>
        </div>
      </div>
      <div class="eg-stats">
        ${stat("distribusi", "bolt", "Akses fast charging", d.fast ? `${fmt(d.fast.units)} UP` : "—", d.fast ? `${fmt(d.fast.percent, 1)}% · dalam radius 300 km` : "data belum tersedia")}
        ${stat("risiko", "route", "Perlu dukungan charging", `${fmt(d.far)} UP`, `${pctText(d.far, d.total)} dengan SPKLU > 5 km`)}
        ${stat("peta", "pin", "Unit terjauh", far ? (far.unitsList?.[0] || "—") : "—", far ? `SPKLU terdekat ${range(far.range)}` : "tidak ada unit > 5 km")}
        ${stat("rekomendasi", "list", "Rekomendasi Direksi", `${fmt(d.recs)} langkah`, "pilot, prioritas, monitoring, pengecualian")}
      </div>
      <div class="eg-hero-art">${ILLUSTRATION}</div>`;
  }

  function tabsHtml() {
    return `<div class="eg-tabs-inner" role="tablist" aria-label="Bagian Kesiapan Infrastruktur EV">${SECTIONS.map((s, i) => `
      <button type="button" class="eg-tab${i === 0 ? " is-active" : ""}" role="tab" aria-selected="${i === 0}" data-eg-go="${s.key}">${svg(ICON[s.icon])}<span>${esc(s.label)}</span></button>`).join("")}</div>`;
  }

  // Sisipkan setelah strip sumber (atau header) di dalam tampilan Kesiapan Infrastruktur EV.
  function place(view) {
    if (!hero) {
      hero = document.createElement("section");
      hero.className = "eg-hero";
      hero.dataset.egOwn = "1";
      hero.setAttribute("aria-label", "Sorotan Kesiapan Infrastruktur EV");
    }
    if (!tabs) {
      tabs = document.createElement("nav");
      tabs.className = "eg-tabs";
      tabs.dataset.egOwn = "1";
      tabs.setAttribute("aria-label", "Navigasi bagian Kesiapan Infrastruktur EV");
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
    const view = evView();
    if (!view || !view.firstElementChild) return;
    place(view);
    tagSections(view);
    let html = "";
    try { html = heroHtml(collect()); } catch (error) {
      console.warn("Banner EV gagal dirender:", error);
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
    tabs.querySelectorAll(".eg-tab").forEach((t) => {
      const on = t.dataset.egGo === key;
      t.classList.toggle("is-active", on);
      t.setAttribute("aria-selected", String(on));
      if (on && tabs.scrollWidth > tabs.clientWidth) t.scrollIntoView({ block: "nearest", inline: "nearest" });
    });
  }
  function go(key) {
    const target = sectionEl(key);
    if (!target) return;
    target.scrollIntoView({ behavior: reduceMotion() ? "auto" : "smooth", block: "start" });
    target.classList.remove("eg-flash");
    void target.offsetWidth;
    target.classList.add("eg-flash");
    lockUntil = Date.now() + 1400;
    setActive(key);
  }

  let io = null;
  let lockUntil = 0;
  const seen = new Map();
  function watchSections(view) {
    if (!("IntersectionObserver" in window)) return;
    const targets = [...view.querySelectorAll("[data-eg-section]"), ...document.querySelectorAll('#evInfraView [data-eg-section]')];
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
      if (best) setActive(best.dataset.egSection);
    }, { rootMargin: "-80px 0px -45% 0px", threshold: [0, 0.01, 0.25] });
    targets.forEach((t) => { seen.set(t, 0); io.observe(t); });
  }

  document.addEventListener("click", (event) => {
    const trigger = event.target.closest && event.target.closest("[data-eg-go]");
    if (!trigger || !trigger.closest(".eg-hero, .eg-tabs")) return;
    event.preventDefault();
    go(trigger.dataset.egGo);
  });
  document.addEventListener("keydown", (event) => {
    const tab = event.target.closest && event.target.closest(".eg-tab");
    if (!tab || !tabs || (event.key !== "ArrowRight" && event.key !== "ArrowLeft")) return;
    const list = [...tabs.querySelectorAll(".eg-tab")];
    const i = list.indexOf(tab);
    list[(i + (event.key === "ArrowRight" ? 1 : list.length - 1)) % list.length].focus();
    event.preventDefault();
  });

  /* ---------- lifecycle ---------- */
  let timer = null;
  const schedule = (delay = 120) => { clearTimeout(timer); timer = setTimeout(render, delay); };
  const own = (node) => node && node.nodeType === 1 && node.closest && node.closest("[data-eg-own]");
  let viewObserver = null;
  let observedView = null;
  function hookView() {
    const view = evView();
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
