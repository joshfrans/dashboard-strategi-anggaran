/* Redesain 2026 — Dashboard GA
 * Merender tampilan baru untuk Strategi & Evaluasi, Investasi, Anggaran
 * Korporat, dan Kesiapan Infrastruktur EV dari data live yang sama dengan
 * tampilan lama (script.js). Anggaran Kantor Pusat (iframe) diberi tema yang
 * sama. Tombol aksi memakai handler lama (import, export, detail) sehingga
 * alur data tidak berubah. Tambahkan ?legacy=1 pada URL untuk tampilan lama.
 */
(function () {
  "use strict";

  const params = new URLSearchParams(window.location.search);
  if (params.get("legacy") === "1") return;

  const dashboard = document.querySelector("main.dashboard, .dashboard");
  if (!dashboard) return;
  document.body.classList.add("rd-enabled");

  /* ---------------- helpers ---------------- */
  const has = (name) => typeof window[name] === "function";
  const call = (name, ...args) => {
    try { return has(name) ? window[name](...args) : undefined; } catch (error) { return undefined; }
  };
  const esc = (value) => String(value ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const num = (value, fallback = NaN) => {
    if (typeof value === "number") return Number.isFinite(value) ? value : fallback;
    const match = String(value ?? "").replace(/\s/g, "").match(/-?[\d.]*\d(?:,\d+)?/);
    if (!match) return fallback;
    const parsed = Number(match[0].replace(/\./g, "").replace(",", "."));
    return Number.isFinite(parsed) ? parsed : fallback;
  };
  const fmt = (value, digits = 0) => Number(value).toLocaleString("id-ID", { minimumFractionDigits: digits, maximumFractionDigits: digits });
  const fmtPct = (value, digits = 1) => {
    const n = Number(value);
    if (!Number.isFinite(n)) return "—";
    const d = Number.isInteger(n) ? 0 : digits;
    return `${fmt(n, d)}%`;
  };
  const clamp = (value, min = 0, max = 100) => Math.max(min, Math.min(max, Number(value) || 0));
  const text = (selector, root = document) => (root.querySelector(selector)?.textContent || "").replace(/\s+/g, " ").trim();
  const safeGlobal = (getter, fallback) => { try { const v = getter(); return v === undefined ? fallback : v; } catch (error) { return fallback; } };

  const ICON = {
    check: '<path d="M20 6 9 17l-5-5"/>',
    warn: '<path d="M12 7v6"/><path d="M12 16.5v.5"/><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/>',
    alert: '<path d="M12 8v5"/><path d="M12 16.5v.5"/><circle cx="12" cy="12" r="9"/>',
    x: '<path d="M18 6 6 18"/><path d="M6 6l12 12"/>',
    minus: '<circle cx="12" cy="12" r="9"/><path d="M8 12h8"/>',
    grid: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
    target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
    trend: '<path d="M3 17l6-6 4 4 8-8"/><path d="M15 7h6v6"/>',
    file: '<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6"/>',
    down: '<path d="M12 4v12"/><path d="m6 10 6 6 6-6"/><path d="M4 20h16"/>',
    up: '<path d="M12 20V8"/><path d="m6 14 6-6 6 6"/><path d="M4 4h16"/>',
    cal: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
    ext: '<path d="M14 4h6v6"/><path d="M20 4 10 14"/><path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>',
    pin: '<path d="M12 21s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12z"/><circle cx="12" cy="9" r="2.5"/>',
    bolt: '<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',
    building: '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M9 7h.01M15 7h.01M9 11h.01M15 11h.01M9 15h.01M15 15h.01"/>'
  };
  const ico = (name, extra = "") => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${extra}>${ICON[name] || ""}</svg>`;
  const CHIP_ICON = { good: "check", watch: "warn", serious: "alert", critical: "x", neutral: "minus" };
  const chip = (tone, label, small = true) => `<span class="rd-chip ${tone}${small ? " sm" : ""}">${ico(CHIP_ICON[tone] || "minus")}${esc(label)}</span>`;
  const bar = (pct, color = "", tick = null, cls = "") => `<div class="rd-bar ${cls}"><i style="width:${clamp(pct).toFixed(2)}%;${color ? `background:${color}` : ""}"></i>${tick === null ? "" : `<span class="rd-tick" style="left:calc(${clamp(tick)}% - 1px)"></span>`}</div>`;
  const kpi = ({ label, value, unit = "", sub = "", foot = "", barPct = null, barColor = "", icon = "" }) => `
    <div class="rd-kpi">
      <div class="rd-kpi-top"><span>${esc(label)}</span>${icon ? `<span class="rd-kpi-ico">${ico(icon)}</span>` : ""}</div>
      <div class="rd-kpi-val">${esc(value)}${unit ? `<small>${esc(unit)}</small>` : ""}</div>
      ${barPct === null ? "" : bar(barPct, barColor, null, "h6")}
      ${sub ? `<div class="rd-kpi-sub">${esc(sub)}</div>` : ""}
      ${foot ? `<div class="rd-kpi-foot">${foot}</div>` : ""}
    </div>`;
  const cardHead = (title, sub = "", actions = "") => `
    <div class="rd-card-head"><div><h2>${esc(title)}</h2>${sub ? `<p>${esc(sub)}</p>` : ""}</div>${actions ? `<div class="rd-actions">${actions}</div>` : ""}</div>`;
  const btn = (label, { icon = "", primary = false, small = false, attrs = "" } = {}) =>
    `<button type="button" class="rd-btn${primary ? " primary" : ""}${small ? " small" : ""}" ${attrs}>${icon ? ico(icon) : ""}${esc(label)}</button>`;
  const proxy = (selector) => `data-rd-proxy="${esc(selector)}"`;
  const brk = (items) => items.map(([color, n, label]) => `<span class="rd-brk"><i style="background:${color}"></i><b>${esc(n)}</b> ${esc(label)}</span>`).join("");
  const freshChip = (freshness, label) => {
    if (!freshness || !freshness.known) return chip("neutral", `${label} · tanggal sumber belum tersedia`, false);
    return freshness.stale
      ? chip("serious", `${label} · usang ${freshness.ageDays} hari`, false)
      : chip("good", `${label} · ${freshness.ageDays ? `${freshness.ageDays} hari lalu` : "hari ini"}`, false);
  };
  const header = (eyebrow, title, sub, actions) => `
    <header class="rd-header"><div><span class="rd-eyebrow">${esc(eyebrow)}</span><h1>${esc(title)}</h1>${sub ? `<p>${esc(sub)}</p>` : ""}</div><div class="rd-actions">${actions}</div></header>`;

  const ui = { entities: false, types: false, prep: false };
  const C = { acc: "#1f4fa3", ctx: "#9db4e0", line: "#d5dae3", amber: "#b7791f", serious: "#a8380b", critical: "#a61b1b", grey: "#8a94a8" };

  /* ---------------- containers ---------------- */
  const containers = {};
  function ensureContainer(key, beforeEl) {
    if (containers[key]) return containers[key];
    const el = document.createElement("div");
    el.className = "rd-view";
    el.dataset.rd = key;
    el.setAttribute("aria-live", "off");
    if (beforeEl && beforeEl.parentNode === dashboard) dashboard.insertBefore(el, beforeEl);
    else dashboard.appendChild(el);
    containers[key] = el;
    return el;
  }

  /* ================= STRATEGI & EVALUASI ================= */
  const POLICY_SHORT = [
    [/kebijakan strategis manajemen aset/i, "KS Aset Properti", "Aset properti"],
    [/pendayagunaan aset/i, "SPo Pendaya­gunaan AP", "Aset properti"],
    [/aset properti/i, "Aset Properti", "Aset properti"],
    [/kebijakan strategis pengelolaan naskah/i, "KS Naskah & Arsip", "Kearsipan"],
    [/pengelolaan naskah dinas/i, "SPo Naskah Dinas", "Kearsipan"],
    [/standar prosedur kearsipan/i, "SPo Kearsip­an", "Kearsipan"],
    [/jadwal retensi/i, "Jadwal Retensi Arsip", "Kearsipan"],
    [/klasifikasi keamanan/i, "Klasifi­kasi Akses Arsip", "Kearsipan"],
    [/^arsip$/i, "Arsip", "Kearsipan"],
    [/perjalanan dinas pegawai/i, "SPo SPPD Pegawai", "Perj. dinas"],
    [/perjalanan dinas \(juknis/i, "Juknis SPPD", "Perj. dinas"],
    [/sppd|perjalanan/i, "SPPD", "Perj. dinas"],
    [/pagu, dan skema|pagu dan skema|skema pembayaran kendaraan/i, "Kepdir Pagu BFKO", "Fasilitas & BFKO"],
    [/pelaksanaan pemberian bfko/i, "Juknis BFKO", "Fasilitas & BFKO"],
    [/standardisasi fasilitas|fasilitas kerja/i, "Standar Fasilitas Kerja", "Fasilitas & BFKO"],
    [/kblbb|kendaraan operasional/i, "Juknis KBLBB", "Fasilitas & BFKO"],
    [/bfko/i, "BFKO", "Fasilitas & BFKO"],
    [/indirect procurement/i, "Indirect Procure­ment", "Pengadaan"]
  ];
  function policyShort(name) {
    for (const [re, short, group] of POLICY_SHORT) if (re.test(name)) return { short, group };
    const clean = String(name).replace(/\(.*?\)/g, "").trim();
    return { short: clean.length > 28 ? `${clean.slice(0, 26)}…` : clean, group: "Lainnya" };
  }

  function statusFromDate(row, doneWord = "Selesai") {
    const done = String(row.status || "").toLowerCase() === doneWord.toLowerCase() || Number(row.progress) >= 100;
    if (done) return { tone: "good", label: "Selesai", rank: 3, late: 0 };
    const late = call("overdueDays", row.target) || 0;
    if (late > 90) return { tone: "critical", label: `Terlambat ${late} hari`, rank: 0, late };
    if (late > 0) return { tone: "serious", label: `Terlambat ${late} hari`, rank: 0, late };
    if (/belum/i.test(row.status || "")) return { tone: "neutral", label: "Belum mulai", rank: 2, late: 0 };
    const targetDate = call("parseDashboardTargetDate", row.target);
    if (targetDate) {
      const days = Math.ceil((targetDate.getTime() - Date.now()) / 86400000);
      if (days <= 45 && Number(row.progress) < 50) return { tone: "watch", label: `Sisa ${days} hari`, rank: 1, late: 0 };
      return { tone: "good", label: "Sesuai jalur", rank: 1, late: 0 };
    }
    return { tone: "neutral", label: "On progress", rank: 1, late: 0 };
  }

  function renderStrategy() {
    const metrics = call("policyMetrics") || { total: 0, done: 0, onProgress: 0, noRatification: 0, entities: 0, types: 0 };
    const crRows = safeGlobal(() => crData, []);
    const prepRows = safeGlobal(() => policyPrepData, []);
    const beRows = safeGlobal(() => businessExcellenceData, []);
    const columns = safeGlobal(() => policyColumns, []);
    const policyRows = safeGlobal(() => policyData, []);
    const periodKey = call("strategyPeriodKey") || "";
    const periodLabel = call("strategyPeriodFullLabel") || "";
    const rows = call("performanceRowsForPeriodKey", periodKey) || [];
    const measured = !!call("hasTrustedPerformanceMeasurement", periodKey, rows);
    const score = measured ? call("calculatePerformanceScore") : NaN;
    const summary = call("getPerformanceStatusSummary") || { total: 10, green: 0, amber: 0, red: 0, gray: 10 };
    const scoreStatus = measured ? (call("performanceScoreStatus", score, summary) || {}) : { tone: "gray", label: "Belum diukur" };
    const toneMap = { green: "good", amber: "watch", red: "serious", gray: "neutral", neutral: "neutral" };
    const nkoText = measured ? (call("nkoLabel", score) || fmt(score, 2)) : "—";
    const sourceDesc = measured ? (call("performanceSourceDescription") || "") : "";

    const crDone = crRows.filter((r) => String(r.status).toLowerCase() === "selesai").length;
    const crNotStarted = crRows.filter((r) => /belum/i.test(r.status || "")).length;
    const crOpen = crRows.length - crDone - crNotStarted;
    const crAvg = crRows.length ? crRows.reduce((s, r) => s + (Number(r.progress) || 0), 0) / crRows.length : 0;
    const crSorted = crRows.map((r) => ({ r, s: statusFromDate(r) }))
      .sort((a, b) => a.s.rank - b.s.rank || b.s.late - a.s.late || (Number(a.r.progress) || 0) - (Number(b.r.progress) || 0));
    const crLate = crSorted.filter((x) => x.s.late > 0).length;

    const prepSorted = prepRows.map((r) => ({ r, s: statusFromDate(r) })).sort((a, b) => a.s.rank - b.s.rank || b.s.late - a.s.late);
    const prepDone = prepSorted.filter((x) => x.s.tone === "good" && x.s.label === "Selesai").length;
    const prepLate = prepSorted.filter((x) => x.s.late > 0).length;
    const prepOpen = prepRows.length - prepDone;

    const be1 = beRows[0];
    const beValue = be1 && Number.isFinite(num(be1.realization)) ? fmt(num(be1.realization), 2) : "—";

    const sourceStatus = text("#strategySourceStatus");
    const lastUpdated = text("[data-last-updated]");
    const freshness = call("strategyDataFreshness");

    /* KPI */
    const kpis = `<div class="rd-grid k5">
      ${kpi({ label: "Ratifikasi kebijakan", value: fmt(metrics.total), unit: "status", icon: "check", foot: brk([[C.acc, fmt(metrics.done), "selesai"], [C.ctx, fmt(metrics.onProgress), "on progress"], [C.line, fmt(metrics.noRatification), "tidak ratifikasi"]]) })}
      ${kpi({ label: "Change Request aplikasi", value: fmt(crRows.length), unit: "CR", icon: "grid", foot: brk([[C.acc, crDone, "selesai"], [C.ctx, crOpen, "on progress"], [C.line, crNotStarted, "belum mulai"]]) + (crLate ? chip("critical", `${crLate} terlambat`) : "") })}
      ${kpi({ label: "Penyusunan kebijakan", value: fmt(prepRows.length), unit: "juknis", icon: "file", foot: brk([[C.acc, prepDone, "selesai"], [C.ctx, prepOpen, "on progress"]]) + (prepLate ? chip("serious", `${prepLate} terlambat`) : "") })}
      ${kpi({ label: `NKO ${periodLabel ? "s.d. " + periodLabel : ""}`, value: nkoText, icon: "target", foot: chip(toneMap[scoreStatus.tone] || "neutral", scoreStatus.label || "Belum diukur") + `<span class="rd-kpi-sub">target 100</span>` })}
      ${kpi({ label: "Business Excellence", value: beValue, icon: "trend", foot: beRows.map((b) => chip(/tercapai/i.test(b.status || "") ? "good" : "neutral", `${b.semester}: ${b.status}`)).join("") })}
    </div>`;

    /* NKO bullet */
    const MAX = 120;
    const main = rows.filter((r) => String(r?.no ?? "").trim());
    const statusLabel = (bucket) => ({ green: "Tercapai", amber: "Hampir tercapai", red: "Perlu peningkatan", gray: "Belum diukur" }[bucket] || "Belum diukur");
    const nkoRows = main.map((r) => {
      const bucket = call("performanceStatusBucket", r) || "gray";
      const ach = call("performanceIndicatorNko", r);
      const w = num(r.weight);
      const sc = num(r.score);
      const tone = toneMap[bucket] || "neutral";
      const name = String(r.indicator || "").replace(/\s*\(.*?\)\s*/g, " ").replace(/\s+/g, " ").trim();
      let plot;
      if (bucket === "gray" || !Number.isFinite(ach)) {
        plot = `<div class="rd-bullet-empty">belum dinilai</div>`;
      } else {
        const cls = bucket === "green" ? "" : bucket === "amber" ? "warn" : "bad";
        plot = `<div class="rd-bullet" role="img" aria-label="${esc(name)} capaian ${esc(fmtPct(ach, 2))} terhadap target 100%"><span class="track"></span><span class="zone" style="width:${(100 / MAX * 100).toFixed(2)}%"></span><span class="val ${cls}" style="width:${(clamp(ach, 0, MAX) / MAX * 100).toFixed(2)}%"></span><span class="tgt" style="left:calc(${(100 / MAX * 100).toFixed(2)}% - 1px)"></span></div>`;
      }
      return `<div class="rd-nko-row" role="row"><span role="cell" title="${esc(r.indicator)}">${esc(name)}</span><span role="cell" class="r" style="color:var(--rd-ink-2)">${Number.isFinite(w) ? esc(fmt(w)) : "—"}</span><span role="cell">${plot}</span><span role="cell" class="r"><b>${Number.isFinite(ach) && bucket !== "gray" ? esc(fmtPct(ach, 2)) : "—"}</b></span><span role="cell" class="r">${Number.isFinite(sc) && bucket !== "gray" ? esc(fmt(sc, sc % 1 && String(r.score).split(/[.,]/)[1]?.length > 2 ? 3 : 2)) : "—"}</span><span role="cell">${chip(tone, statusLabel(bucket))}</span></div>`;
    }).join("");
    const axis = [0, 50, 100].map((v) => `<span style="left:${(v / MAX * 100).toFixed(2)}%">${v}%</span>`).join("");
    const nkoCard = `<section class="rd-card">
      ${cardHead(`Monitoring kinerja · NKO per indikator`, `Batang = capaian, garis tegak = target 100%; skala sama 0–120% (capping 110%). ${sourceDesc || (measured ? "" : "Periode ini belum memiliki pengukuran NKO lengkap.")}`,
        `${btn(`Periode: ${periodLabel || "—"}`, { icon: "cal", small: true, attrs: proxy("#periodTrigger") + ' data-rd-scrolltop="1"' })}<button type="button" class="rd-link" data-detail="performance">Lihat semua →</button>`)}
      <div class="rd-scroll-x"><div class="rd-nko" role="table" aria-label="NKO per indikator ${esc(periodLabel)}">
        <div class="rd-nko-row head" role="row"><span>Indikator</span><span class="r">Bobot</span><span class="rd-axis">${axis}</span><span class="r">Capaian</span><span class="r">Nilai</span><span>Status</span></div>
        ${nkoRows || `<div class="rd-nko-row"><span style="grid-column:1/-1;color:var(--rd-ink-2)">Data indikator periode ini belum tersedia.</span></div>`}
        <div class="rd-nko-row total" role="row"><span><b style="font-size:15px">Total NKO</b></span><span class="r" style="color:var(--rd-ink-2)">100</span><span style="font-size:13px;color:var(--rd-ink-2)">${summary.green} tercapai · ${summary.amber} hampir tercapai · ${summary.red} perlu peningkatan · ${summary.gray} belum diukur</span><span></span><span class="r"><b style="font-size:18px">${esc(nkoText)}</b></span><span>${chip(toneMap[scoreStatus.tone] || "neutral", scoreStatus.label || "Belum diukur")}</span></div>
      </div></div>
    </section>`;

    /* CR table */
    const crBody = crSorted.map(({ r, s }) => {
      const p = clamp(r.progress);
      return `<tr><td><b>${esc(r.app)}</b><span class="sub">${esc(r.request)}</span></td>
        <td><div class="rd-cellbar">${bar(p, p >= 100 ? "#5b7fc4" : "", null, "h6")}<b>${esc(fmtPct(p, 2))}</b></div></td>
        <td>${chip(s.tone, s.label)}</td><td style="white-space:nowrap">${esc(r.target || "—")}</td></tr>`;
    }).join("");
    const crCard = `<section class="rd-card">
      ${cardHead("Timeline Change Request aplikasi", "Diurutkan: terlambat → berjalan → selesai. Progres mengikuti sheet utama List Monitoring CR Transformasi GA.", `<button type="button" class="rd-link" data-detail="cr">Lihat semua →</button>`)}
      <div class="rd-table-wrap"><table class="rd-table"><colgroup><col style="width:38%"><col style="width:28%"><col style="width:19%"><col style="width:15%"></colgroup>
        <thead><tr><th>Aplikasi &amp; change request</th><th>Progres</th><th>Status</th><th>Target selesai</th></tr></thead><tbody>${crBody}</tbody></table></div>
      <div class="rd-legend" style="color:var(--rd-ink-2)"><span><b style="color:var(--rd-ink)">${crRows.length}</b> total CR</span><span><b style="color:var(--rd-ink)">${crDone}</b> selesai</span><span><b style="color:var(--rd-ink)">${crOpen}</b> on progress</span><span><b style="color:var(--rd-ink)">${crNotStarted}</b> belum mulai</span><span>progres keseluruhan <b style="color:var(--rd-ink)">${esc(fmtPct(crAvg, 2))}</b></span></div>
    </section>`;

    const prepBody = prepSorted.map(({ r, s }) => `<tr><td><b>${esc(r.scope)}</b><span class="sub">${esc(r.area)} · target ${esc(r.target)}</span></td>
      <td><div class="rd-cellbar">${bar(r.progress, "", null, "h6")}<b>${esc(fmtPct(r.progress))}</b></div></td><td>${chip(s.tone, s.label)}</td></tr>`).join("");
    const prepFull = prepRows.map((r, i) => `<tr><td class="rd-num">${esc(r.no ?? i + 1)}</td><td>${esc(r.area)}</td><td><b>${esc(r.scope)}</b></td><td class="r">${esc(fmtPct(r.progress))}</td><td>${esc(r.status)}</td><td style="white-space:nowrap">${esc(r.target)}</td><td>${chip(statusFromDate(r).tone, statusFromDate(r).label)}</td></tr>`).join("");
    const prepCard = `<section class="rd-card">
      ${cardHead("Penyusunan kebijakan layanan GA", `${prepOpen} juknis on progress${prepLate ? `; ${prepLate} melewati target` : ""}.`, `<button type="button" class="rd-link" data-rd-toggle="prep" aria-expanded="${ui.prep}">${ui.prep ? "Ringkas ↑" : "Lihat semua →"}</button>`)}
      ${ui.prep
        ? `<div class="rd-table-wrap"><table class="rd-table"><thead><tr><th>No</th><th>Bidang</th><th>Lingkup</th><th class="r">Progres</th><th>Status sumber</th><th>Target</th><th>Keterangan</th></tr></thead><tbody>${prepFull || `<tr><td colspan="7">Belum ada data.</td></tr>`}</tbody></table></div>`
        : `<div class="rd-table-wrap"><table class="rd-table"><colgroup><col style="width:46%"><col style="width:26%"><col style="width:28%"></colgroup>
      <thead><tr><th>Lingkup</th><th>Progres</th><th>Status</th></tr></thead><tbody>${prepBody || `<tr><td colspan="3">Belum ada data.</td></tr>`}</tbody></table></div>`}
    </section>`;

    const beBody = beRows.map((b) => {
      const real = num(b.realization);
      return `<div class="rd-list-row" style="grid-template-columns:minmax(0,1fr) 70px 120px;align-items:center">
        <div><strong>${esc(b.semester)}</strong><span class="d">${esc(b.activity)}</span></div>
        <div><span class="rd-kpi-sub">Target</span><div class="rd-num" style="font-size:18px;font-weight:600">${esc(b.target)}</div></div>
        <div><span class="rd-kpi-sub">Realisasi</span><div class="rd-num" style="font-size:${Number.isFinite(real) ? 22 : 15}px;font-weight:${Number.isFinite(real) ? 700 : 600}">${Number.isFinite(real) ? esc(fmt(real, 2)) : esc(b.realization)}</div></div></div>`;
    }).join("");
    const beCard = `<section class="rd-card">${cardHead("Implementasi PLN Business Excellence", "", `<button type="button" class="rd-link" data-detail="business">Lihat semua →</button>`)}<div>${beBody}</div></section>`;

    /* Heatmap */
    const info = columns.map(policyShort);
    const groups = [];
    info.forEach((c) => { const last = groups[groups.length - 1]; if (last && last.name === c.group) last.span += 1; else groups.push({ name: c.group, span: 1 }); });
    const n = columns.length;
    const gridCols = `118px repeat(${n}, minmax(0, 1fr)) 104px`;
    let heat = `<div></div>${groups.map((g) => `<div class="grp" style="grid-column:span ${g.span}">${esc(g.name)}</div>`).join("")}<div></div>`;
    heat += `<div></div>${columns.map((c, i) => `<div class="col" lang="id" title="${esc(c)}">${esc(info[i].short)}</div>`).join("")}<div class="col" style="font-weight:600;color:var(--rd-ink-2)">Selesai /${n}</div>`;
    const colDone = new Array(n).fill(0);
    policyRows.forEach((row) => {
      const st = row.statuses || [];
      let d = 0, p = 0, x = 0;
      const cells = columns.map((col, i) => {
        const s = st[i];
        if (s === "done") { d++; colDone[i]++; return `<div class="cell done" title="${esc(row.entity)} · ${esc(col)}: Selesai">${ico("check")}</div>`; }
        if (s === "no-ratification") { x++; return `<div class="cell exc" title="${esc(row.entity)} · ${esc(col)}: Tidak ratifikasi"></div>`; }
        p++;
        return `<div class="cell prog" title="${esc(row.entity)} · ${esc(col)}: On progress"></div>`;
      }).join("");
      heat += `<button type="button" class="ent" data-detail="policy" title="Lihat detail ratifikasi">${esc(row.entity)}</button>${cells}
        <div class="tot"><div class="stack"><i style="flex:${d};background:${C.acc}"></i><i style="flex:${p};background:${C.ctx}"></i><i style="flex:${x};background:${C.line}"></i></div><b class="rd-num" style="width:22px;text-align:right">${d}</b></div>`;
    });
    heat += `<div style="font-size:12px;font-weight:600;color:var(--rd-ink-2);display:flex;align-items:center">Selesai /${policyRows.length}</div>${colDone.map((v) => `<div class="foot${v === 0 ? " zero" : ""}">${v}</div>`).join("")}<div></div>`;
    const zeroCols = colDone.map((v, i) => (v === 0 ? info[i].short.replace(/­/g, "") : null)).filter(Boolean);
    const openByEntity = policyRows.map((r) => ({ e: r.entity, o: (r.statuses || []).filter((s) => s !== "done" && s !== "no-ratification").length })).sort((a, b) => b.o - a.o)[0];
    const heatNote = [
      `${fmt(metrics.done)} dari ${fmt(metrics.total)} selesai (${metrics.total ? fmtPct(metrics.done / metrics.total * 100, 0) : "0%"}).`,
      zeroCols.length ? `${zeroCols.join(", ")} belum selesai di entitas mana pun, jadi hambatannya ada di tingkat kebijakan.` : "",
      openByEntity && openByEntity.o ? `${openByEntity.e} menyumbang ${openByEntity.o} dari ${fmt(metrics.onProgress)} on progress.` : ""
    ].filter(Boolean).join(" ");
    const heatCard = `<section class="rd-card">
      ${cardHead(`Rekap progres ratifikasi kebijakan · ${policyRows.length} entitas SH/AP × ${n} kebijakan`, heatNote, `<button type="button" class="rd-link" data-detail="policy">Lihat semua →</button>`)}
      <div class="rd-actions">
        <button type="button" class="rd-btn small${ui.entities ? " primary" : ""}" data-rd-toggle="entities" aria-expanded="${ui.entities}">${ico("building")}${esc(fmt(policyRows.length))} entitas SH/AP</button>
        <button type="button" class="rd-btn small${ui.types ? " primary" : ""}" data-rd-toggle="types" aria-expanded="${ui.types}">${ico("file")}${esc(fmt(n))} jenis kebijakan</button>
        <span class="rd-kpi-sub">Klik untuk melihat daftar lengkap</span>
      </div>
      ${ui.entities ? `<div class="rd-listpanel"><div class="rd-listpanel-head"><b>Entitas SH/AP</b><span>${esc(fmt(policyRows.length))} entitas dalam monitoring ratifikasi</span></div><ol class="rd-cols">${policyRows.map((r) => { const st = r.statuses || []; const d = st.filter((x) => x === "done").length; const x = st.filter((v) => v === "no-ratification").length; return `<li><b>${esc(r.entity)}</b><span>${d} selesai · ${st.length - d - x} on progress · ${x} tidak ratifikasi</span></li>`; }).join("")}</ol></div>` : ""}
      ${ui.types ? `<div class="rd-listpanel"><div class="rd-listpanel-head"><b>Jenis kebijakan</b><span>${esc(fmt(n))} kebijakan yang dimonitor</span></div><ol class="rd-cols">${columns.map((c, i) => `<li><b>${esc(c)}</b><span>${esc(info[i].group)} · ${colDone[i]}/${policyRows.length} entitas selesai</span></li>`).join("")}</ol></div>` : ""}
      <div class="rd-legend"><span><i style="background:${C.acc}"></i>Selesai · ${fmt(metrics.done)}</span><span><i style="background:${C.ctx}"></i>On progress · ${fmt(metrics.onProgress)}</span><span><i class="exc"></i>Tidak ratifikasi · ${fmt(metrics.noRatification)}</span></div>
      <div class="rd-scroll-x"><div class="rd-heat" style="grid-template-columns:${gridCols}">${heat}</div></div>
    </section>`;

    /* Executive summary */
    const summaryText = text(".executive-summary p") || text("#summaryText");
    const m = [
      [fmt(metrics.entities), "Entitas SH/AP"], [fmt(metrics.types), "Jenis kebijakan"], [fmt(metrics.done), "Selesai ratifikasi"], [fmt(metrics.noRatification), "Tidak ratifikasi"],
      [fmtPct(crAvg, 2), "Progres CR"], [fmt(crRows.length), "Total CR"], [fmt(crOpen), "CR on progress"], [nkoText, `NKO ${measured ? (scoreStatus.label || "").toLowerCase() : "belum diukur"}`],
      [fmt(prepOpen), "Kebijakan on progress"], [beValue, "Business Excellence"]
    ];
    const sumCard = `<section class="rd-hero rd-execsum" style="grid-template-columns:1fr">
      <div><span class="rd-eyebrow">Ringkasan eksekutif</span><p>${esc(summaryText)}</p></div>
      <div class="rd-sum-metrics">${m.map(([v, l]) => `<div><strong>${esc(v)}</strong><span>${esc(l)}</span></div>`).join("")}</div>
    </section>`;

    const strip = `<div class="rd-strip">${freshness ? freshChip(freshness, "Sinkron data") : ""}${sourceStatus ? chip("neutral", sourceStatus.replace(/^Sumber data:\s*/i, "Sumber: "), false) : ""}${lastUpdated ? `<span class="rd-note">Sinkron teknis ${esc(lastUpdated)}</span>` : ""}${sourceDesc ? `<span class="rd-note">· ${esc(sourceDesc)}</span>` : ""}</div>`;

    return [strip, kpis, nkoCard, crCard, (ui.prep ? `${prepCard}${beCard}` : `<div class="rd-grid c2">${prepCard}${beCard}</div>`), heatCard, sumCard].join("");
  }

  /* ================= INVESTASI ================= */
  function renderInvestment() {
    const d = safeGlobal(() => investmentData, {});
    const legacy = document.getElementById("investmentView");
    const freshness = call("dashboardFreshness", d.reportDate);
    const reportLabel = String(d.reportDate || "").replace(/^Report ANG Investasi\s*-\s*/i, "");

    const akiPct = num(d.akiRealizationPct, 0);
    const aiPct = num(d.aiRealizationPct, 0);
    const officeReal = num(String(d.akiOfficeNote || "").split(/dari/i)[0]);
    const officeTotal = num(String(d.akiOfficeNote || "").split(/dari/i)[1]);
    const sarReal = num(String(d.akiSarprasNote || "").split(/dari/i)[0]);
    const sarTotal = num(String(d.akiSarprasNote || "").split(/dari/i)[1]);
    const totReal = num(d.akiRealization);
    const totBudget = Number.isFinite(officeTotal) && Number.isFinite(sarTotal) ? officeTotal + sarTotal : num(String(d.akiGaugeNote || "").split(/AKI/i)[1]);
    const maxScale = Math.max(totBudget || 0, officeTotal || 0) * 1.03 || 1;
    const ibcs = (name, real, budget, pct) => `<div class="rd-ibcs"><span style="font-weight:600">${esc(name)}</span>
      <div class="plot" role="img" aria-label="${esc(name)}: realisasi ${esc(fmt(real, 2))} dari ${esc(fmt(budget, 2))} juta"><span class="plan" style="width:${(budget / maxScale * 100).toFixed(2)}%"></span><span class="act" style="width:${(real / maxScale * 100).toFixed(2)}%"></span></div>
      <span class="v"><b>${esc(pct)}</b><small>${esc(fmt(real, 2))} / ${esc(fmt(budget, 2))} M</small></span></div>`;

    const signal = `<section class="rd-hero"><div><span class="rd-eyebrow">Executive signal</span><p>${esc(d.executiveSignal)}</p></div>
      <div class="rd-hero-side">${freshness && freshness.stale ? chip("serious", "Data usang", false) : ""}${akiPct < 50 ? chip("watch", "Serapan AKI rendah", false) : ""}</div></section>`;

    const kpis = `<div class="rd-grid k4">
      ${kpi({ label: "Total Anggaran Investasi (AI) 2026", value: String(d.totalInvestment || "—").replace(/\s*[TM]$/i, ""), unit: (String(d.totalInvestment).match(/[TM]$/i) || [""])[0], sub: d.totalInvestmentNote, icon: "trend" })}
      ${kpi({ label: "Realisasi AI", value: String(d.aiRealization || "—").replace(/\s*[TM]$/i, ""), unit: (String(d.aiRealization).match(/[TM]$/i) || [""])[0], sub: d.aiRealizationNote, barPct: aiPct, icon: "check" })}
      ${kpi({ label: "Total AKI 2026", value: String(d.akiTotal || "—").replace(/\s*[TM]$/i, ""), unit: (String(d.akiTotal).match(/[TM]$/i) || [""])[0], sub: d.akiTotalNote, icon: "grid" })}
      ${kpi({ label: "Realisasi AKI", value: String(d.akiRealization || "—").replace(/\s*[TM]$/i, ""), unit: (String(d.akiRealization).match(/[TM]$/i) || [""])[0], sub: d.akiRealizationNote, barPct: akiPct, barColor: akiPct < 50 ? C.amber : "", foot: akiPct < 50 ? chip("watch", "Di bawah laju") : "", icon: "target" })}
    </div>`;

    const aki = `<section class="rd-card">
      ${cardHead("Monitoring penyerapan AKI", "Posisi serapan kas investasi dan gap terhadap anggaran terbit. Kotak = AKI, isian = realisasi; skala sama (juta Rp).")}
      <div class="rd-grid c12" style="grid-template-columns:220px minmax(0,1fr);align-items:center">
        <div class="rd-tile" style="padding:18px;gap:6px"><span>Terserap</span><strong style="font-size:36px;line-height:1">${esc(d.akiRealizationPct)}</strong><small>${esc(d.akiGaugeNote)}</small>${bar(akiPct, "", null)}
          <small style="margin-top:6px;color:var(--rd-ink)">${esc(d.akiRealizationChip)} · ${esc(d.akiGapChip)}</small></div>
        <div>
          ${Number.isFinite(officeReal) && Number.isFinite(officeTotal) ? ibcs("Kantor Pusat", officeReal, officeTotal, d.akiOfficePct) : ""}
          ${Number.isFinite(sarReal) && Number.isFinite(sarTotal) ? ibcs("Sarpras Unit", sarReal, sarTotal, d.akiSarprasPct) : ""}
          ${Number.isFinite(totReal) && Number.isFinite(totBudget) ? ibcs("Total AKI", totReal, totBudget, d.akiRealizationPct) : ""}
          <div class="rd-actions" style="padding-top:12px">${chip("serious", `Gap belum terserap ${d.akiGapPct} · ${String(d.akiGapChip || "").replace(/^Sisa\s*/i, "")}`, false)}<span class="rd-kpi-sub">${esc(d.akiGapNote)}</span></div>
        </div>
      </div>
      <div class="rd-callout"><b>Prioritas baca dashboard.</b> ${esc(d.akiInsight)}</div>
    </section>`;

    const actions = [...(legacy?.querySelectorAll(".investment-action-list li") || [])].map((li) => {
      const title = text("strong", li); const body = text("span", li);
      const tone = /evaluasi|periode/i.test(title) && freshness?.stale ? "serious" : "watch";
      const label = tone === "serious" ? "Sumber usang" : "Butuh keputusan";
      return `<div class="rd-list-row"><div><strong>${esc(title)}</strong><span class="d">${esc(body)}</span></div><div>${chip(tone, label)}</div></div>`;
    }).join("");
    const prio = `<section class="rd-card">${cardHead("Prioritas keputusan", "Hal yang perlu dikunci agar target penyerapan terkendali.")}<div>${actions}</div></section>`;

    const comp = `<section class="rd-card">${cardHead("Komposisi AI & AKI 2026", "Porsi AI terbit per lokasi dan realisasi AKI di masing-masing lokasi.")}
      <div class="rd-table-wrap"><table class="rd-table"><colgroup><col style="width:20%"><col style="width:30%"><col style="width:20%"><col style="width:30%"></colgroup><thead><tr><th>Lokasi</th><th>Porsi AI</th><th class="r">AI terbit</th><th class="r">AKI real. / pagu</th></tr></thead><tbody>
      <tr><td><b>Kantor Pusat</b></td><td><div class="rd-cellbar">${bar(num(d.aiOfficeSharePct, 0), "", null)}<b>${esc(d.aiOfficeSharePct || "—")}</b></div></td><td class="r">${esc(d.aiOfficeTotal)}</td><td class="r">${esc(d.akiOfficeNote)}</td></tr>
      <tr><td><b>Sarpras Unit</b></td><td><div class="rd-cellbar">${bar(num(d.aiSarprasSharePct, 0), "", null)}<b>${esc(d.aiSarprasSharePct || "—")}</b></div></td><td class="r">${esc(d.aiSarprasTotal)}</td><td class="r">${esc(d.akiSarprasNote)}</td></tr>
      </tbody></table></div></section>`;

    const steps = [...(legacy?.querySelectorAll(".investment-timeline > div") || [])];
    const stepHtml = steps.map((s, i) => {
      const state = s.classList.contains("done") ? "done" : s.classList.contains("progress") ? "progress" : "waiting";
      const tone = state === "done" ? "good" : state === "progress" ? "watch" : "neutral";
      return `<div class="rd-step ${state}">${i < steps.length - 1 ? '<span class="line"></span>' : ""}<span class="dot">${state === "done" ? ico("check") : state === "progress" ? i + 1 : ""}</span><strong>${esc(text("strong", s))}</strong>${chip(tone, text("span", s))}</div>`;
    }).join("");
    const focus = text(".ai-chart-note span", legacy || document);
    const usulan = `<section class="rd-card">${cardHead("Monitoring usulan AI 2027", "Tahapan top-down dan handshake alokasi usulan, agar validasi tidak menjadi bottleneck.")}
      <div class="rd-steps">${stepHtml}</div>${focus ? `<div class="rd-callout"><b>Fokus manajemen.</b> ${esc(focus)}</div>` : ""}</section>`;

    const used = num(d.aiCarryoverUsed); const total = num(d.aiCarryoverTotal);
    const usedPct = Number.isFinite(used) && total > 0 ? used / total * 100 : null;
    const lunc = `<section class="rd-card">${cardHead("AI luncuran Kantor Pusat 2026", "Perlu konfirmasi ulang perencanaan penggunaan anggaran.")}
      <div class="rd-tiles">${[["PRK", d.aiCarryoverPrk], ["Total AI", d.aiCarryoverTotal], ["Digunakan 2026", d.aiCarryoverUsed], ["Belum digunakan", d.aiCarryoverUnused]].map(([l, v]) => `<div class="rd-tile"><span>${esc(l)}</span><strong>${esc(v)}</strong></div>`).join("")}</div>
      ${usedPct === null ? "" : `<div><div style="display:flex;height:14px;border-radius:4px;overflow:hidden;border:1.5px solid var(--rd-ink)"><i style="width:${usedPct.toFixed(1)}%;background:var(--rd-accent)"></i></div>
      <div style="display:flex;justify-content:space-between;font-size:13px;color:var(--rd-ink-2);margin-top:6px"><span><b style="color:var(--rd-ink)">${esc(fmtPct(usedPct))}</b> digunakan</span><span><b style="color:var(--rd-ink)">${esc(fmtPct(100 - usedPct))}</b> belum digunakan</span></div></div>`}</section>`;

    const aiMurni = String(d.sarprasAiMurni || "");
    const sar = `<section class="rd-card">${cardHead("Monitoring Sarpras Unit", "Ringkasan AI/AKI sarpras dan status pekerjaan 2026.")}
      <div class="rd-tiles">
        <div class="rd-tile"><span>SKAI terbit</span><strong>${esc(d.sarprasSkaiIssued)}</strong><small>AI lanjutan terbit</small></div>
        <div class="rd-tile"><span>AKI terbit</span><strong>${esc(d.sarprasAkiIssued)}</strong><small>AKI lanjutan terbit</small></div>
        <div class="rd-tile"><span>AI murni 2026</span>${/belum/i.test(aiMurni) ? chip("watch", aiMurni, false) : `<strong>${esc(aiMurni)}</strong>`}<small>Status penerbitan</small></div>
        <div class="rd-tile"><span>Progres PRK</span><strong style="font-size:18px">${esc(d.sarprasPrkProgress)}</strong><small>Monitoring terkontrak berlanjut</small></div>
      </div></section>`;

    const head = header(`Investasi · ${reportLabel || "Report ANG Investasi"}`, "Monitoring Anggaran Investasi",
      "AI dan AKI 2026, progres realisasi, usulan AI 2027, AI luncuran, sarpras unit, dan keputusan untuk mempercepat penyerapan.",
      `<a class="rd-btn" href="./assets/template-data-source-investasi.xlsx" download>${ico("file")}Template</a>${btn("Import data", { icon: "up", attrs: proxy("#investmentImportData") })}
       ${btn("PDF", { icon: "down", attrs: proxy('[data-investment-export="pdf"]') })}${btn("Excel", { attrs: proxy('[data-investment-export="xlsx"]') })}${btn("CSV", { attrs: proxy('[data-investment-export="csv"]') })}${btn("JSON", { primary: true, attrs: proxy('[data-investment-export="json"]') })}`);
    const strip = `<div class="rd-strip">${freshChip(freshness, `Sumber investasi · ${reportLabel || "tanggal belum tersedia"}`)}<span class="rd-note">Import: Excel / CSV / JSON (AI, AKI, prioritas, status)</span></div>`;

    return [head, strip, signal, kpis, aki, `<div class="rd-grid c2">${prio}${comp}</div>`, usulan, `<div class="rd-grid c2">${lunc}${sar}</div>`].join("");
  }

  /* ================= ANGGARAN KORPORAT ================= */
  const UNSUR_FIX = { "Tehnologi Informasi": "Teknologi Informasi" };
  function renderAoOffice() {
    const d = safeGlobal(() => aoCorporateData, {});
    const legacy = document.getElementById("aoOfficeView");
    const period = d.period || "";
    const lastYearText = text(".ao-finance-main em", legacy || document);
    const lastYear = num(String(lastYearText).split(/lalu/i)[1]);
    const growth = Number.isFinite(lastYear) && lastYear > 0 ? (d.total / lastYear - 1) * 100 : null;
    const targetText = [...(legacy?.querySelectorAll(".ao-finance-metric p") || [])].map((p) => p.textContent.trim());
    const targetValue = num((targetText.find((t) => /target/i.test(t)) || "").replace(/target/i, ""));
    const signalText = text(".ao-finance-signal span", legacy || document);
    const freshness = call("dashboardFreshness", period);
    const monthIndex = { jan: 1, feb: 2, mar: 3, apr: 4, mei: 5, jun: 6, jul: 7, agu: 8, sep: 9, okt: 10, nov: 11, des: 12 }[String(period).slice(0, 3).toLowerCase()] || null;
    const pace = monthIndex ? monthIndex / 12 * 100 : null;

    const head = header("Anggaran Korporat · Biaya Administrasi Umum", `Realisasi AO Korporat s.d. ${period}`,
      "Diadaptasi dari dashboard sumber Realisasi Biaya Administrasi Umum. Nilai dalam juta Rupiah dengan fokus pada sinyal keputusan manajemen.",
      `<a class="rd-btn" href="${esc(legacy?.querySelector(".ao-source-link")?.getAttribute("href") || "#")}" target="_blank" rel="noreferrer">${ico("ext")}Buka sumber</a>`);
    const strip = `<div class="rd-strip">${freshChip(freshness, `Sumber AO Korporat · s.d. ${period}`)}${chip("neutral", "Satuan: juta Rupiah (jt)", false)}<span class="rd-note">Realisasi, serapan RKAP, target s.d. ${esc(period)}, dan proyeksi 2026</span></div>`;
    const hero = `<section class="rd-hero"><div><span class="rd-eyebrow">Management signal</span><p>${esc(signalText)}</p></div><div class="rd-hero-side">${chip("watch", `${legacy?.querySelectorAll(".ao-signal-list li").length || 0} unsur perlu validasi`, false)}</div></section>`;
    const kpis = `<div class="rd-grid k4">
      ${kpi({ label: "Realisasi", value: fmt(d.total), unit: "jt", sub: Number.isFinite(lastYear) ? `Tahun lalu ${fmt(lastYear)} jt` : "", foot: chip(d.yoy > 100 ? "watch" : "good", `${fmt(d.yoy)}% dari tahun lalu${growth === null ? "" : ` · ${growth >= 0 ? "+" : ""}${fmt(growth, 1)}%`}`), icon: "trend" })}
      ${kpi({ label: "Serapan RKAP", value: fmt(d.absorption), unit: "%", sub: `${fmt(d.total)} dari RKAP ${fmt(d.rkap)} jt`, barPct: d.absorption, icon: "target" })}
      ${kpi({ label: `Capaian target s.d. ${period}`, value: fmt(d.targetRate), unit: "%", sub: Number.isFinite(targetValue) ? `Target ${fmt(targetValue)} jt` : "", barPct: d.targetRate, icon: "check" })}
      ${kpi({ label: "Proyeksi 2026", value: fmt(d.projection), unit: "jt", sub: `${fmt(d.projectionRate)}% dari RKAP`, barPct: d.projectionRate, barColor: "#5b7fc4", foot: chip(d.projectionRate <= 100 ? "good" : "critical", d.projectionRate <= 100 ? "Di bawah RKAP" : "Melebihi RKAP"), icon: "cal" })}
    </div>`;

    const org = [...(legacy?.querySelectorAll(".ao-org-list > div") || [])].map((row) => ({ name: text("span", row), value: num(text("strong", row).replace("−", "-")) })).filter((r) => Number.isFinite(r.value));
    const maxPos = Math.max(1, ...org.filter((r) => r.value > 0).map((r) => r.value));
    const negMax = Math.max(0, ...org.filter((r) => r.value < 0).map((r) => -r.value));
    const zero = negMax ? negMax / (maxPos + negMax) * 100 : 0;
    const scale = 100 - zero;
    const orgRows = org.map((r) => `<div class="rd-div"><b>${esc(r.name)}</b><div class="plot" role="img" aria-label="${esc(r.name)} ${esc(fmt(r.value))} juta">
      ${r.value >= 0 ? `<span class="pos" style="left:${zero.toFixed(2)}%;width:${(r.value / maxPos * scale).toFixed(2)}%"></span>` : `<span class="neg" style="right:${(100 - zero).toFixed(2)}%;width:${(-r.value / (maxPos + negMax) * 100).toFixed(2)}%"></span>`}<span class="zero" style="left:${zero.toFixed(2)}%"></span></div>
      <b class="rd-num" style="text-align:right">${r.value < 0 ? "−" : ""}${esc(fmt(Math.abs(r.value)))} jt</b></div>`).join("");
    const comp = `<section class="rd-card">${cardHead("Komposisi organisasi", "Holding + SHAP − Eliminasi = realisasi konsolidasi. Garis tegak = nol.")}
      <div>${orgRows}<div class="rd-div" style="border-bottom:0"><b style="font-size:15px">Konsolidasi</b><span></span><b class="rd-num" style="text-align:right;font-size:16px">${esc(fmt(d.total))} jt</b></div></div></section>`;

    const signals = [...(legacy?.querySelectorAll(".ao-signal-list li") || [])].map((li) => {
      const body = text("span", li);
      const over = /(\d{3,})%\s*terhadap RKAP/i.test(body) || /1\d\d%\s*terhadap RKAP/i.test(body);
      return `<div class="rd-list-row"><div><strong>${esc(text("strong", li))}</strong><span class="d">${esc(body.replace(/YoY/g, "dari tahun lalu"))}</span></div><div>${chip(over ? "critical" : "watch", over ? "Lewat RKAP" : "Pantau")}</div></div>`;
    }).join("");
    const sig = `<section class="rd-card">${cardHead("Management signal", "Area yang perlu perhatian.")}<div>${signals}</div></section>`;

    const costs = d.topCosts || [];
    const maxCost = Math.max(1, ...costs.map((c) => c.value));
    const costRows = costs.map((c) => `<tr><td><b>${esc(UNSUR_FIX[c.name] || c.name)}</b></td>
      <td><div class="rd-cellbar"><div style="flex:1;height:10px"><i style="display:block;height:10px;border-radius:2px;background:var(--rd-accent);width:${(c.value / maxCost * 100).toFixed(1)}%"></i></div><span class="rd-num" style="width:80px;text-align:right">${esc(fmt(c.value))}</span></div></td>
      <td style="white-space:nowrap"><b class="rd-num">${esc(fmt(c.yoy))}%</b> <span class="rd-kpi-sub">${c.yoy > 100 ? "▲" : "▼"}${esc(fmt(Math.abs(c.yoy - 100)))}%</span></td>
      <td><div class="rd-cellbar">${bar(c.rkap, C.ctx, pace, "h6")}<span class="rd-num" style="width:38px;text-align:right">${esc(fmt(c.rkap))}%</span></div></td></tr>`).join("");
    const costCard = `<section class="rd-card">${cardHead("Top unsur biaya", `${costs.length} unsur terbesar s.d. ${period}. “vs tahun lalu” = realisasi terhadap periode sama tahun lalu${pace ? `; garis tegak di % RKAP = laju linier ${monthIndex}/12 (${fmt(pace, 1)}%)` : ""}.`)}
      <div class="rd-table-wrap"><table class="rd-table"><colgroup><col style="width:27%"><col style="width:33%"><col style="width:17%"><col style="width:23%"></colgroup><thead><tr><th>Unsur</th><th>Realisasi (jt)</th><th>vs tahun lalu</th><th>% RKAP</th></tr></thead><tbody>${costRows}</tbody></table></div></section>`;

    const units = d.topUnits || [];
    const maxUnit = Math.max(1, ...units.map((u) => u.value));
    const unitRows = units.map((u) => `<tr><td><b>${esc(u.unit)}</b></td><td><div class="rd-cellbar"><div style="flex:1;height:10px"><i style="display:block;height:10px;border-radius:2px;background:var(--rd-accent);width:${(u.value / maxUnit * 100).toFixed(1)}%"></i></div><span class="rd-num" style="width:84px;text-align:right">${esc(fmt(u.value))}</span></div></td><td class="r"><b>${d.total ? esc(fmt(u.value / d.total * 100)) : "—"}%</b></td></tr>`).join("");
    const unitCard = `<section class="rd-card">${cardHead("Top unit", "Kontributor realisasi tertinggi.")}<div class="rd-table-wrap"><table class="rd-table"><colgroup><col style="width:18%"><col style="width:64%"><col style="width:18%"></colgroup><thead><tr><th>Unit</th><th>Realisasi (jt)</th><th class="r">Share</th></tr></thead><tbody>${unitRows}</tbody></table></div></section>`;

    return [head, strip, hero, kpis, `<div class="rd-grid c2">${comp}${sig}</div>`, `<div class="rd-grid c21">${costCard}${unitCard}</div>`].join("");
  }

  /* ================= KESIAPAN INFRASTRUKTUR EV ================= */
  const EV_LABEL = { "Satu Lokasi": "Satu lokasi", "< 5 KM": "< 5 km", "5 - < 10 KM": "5 – <10 km", "10 - < 25 KM": "10 – <25 km", "25 - < 50 KM": "25 – <50 km", "50 - < 100 KM": "50 – <100 km", "100 - < 200 KM": "100 – <200 km", ">= 200 KM": "≥ 200 km" };
  const EV_SEV = { "5 - < 10 KM": "watch", "10 - < 25 KM": "watch", "25 - < 50 KM": "serious", "50 - < 100 KM": "serious", "100 - < 200 KM": "critical", ">= 200 KM": "critical" };
  const SEV_COLOR = { watch: C.amber, serious: "#c2410c", critical: C.critical };
  function renderEv() {
    const d = safeGlobal(() => evInfrastructureData, {});
    const summary = Object.assign({}, window.evGeoDataSummary || {}, safeGlobal(() => evGeoDataSummary, {}) || {});
    const cats = d.categories || [];
    const total = d.implementingUnits || cats.reduce((s, c) => s + (c.units || 0), 0);
    const byLabel = Object.fromEntries(cats.map((c) => [c.label, c]));
    const near = (byLabel["Satu Lokasi"]?.units || 0) + (byLabel["< 5 KM"]?.units || 0);
    const far = total - near;
    const pct = (n) => (total ? fmtPct(n / total * 100, 1) : "—");
    const access = d.chargingAccess || [];
    const groups = d.riskGroups || [];
    const farthest = [...groups].reverse().find((g) => g.units > 0);
    const range = (r) => { const parts = String(r || "").split(/\s+-\s+/); return parts.length === 2 && parts[0].replace(/\s*km/i, "") === parts[1].replace(/\s*km/i, "") ? parts[1] : String(r || "—"); };
    const coordDate = summary.unitCoordinatesUpdatedAt || "";
    const coordFresh = coordDate ? call("dashboardFreshness", new Date(coordDate + "T00:00:00Z").toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })) : null;

    const head = header("Kesiapan Infrastruktur EV", "Kesiapan SPKLU untuk program kendaraan EV",
      `Jarak SPKLU terdekat dari kantor ${fmt(total)} unit pelaksana (UP) PLN berdasarkan data SPKLU terbaru: ${fmt(d.spkluLocations || 0)} lokasi · ${fmt(d.chargerUnits || 0)} charger.`,
      `${btn("Import data", { icon: "up", attrs: proxy("#evImportData") })}${btn("Export data", { icon: "down", primary: true, attrs: proxy("#evExportData") })}`);
    const strip = `<div class="rd-strip">${chip("neutral", `Analisis SPKLU · ${d.sourceUpdated || "—"}`, false)}${coordFresh ? freshChip(coordFresh, `Koordinat unit · ${coordDate}`) : ""}${summary.ulpUnits ? chip("neutral", `${fmt(summary.ulpUnits)} ULP · ${fmt(summary.spkluCandidates || 0)} kandidat SPKLU`, false) : ""}${summary.duplicateRowsRemoved ? `<span class="rd-note">${fmt(summary.duplicateRowsRemoved)} baris duplikat identik dihapus dari dataset</span>` : ""}</div>`;

    const accessTiles = access.map((a) => `<div class="rd-hero-tile"><span>${esc(a.label)}</span><strong>${esc(fmt(a.units))} UP</strong><span>${esc(fmtPct(a.percent))} · ≤ 300 km</span></div>`).join("");
    const heroText = `${fmt(near)} dari ${fmt(total)} UP (${pct(near)}) punya SPKLU < 5 km atau di lokasi yang sama.${access[0] ? ` ${fmt(access[0].units)} UP (${fmtPct(access[0].percent)}) punya akses fast charging dalam 300 km.` : ""}${farthest ? ` Terjauh: ${farthest.unitsList?.[0] || "-"} (${range(farthest.range)}).` : ""}`;
    const hero = `<section class="rd-hero" style="grid-template-columns:minmax(0,1.3fr) minmax(0,1fr)"><div><span class="rd-eyebrow">Highlight insight</span><p style="font-size:18px">${esc(heroText)}</p></div><div class="rd-hero-tiles">${accessTiles}</div></section>`;

    const k = (label) => byLabel[label] || { units: 0, percent: 0 };
    const kpis = `<div class="rd-grid k5">
      ${kpi({ label: "Total unit pelaksana", value: fmt(total), unit: "UP", sub: `${fmt(far)} UP dengan SPKLU > 5 km`, icon: "building" })}
      ${kpi({ label: "Satu lokasi", value: fmt(k("Satu Lokasi").units), unit: "UP", sub: `${pct(k("Satu Lokasi").units)} · SPKLU di lokasi kantor UP`, icon: "pin" })}
      ${kpi({ label: "< 5 km", value: fmt(k("< 5 KM").units), unit: "UP", sub: `${pct(k("< 5 KM").units)} · dalam radius 5 km`, icon: "check" })}
      ${kpi({ label: "50 – <100 km", value: fmt(k("50 - < 100 KM").units), unit: "UP", sub: `${pct(k("50 - < 100 KM").units)} · butuh dukungan charging`, foot: k("50 - < 100 KM").units ? chip("serious", "Dukungan khusus") : "", icon: "alert" })}
      ${kpi({ label: "≥ 200 km", value: fmt(k(">= 200 KM").units), unit: "UP", sub: `${pct(k(">= 200 KM").units)}${k(">= 200 KM").units && farthest ? ` · ${farthest.unitsList?.join(", ")}` : ""}`, foot: k(">= 200 KM").units ? chip("critical", "Solusi khusus") : "", icon: "bolt" })}
    </div>`;

    const maxUnits = Math.max(1, ...cats.map((c) => c.units || 0));
    const distRows = cats.map((c) => {
      const sev = EV_SEV[c.label];
      return `<div class="rd-dist"><span>${esc(EV_LABEL[c.label] || c.label)}</span><div class="plot"><i style="width:${((c.units || 0) / maxUnits * 100).toFixed(2)}%;${c.units ? "min-width:3px;" : ""}${sev ? `background:${SEV_COLOR[sev]}` : ""}"></i></div><b class="rd-num" style="text-align:right">${esc(fmt(c.units || 0))}</b><span class="rd-num" style="text-align:right;font-size:13px;color:var(--rd-ink-2)">${esc(pct(c.units || 0))}</span></div>`;
    }).join("");
    const dist = `<section class="rd-card">${cardHead(`Distribusi ${fmt(total)} UP berdasarkan jarak SPKLU terdekat`, "Kategori eksklusif, tidak tumpang tindih. Warna status hanya untuk kategori ≥ 5 km.")}
      <div>${distRows}<div class="rd-dist" style="border-bottom:0"><b>Total</b><span></span><b class="rd-num" style="text-align:right">${esc(fmt(total))}</b><span class="rd-num" style="text-align:right;font-size:13px;color:var(--rd-ink-2)">100%</span></div></div></section>`;

    const riskRows = groups.map((g) => {
      const sev = EV_SEV[g.label] || "neutral";
      return `<div class="rd-risk"><div style="display:flex;flex-direction:column;gap:5px;align-items:flex-start"><b>${esc(EV_LABEL[g.label] || g.label)}</b>${chip(g.units ? sev : "neutral", `${g.units} unit`)}</div>
        <span class="names" style="${g.units ? "" : "color:var(--rd-ink-2)"}">${esc(g.unitsList?.length ? g.unitsList.join(", ") : "Tidak ada unit")}</span>
        <span class="rd-num" style="text-align:right;font-size:13px;color:var(--rd-ink-2)">terdekat<br><b style="color:var(--rd-ink);font-size:14px">${esc(range(g.range))}</b></span></div>`;
    }).join("");
    const exception = groups.find((g) => g.label === ">= 200 KM" && g.units);
    const risk = `<section class="rd-card" style="gap:10px">${cardHead("UP dengan SPKLU terdekat > 5 km", `${fmt(far)} unit perlu monitoring dan dukungan kesiapan charging.`, chip("watch", `${fmt(far)} unit`, false))}<div>${riskRows}</div>
      ${exception ? `<div class="rd-alert">${ico("x", 'width="16" height="16"')}<span><b>${esc(exception.unitsList.join(", "))}</b> dengan SPKLU terdekat ≥ 200 km; perlu solusi charging khusus.</span></div>` : ""}</section>`;

    const recs = (d.recommendations || []).map((r, i) => `<div class="rd-rec"><span class="n">${i + 1}</span><div><b style="font-size:15px">${esc(String(r.title || "").toLowerCase().replace(/^\w/, (c) => c.toUpperCase()))}</b><div class="rd-kpi-sub" style="font-size:14px;margin-top:3px">${esc(r.text)}</div></div></div>`).join("");
    const insights = (d.insights || []).map((t) => `<li>${esc(t)}</li>`).join("");
    const recCard = `<div class="rd-grid c2"><section class="rd-card" style="gap:6px">${cardHead("Rekomendasi untuk Direksi")}<div>${recs}</div></section>
      <section class="rd-card">${cardHead("Highlight insight")}<ul style="margin:0;padding-left:18px;display:flex;flex-direction:column;gap:10px;font-size:14px;line-height:1.5">${insights}</ul></section></div>`;

    return [head, strip, hero, kpis, `<div class="rd-grid c12">${dist}${risk}</div>`, recCard].join("");
  }

  /* ================= Anggaran Kantor Pusat (iframe theme) ================= */
  const IFRAME_CSS = `
    :root{--navy-950:#0f1a33;--navy-900:#14213d;--navy-800:#1b2d57;--teal-600:#1f4fa3;--teal-500:#1f4fa3;--teal-100:#edf2fb;
      --amber-500:#b7791f;--amber-600:#7a4f00;--amber-100:#fff4dc;--red-500:#a8380b;--red-100:#fdece4;--green-600:#0a6e33;--green-100:#e8f6ee;
      --paper:#f5f6f8;--ink-900:#14213d;--ink-600:#4a5670;--ink-500:#4a5670;--ink-400:#5f6b82;--line:#e3e7ee;--line-strong:#d5dae3;
      --shadow:0 1px 2px rgba(20,33,61,.04),0 6px 20px rgba(20,33,61,.035)}
    body{font-family:"IBM Plex Sans","Segoe UI",system-ui,-apple-system,Roboto,Arial,sans-serif!important}
    h1,h2,h3,.display{font-family:inherit!important}
    .topbar{background:linear-gradient(135deg,#14213d 0%,#1b2d57 100%)!important}
    .topbar::after{display:none!important}
    .topbar h1,.topbar h2{color:#ffffff!important}.topbar .eyebrow{color:#9db4e0!important;opacity:1!important}
    [stroke="#0E7C86" i]{stroke:#1f4fa3}[fill="#0E7C86" i]{fill:#1f4fa3}[stroke="#149AA6" i]{stroke:#1f4fa3}[fill="#149AA6" i]{fill:#1f4fa3}
    [stroke="#F2A93B" i]{stroke:#b7791f}[fill="#F2A93B" i]{fill:#b7791f}
    .eyebrow,.filters label{font-size:12px!important}
    .topbar .sub{font-size:13px!important;color:#c9d2e3!important}
    [style*="font-size:10"],[style*="font-size: 10"],[style*="font-size:11px"],[style*="font-size: 11px"]{font-size:12px!important}
  `;
  function themeAoIframe() {
    const frame = document.querySelector(".ao-full-frame");
    if (!frame) return;
    const apply = () => {
      try {
        const doc = frame.contentDocument;
        if (!doc || !doc.head || doc.getElementById("rdTheme")) return;
        const style = doc.createElement("style");
        style.id = "rdTheme";
        style.textContent = IFRAME_CSS;
        doc.head.appendChild(style);
        // Naikkan teks < 12px agar terbaca (dashboard sumber memakai 10,5–11px).
        doc.querySelectorAll("body *").forEach((el) => {
          const size = parseFloat(doc.defaultView.getComputedStyle(el).fontSize);
          if (size && size < 12 && el.childNodes.length && [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim())) el.style.fontSize = "12px";
        });
      } catch (error) { /* iframe beda origin: biarkan tampilan sumber */ }
    };
    frame.addEventListener("load", apply);
    apply();
  }

  /* ---------------- orchestration ---------------- */
  const VIEWS = {
    strategy: { render: renderStrategy, anchor: () => dashboard.querySelector(":scope > .kpi-grid") },
    investment: { render: renderInvestment, anchor: () => document.getElementById("investmentView") },
    "ao-office": { render: renderAoOffice, anchor: () => document.getElementById("aoOfficeView") },
    "ev-infra": { render: renderEv, anchor: () => document.getElementById("evInfraView") }
  };
  const MODE_CLASSES = { "ao-mode": "ao", "ao-office-mode": "ao-office", "investment-mode": "investment", "ev-infra-mode": "ev-infra", "dashboard-mode": "dashboard", "analytics-mode": "analytics", "alerts-mode": "alerts", "settings-mode": "settings" };
  function currentMode() {
    for (const [cls, mode] of Object.entries(MODE_CLASSES)) if (dashboard.classList.contains(cls)) return mode;
    return "strategy";
  }

  const lastHtml = {};
  function renderActive() {
    const mode = currentMode();
    if (dashboard.dataset.rdActive !== mode) dashboard.dataset.rdActive = mode;
    const view = VIEWS[mode];
    if (!view) return;
    const container = ensureContainer(mode, view.anchor());
    let html;
    try { html = view.render(); } catch (error) {
      // Jika render baru gagal, kembalikan tampilan lama untuk menu ini.
      console.warn("Redesain gagal dirender, memakai tampilan lama:", error);
      document.body.classList.remove("rd-enabled");
      return;
    }
    if (lastHtml[mode] !== html) {
      container.innerHTML = html;
      lastHtml[mode] = html;
    }
  }

  let timer = null;
  const schedule = (delay = 120) => { clearTimeout(timer); timer = setTimeout(renderActive, delay); };

  // Tombol di tampilan baru meneruskan klik ke kontrol lama (import/export).
  document.addEventListener("click", (event) => {
    const toggle = event.target.closest("[data-rd-toggle]");
    if (toggle && toggle.closest(".rd-view")) {
      const key = toggle.getAttribute("data-rd-toggle");
      if (key in ui) { ui[key] = !ui[key]; renderActive(); }
      return;
    }
    const scrollTop = event.target.closest("[data-rd-scrolltop]");
    if (scrollTop) window.scrollTo({ top: 0, behavior: "smooth" });
    const trigger = event.target.closest("[data-rd-proxy]");
    if (!trigger) return;
    const target = document.querySelector(trigger.getAttribute("data-rd-proxy"));
    if (target) { event.preventDefault(); setTimeout(() => target.click(), 0); }
  });

  // Rerender saat data/tampilan lama berubah (import, sinkron Google Sheets, pilih periode).
  const observer = new MutationObserver((mutations) => {
    for (const m of mutations) {
      if (m.type === "attributes" && m.target === dashboard && m.attributeName === "class") { schedule(0); return; }
      const node = m.target.nodeType === 1 ? m.target : m.target.parentElement;
      if (node && !node.closest(".rd-view, .leaflet-container")) { schedule(); return; }
    }
  });
  observer.observe(dashboard, { attributes: true, attributeFilter: ["class"], childList: true, subtree: true, characterData: true });

  // Nama menu mengikuti istilah anggaran.
  const RENAME = { ao: "Anggaran Kantor Pusat", "ao-office": "Anggaran Korporat", "ev-infra": "Kesiapan Infrastruktur EV" };
  Object.entries(RENAME).forEach(([key, label]) => {
    const span = document.querySelector(`.nav-item[data-nav="${key}"] span`);
    if (span) span.textContent = label;
  });
  // Tooltip nama menu saat sidebar menjadi rel ikon (≤1280px).
  document.querySelectorAll(".nav-item").forEach((item) => {
    const label = item.querySelector("span")?.textContent.trim();
    if (label) { item.setAttribute("title", label); item.setAttribute("aria-label", label); }
  });

  themeAoIframe();
  renderActive();
  window.addEventListener("load", () => schedule(0));
})();
