/* Interaksi dashboard (pratinjau 2026-11)
 * Lapisan perilaku di atas tampilan yang sudah ada. Tidak mengubah data atau perhitungan:
 * hanya navigasi, penyaringan tampilan, dan pengurutan baris yang sudah dirender.
 *   1. Cari menu & bagian (Ctrl/⌘ + K)
 *   2. Mode rapat: layar penuh, pindah menu dengan ← / →
 *   3. Urutkan tabel dengan klik judul kolom
 *   4. Alert Center: saring isu per tingkat prioritas
 *   5. Drill-down: kartu/baris ringkasan membuka menu terkait
 *   6. Tombol kembali ke atas
 */
(function () {
  "use strict";

  var MENUS = [
    { key: "dashboard", label: "Overview", sections: ["Ringkasan per menu", "Perlu perhatian", "Serapan anggaran vs laju waktu"], kw: "nko eksekutif ringkasan" },
    { key: "strategy", label: "Strategi & Evaluasi", sections: ["Monitoring kinerja", "Timeline Change Request", "Penyusunan kebijakan", "Implementasi PLN Business Excellence", "Rekap progres ratifikasi"], kw: "nko cr kebijakan ratifikasi juknis" },
    { key: "investment", label: "Investasi", sections: ["Monitoring penyerapan AKI", "Prioritas keputusan", "Komposisi AI & AKI", "Monitoring usulan AI 2027", "AI luncuran", "Monitoring Sarpras Unit"], kw: "ai aki serapan bapp sarpras" },
    { key: "ao-office", label: "Anggaran Korporat", sections: ["Komposisi organisasi", "Management signal", "Top unsur biaya", "Top unit"], kw: "ao korporat rkap biaya honorarium" },
    { key: "ao", label: "Anggaran Kantor Pusat", sections: [], kw: "ao kpst kantor pusat rkap divisi" },
    { key: "ev-infra", label: "Kesiapan Infrastruktur EV", sections: ["Distribusi", "UP dengan SPKLU terdekat", "Rekomendasi untuk Direksi", "Highlight insight", "Geolocation"], kw: "ev spklu charging mobil listrik peta" },
    { key: "analytics", label: "Laporan & Analitik", sections: ["Analitik Lintas Menu", "AI, AKI, dan Gap Anggaran", "Fokus Eksekusi"], kw: "laporan rapim analitik" },
    { key: "alerts", label: "Alert Center", sections: ["Daftar Isu Lintas Dashboard", "Risiko Utama", "Tindak Lanjut yang Perlu Dikunci"], kw: "alert risiko tindak lanjut isu" },
    { key: "settings", label: "Pengaturan", sections: [], kw: "import export template data source security" }
  ];
  var SECTION_ALIAS = { "Monitoring penyerapan AKI": "serapan", "Monitoring kinerja": "nko indikator", "Rekap progres ratifikasi": "entitas sh ap", "Geolocation": "peta lokasi", "Top unsur biaya": "honorarium biaya" };
  var SECTION_LABEL = { "Distribusi": "Distribusi UP berdasarkan jarak SPKLU", "Geolocation": "Peta geolokasi unit & SPKLU", "Monitoring kinerja": "Monitoring kinerja · NKO per indikator" };
  var PRESENT_ORDER = ["dashboard", "strategy", "investment", "ao-office", "ao", "ev-infra", "analytics", "alerts"];

  var ICON = {
    search: '<path d="m21 21-4.3-4.3"/><circle cx="11" cy="11" r="7"/>',
    present: '<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/>',
    up: '<path d="m18 15-6-6-6 6"/>',
    left: '<path d="m15 18-6-6 6-6"/>',
    right: '<path d="m9 18 6-6-6-6"/>',
    x: '<path d="M18 6 6 18M6 6l12 12"/>',
    menu: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
    hash: '<path d="M4 9h16M4 15h16M10 3 8 21M16 3l-2 18"/>',
    sort: '<path d="m7 15 5 5 5-5M7 9l5-5 5 5"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>'
  };
  function svg(name, size) {
    return '<svg viewBox="0 0 24 24" width="' + (size || 16) + '" height="' + (size || 16) + '" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' + ICON[name] + "</svg>";
  }
  function el(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }
  function norm(s) { return String(s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/\s+/g, " ").trim(); }
  function navItem(key) { return document.querySelector('.nav-item[data-nav="' + key + '"]'); }
  function activeKey() { var a = document.querySelector(".nav-item.is-active"); return a ? a.getAttribute("data-nav") : "dashboard"; }
  function reduceMotion() { return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches; }
  function isMac() { return /Mac|iPhone|iPad/.test(navigator.platform || ""); }

  // Peta teks area → menu (untuk drill-down dari tabel dan kartu ringkasan).
  function areaToMenu(text) {
    var t = norm(text);
    if (/kantor pusat|kpst/.test(t)) return "ao";
    if (/korporat/.test(t)) return "ao-office";
    if (/investasi|\baki\b|\bai\b|sarpras/.test(t)) return "investment";
    if (/\bev\b|spklu|charging/.test(t)) return "ev-infra";
    if (/strategi|change request|kebijakan|ratifikasi|kinerja|nko|business excellence|juknis/.test(t)) return "strategy";
    return null;
  }
  function makeDrill(node, key, label) {
    if (!node || !key || node.hasAttribute("data-rd-proxy")) return;
    node.setAttribute("data-rd-proxy", '.nav-item[data-nav="' + key + '"]');
    node.setAttribute("data-rd-scrolltop", "");
    node.classList.add("ix-drill");
    if (!/^(A|BUTTON)$/.test(node.tagName)) {
      node.setAttribute("tabindex", "0");
      node.setAttribute("role", "link");
      var name = MENUS.filter(function (m) { return m.key === key; })[0];
      node.setAttribute("aria-label", (label ? label + ". " : "") + "Buka " + (name ? name.label : "menu"));
    }
  }
  document.addEventListener("keydown", function (e) {
    var t = e.target;
    if ((e.key === "Enter" || e.key === " ") && t && t.classList && t.classList.contains("ix-drill") && t.getAttribute("role") === "link") {
      e.preventDefault(); t.click();
    }
  });

  function goTo(key, section) {
    var n = navItem(key);
    if (!n) return;
    n.click();
    if (!section) { window.scrollTo({ top: 0, behavior: "auto" }); return; }
    var want = norm(section), tries = 0;
    (function seek() {
      var hs = [].slice.call(document.querySelectorAll(".dashboard h2, .dashboard h3")).filter(function (h) { return h.offsetParent !== null; });
      var hit = hs.filter(function (h) { return norm(h.textContent).indexOf(want) === 0; })[0];
      if (hit) {
        hit.scrollIntoView({ behavior: reduceMotion() ? "auto" : "smooth", block: "start" });
        hit.classList.add("ix-flash"); setTimeout(function () { hit.classList.remove("ix-flash"); }, 1600);
      } else if (tries++ < 25) setTimeout(seek, 80);
    })();
  }

  /* ---------- 1. Cari menu & bagian ---------- */
  var pal, palInput, palList, palItems = [], palIndex = 0, lastFocus = null;
  function buildPalette() {
    pal = el("div", "ix-pal");
    pal.hidden = true;
    pal.setAttribute("role", "dialog");
    pal.setAttribute("aria-modal", "true");
    pal.setAttribute("aria-label", "Cari menu dan bagian dashboard");
    pal.innerHTML =
      '<div class="ix-pal-backdrop" data-ix-close></div>' +
      '<div class="ix-pal-box">' +
      '<div class="ix-pal-field">' + svg("search", 18) +
      '<input id="ixPalInput" type="search" autocomplete="off" spellcheck="false" placeholder="Cari menu atau bagian, mis. AKI, SPKLU, ratifikasi" aria-controls="ixPalList" aria-autocomplete="list">' +
      '<kbd>Esc</kbd></div>' +
      '<ul class="ix-pal-list" id="ixPalList" role="listbox" aria-label="Hasil pencarian"></ul>' +
      '<div class="ix-pal-foot"><span><kbd>↑</kbd><kbd>↓</kbd> pilih</span><span><kbd>Enter</kbd> buka</span><span><kbd>' + (isMac() ? "⌘" : "Ctrl") + '</kbd><kbd>K</kbd> buka/tutup</span></div>' +
      "</div>";
    document.body.appendChild(pal);
    palInput = pal.querySelector("#ixPalInput");
    palList = pal.querySelector("#ixPalList");
    palInput.addEventListener("input", renderPalette);
    palInput.addEventListener("keydown", function (e) {
      if (e.key === "ArrowDown") { e.preventDefault(); setIndex(palIndex + 1); }
      else if (e.key === "ArrowUp") { e.preventDefault(); setIndex(palIndex - 1); }
      else if (e.key === "Enter") { e.preventDefault(); choose(palItems[palIndex]); }
      else if (e.key === "Escape") { e.preventDefault(); closePalette(); }
      else if (e.key === "Tab") { e.preventDefault(); }
    });
    pal.addEventListener("click", function (e) {
      if (e.target.closest("[data-ix-close]")) return closePalette();
      var li = e.target.closest("[data-ix-i]");
      if (li) choose(palItems[+li.getAttribute("data-ix-i")]);
    });
  }
  function allEntries() {
    var out = [];
    MENUS.forEach(function (m) {
      out.push({ key: m.key, label: m.label, sub: "Menu", hay: norm(m.label + " " + m.kw) });
      m.sections.forEach(function (s) {
        var lab = SECTION_LABEL[s] || s;
        out.push({ key: m.key, section: s, label: lab, sub: m.label, hay: norm(lab + " " + m.label + " " + (SECTION_ALIAS[s] || "")) });
      });
    });
    return out;
  }
  function renderPalette() {
    var q = norm(palInput.value), words = q ? q.split(" ") : [];
    var cur = activeKey();
    palItems = allEntries().filter(function (e) { return words.every(function (w) { return e.hay.indexOf(w) >= 0; }); });
    if (!q) palItems = palItems.filter(function (e) { return !e.section || e.key === cur; });
    palList.innerHTML = palItems.length ? palItems.map(function (e, i) {
      return '<li role="option" id="ixOpt' + i + '" data-ix-i="' + i + '" aria-selected="false">' +
        '<span class="ix-ico">' + svg(e.section ? "hash" : "menu") + "</span>" +
        '<span class="ix-txt"><b></b><small></small></span>' + '<span class="ix-go">' + svg("arrow", 14) + "</span></li>";
    }).join("") : '<li class="ix-empty" role="presentation">Tidak ada menu atau bagian yang cocok. Coba kata lain, mis. "serapan" atau "SPKLU".</li>';
    [].forEach.call(palList.querySelectorAll("[data-ix-i]"), function (li) {
      var e = palItems[+li.getAttribute("data-ix-i")];
      li.querySelector("b").textContent = e.label;
      li.querySelector("small").textContent = e.section ? e.sub : (e.key === cur ? "Menu · sedang dibuka" : "Menu");
    });
    setIndex(0);
  }
  function setIndex(i) {
    if (!palItems.length) { palInput.removeAttribute("aria-activedescendant"); return; }
    palIndex = (i + palItems.length) % palItems.length;
    [].forEach.call(palList.querySelectorAll("[data-ix-i]"), function (li, j) { li.setAttribute("aria-selected", j === palIndex ? "true" : "false"); });
    var on = palList.querySelector("#ixOpt" + palIndex);
    if (on) { palInput.setAttribute("aria-activedescendant", on.id); on.scrollIntoView({ block: "nearest" }); }
  }
  function openPalette() {
    if (!pal) buildPalette();
    lastFocus = document.activeElement;
    palInput.value = "";
    renderPalette();
    pal.hidden = false;
    document.documentElement.classList.add("ix-lock");
    palInput.focus();
  }
  function closePalette() {
    if (!pal || pal.hidden) return;
    pal.hidden = true;
    document.documentElement.classList.remove("ix-lock");
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  function choose(e) { if (!e) return; closePalette(); goTo(e.key, e.section); }

  /* ---------- 2. Mode rapat ---------- */
  var bar;
  function presentBar() {
    bar = el("div", "ix-present-bar");
    bar.setAttribute("role", "toolbar");
    bar.setAttribute("aria-label", "Kontrol mode rapat");
    bar.innerHTML =
      '<button type="button" data-ix-prev aria-label="Menu sebelumnya">' + svg("left", 18) + "</button>" +
      '<span class="ix-present-label" aria-live="polite"></span>' +
      '<button type="button" data-ix-next aria-label="Menu berikutnya">' + svg("right", 18) + "</button>" +
      '<button type="button" data-ix-exit class="ix-exit">' + svg("x", 16) + "<span>Keluar</span></button>";
    bar.hidden = true;
    document.body.appendChild(bar);
    bar.addEventListener("click", function (e) {
      if (e.target.closest("[data-ix-prev]")) step(-1);
      else if (e.target.closest("[data-ix-next]")) step(1);
      else if (e.target.closest("[data-ix-exit]")) togglePresent(false);
    });
  }
  function updateBar() {
    if (!bar) return;
    var k = activeKey(), i = PRESENT_ORDER.indexOf(k);
    var m = MENUS.filter(function (x) { return x.key === k; })[0];
    bar.querySelector(".ix-present-label").textContent = (i >= 0 ? (i + 1) + " / " + PRESENT_ORDER.length + " · " : "") + (m ? m.label : "");
  }
  function step(d) {
    var i = PRESENT_ORDER.indexOf(activeKey());
    var n = PRESENT_ORDER[(i + d + PRESENT_ORDER.length) % PRESENT_ORDER.length];
    goTo(n);
    setTimeout(updateBar, 50);
  }
  function togglePresent(on) {
    if (!bar) presentBar();
    var want = on == null ? !document.body.classList.contains("ix-present") : on;
    document.body.classList.toggle("ix-present", want);
    bar.hidden = !want;
    if (want) {
      updateBar();
      var de = document.documentElement;
      if (de.requestFullscreen && !document.fullscreenElement) de.requestFullscreen().catch(function () {});
    } else if (document.fullscreenElement && document.exitFullscreen) {
      document.exitFullscreen().catch(function () {});
    }
    var btn = document.querySelector(".ix-present-btn");
    if (btn) btn.setAttribute("aria-pressed", want ? "true" : "false");
  }
  document.addEventListener("fullscreenchange", function () {
    if (!document.fullscreenElement && document.body.classList.contains("ix-present")) togglePresent(false);
  });

  /* ---------- Tombol di sidebar ---------- */
  function sidebarTools() {
    var brand = document.querySelector(".sidebar .brand");
    if (!brand || document.querySelector(".ix-tools")) return;
    var box = el("div", "ix-tools");
    box.innerHTML =
      '<button type="button" class="ix-search-btn" aria-keyshortcuts="Control+K Meta+K">' + svg("search") + '<span>Cari</span><kbd>' + (isMac() ? "⌘K" : "Ctrl K") + "</kbd></button>" +
      '<button type="button" class="ix-present-btn" aria-pressed="false">' + svg("present") + "<span>Mode rapat</span></button>";
    brand.parentNode.insertBefore(box, brand.nextSibling);
    box.querySelector(".ix-search-btn").addEventListener("click", openPalette);
    box.querySelector(".ix-present-btn").addEventListener("click", function () { togglePresent(); });
  }

  /* ---------- 3. Urutkan tabel ---------- */
  var SORTABLE = ".rd-view table, #alertView table, #analyticsView table";
  function cellValue(td) {
    var raw = (td ? td.textContent : "").replace(/−/g, "-").trim();
    var m = raw.match(/-?\d[\d.]*(,\d+)?/);
    if (!m) return { n: NaN, s: norm(raw) };
    var num = parseFloat(m[0].replace(/\./g, "").replace(",", "."));
    return { n: num, s: norm(raw) };
  }
  var PRIORITY = { critical: 4, high: 3, medium: 2, low: 1 };
  function enhanceTable(table) {
    if (table.__ix || !table.tHead || !table.tBodies[0]) return;
    if (table.closest("[class*='heat'], .leaflet-container")) return; // matriks/peta bukan daftar yang diurutkan
    var rows = table.tBodies[0].rows;
    if (rows.length < 3) return;
    table.__ix = true;
    table.classList.add("ix-sortable");
    var ths = table.tHead.rows[0].cells, start = 0;
    [].forEach.call(ths, function (th) {
      var span = th.colSpan || 1, col = start + span - 1; // kolom berangkai: pakai sel paling kanan (angka)
      start += span;
      var label = th.textContent.trim();
      if (!label) return;
      th.setAttribute("aria-sort", "none");
      var b = el("button", "ix-sort", "<span></span>" + svg("sort", 13));
      b.type = "button";
      b.querySelector("span").textContent = label;
      b.setAttribute("aria-label", "Urutkan menurut " + label);
      th.textContent = "";
      th.appendChild(b);
      b.addEventListener("click", function () { sortBy(table, col, th); });
    });
  }
  function sortBy(table, col, th) {
    var body = table.tBodies[0];
    var rows = [].slice.call(body.rows);
    if (!table.__orig) table.__orig = rows.slice();
    var state = th.getAttribute("aria-sort");
    var next = state === "none" ? "descending" : state === "descending" ? "ascending" : "none";
    [].forEach.call(table.tHead.rows[0].cells, function (c) { if (c.hasAttribute("aria-sort")) c.setAttribute("aria-sort", "none"); });
    th.setAttribute("aria-sort", next);
    if (next === "none") { table.__orig.forEach(function (r) { body.appendChild(r); }); return; }
    var vals = rows.map(function (r) { return cellValue(r.cells[col]); });
    var pri = vals.every(function (v) { return PRIORITY[v.s] != null; });
    var numeric = !pri && vals.filter(function (v) { return !isNaN(v.n); }).length >= rows.length * 0.6;
    var dir = next === "ascending" ? 1 : -1;
    rows.map(function (r, i) { return { r: r, v: vals[i], i: i }; })
      .sort(function (a, b) {
        var x, y;
        if (pri) { x = PRIORITY[a.v.s]; y = PRIORITY[b.v.s]; }
        else if (numeric) { x = isNaN(a.v.n) ? -Infinity : a.v.n; y = isNaN(b.v.n) ? -Infinity : b.v.n; }
        else { return dir * a.v.s.localeCompare(b.v.s, "id") || a.i - b.i; }
        return dir * (x - y) || a.i - b.i;
      })
      .forEach(function (o) { body.appendChild(o.r); });
  }

  /* ---------- 4. Alert Center: saring per prioritas ---------- */
  var alertFilter = null;
  var LEVEL = { critical: "critical", high: "high", medium: "medium", ok: "on track" };
  function enhanceAlerts() {
    var grid = document.querySelector(".alert-score-grid");
    if (!grid) return;
    if (!grid.__ix) {
      grid.__ix = true;
      grid.classList.add("ix-filterable");
      [].forEach.call(grid.children, function (card) {
        var lvl = Object.keys(LEVEL).filter(function (k) { return card.classList.contains(k); })[0];
        if (!lvl) return;
        card.setAttribute("role", "button");
        card.setAttribute("tabindex", "0");
        card.setAttribute("aria-pressed", "false");
        card.setAttribute("data-ix-level", lvl);
        card.setAttribute("aria-label", "Saring isu berprioritas " + LEVEL[lvl]);
        card.addEventListener("click", function () { setAlertFilter(alertFilter === lvl ? null : lvl); });
        card.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); card.click(); } });
      });
      var status = el("div", "ix-filter-status");
      status.setAttribute("role", "status");
      status.hidden = true;
      grid.parentNode.insertBefore(status, grid.nextSibling);
      status.addEventListener("click", function (e) { if (e.target.closest("[data-ix-reset]")) setAlertFilter(null); });
    }
    // Drill-down per isu dan per tindak lanjut.
    [].forEach.call(document.querySelectorAll("#alertRows > div"), function (row) {
      var b = row.querySelector("b");
      if (b && !row.querySelector(".ix-open")) {
        var key = areaToMenu(b.textContent);
        if (key) { var go = el("button", "ix-open", "Buka " + svg("arrow", 13)); go.type = "button"; makeDrill(go, key); go.setAttribute("aria-label", "Buka menu " + b.textContent.trim()); b.appendChild(go); }
      }
    });
    [].forEach.call(document.querySelectorAll("#alertActionRows tr"), function (tr) {
      var td = tr.cells[0];
      if (td && !td.querySelector(".ix-open")) {
        var key = areaToMenu(td.textContent);
        if (key) { var go = el("button", "ix-open", "Buka " + svg("arrow", 13)); go.type = "button"; makeDrill(go, key); go.setAttribute("aria-label", "Buka menu " + td.textContent.trim()); td.appendChild(go); }
      }
    });
    if (alertFilter) applyAlertFilter();
  }
  function setAlertFilter(lvl) {
    alertFilter = lvl;
    [].forEach.call(document.querySelectorAll(".alert-score-grid [data-ix-level]"), function (c) {
      c.setAttribute("aria-pressed", c.getAttribute("data-ix-level") === lvl ? "true" : "false");
    });
    applyAlertFilter();
  }
  function applyAlertFilter() {
    var want = alertFilter ? LEVEL[alertFilter] : null, shown = 0, total = 0;
    [].forEach.call(document.querySelectorAll("#alertRows > div"), function (row) {
      var em = row.querySelector("em"); total++;
      var ok = !want || (em && norm(em.textContent) === want);
      row.hidden = !ok; if (ok) shown++;
    });
    [].forEach.call(document.querySelectorAll("#alertActionRows tr"), function (tr) {
      var last = tr.cells[tr.cells.length - 1];
      tr.hidden = !!want && !(last && norm(last.textContent) === want);
    });
    var st = document.querySelector(".ix-filter-status");
    if (!st) return;
    st.hidden = !want;
    if (want) {
      st.innerHTML = "";
      var t = el("span"); t.textContent = shown ? "Menampilkan " + shown + " dari " + total + " isu berprioritas " + LEVEL[alertFilter] + "." : "Tidak ada isu berprioritas " + LEVEL[alertFilter] + " saat ini.";
      var r = el("button", "ix-reset", "Tampilkan semua"); r.type = "button"; r.setAttribute("data-ix-reset", "");
      st.appendChild(t); st.appendChild(r);
    }
  }

  /* ---------- 5. Drill-down ringkasan → menu ---------- */
  function enhanceDrills() {
    [].forEach.call(document.querySelectorAll("#analyticsView .rapim-score-grid > article"), function (a) {
      var s = a.querySelector("span"); if (s) makeDrill(a, areaToMenu(s.textContent), s.textContent.trim());
    });
    [].forEach.call(document.querySelectorAll("#analyticsView .rapim-analysis-table tbody tr"), function (tr) {
      var td = tr.cells[0];
      if (td && !td.querySelector(".ix-open")) {
        var key = areaToMenu(td.textContent);
        if (key) { var go = el("button", "ix-open", "Buka " + svg("arrow", 13)); go.type = "button"; makeDrill(go, key); go.setAttribute("aria-label", "Buka menu " + td.textContent.trim()); td.appendChild(go); }
      }
    });
    [].forEach.call(document.querySelectorAll(".rd-ov-pace .rd-ov-prow"), function (row) {
      var lab = row.querySelector(".lab"); if (lab) makeDrill(row, areaToMenu(lab.textContent), lab.textContent.trim());
    });
    [].forEach.call(document.querySelectorAll(".rd-ov-fresh .rd-chip"), function (chip) {
      makeDrill(chip, areaToMenu(chip.textContent), chip.textContent.trim());
    });
  }

  /* ---------- 6. Kembali ke atas ---------- */
  var topBtn;
  function backToTop() {
    topBtn = el("button", "ix-top", svg("up", 18) + "<span>Ke atas</span>");
    topBtn.type = "button";
    topBtn.hidden = true;
    topBtn.setAttribute("aria-label", "Kembali ke atas halaman");
    document.body.appendChild(topBtn);
    topBtn.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: reduceMotion() ? "auto" : "smooth" }); });
    var ticking = false;
    window.addEventListener("scroll", function () {
      if (ticking) return; ticking = true;
      requestAnimationFrame(function () { topBtn.hidden = window.scrollY < window.innerHeight * 1.2; ticking = false; });
    }, { passive: true });
  }

  /* ---------- Pintasan keyboard global ---------- */
  document.addEventListener("keydown", function (e) {
    var typing = /INPUT|TEXTAREA|SELECT/.test((e.target && e.target.tagName) || "") || (e.target && e.target.isContentEditable);
    if ((e.ctrlKey || e.metaKey) && (e.key === "k" || e.key === "K")) { e.preventDefault(); if (pal && !pal.hidden) closePalette(); else openPalette(); return; }
    if (pal && !pal.hidden) return;
    if (document.body.classList.contains("ix-present") && !typing) {
      if (e.key === "ArrowRight" || e.key === "PageDown") { e.preventDefault(); step(1); }
      else if (e.key === "ArrowLeft" || e.key === "PageUp") { e.preventDefault(); step(-1); }
      else if (e.key === "Escape") togglePresent(false);
    }
  });

  /* ---------- Pasang & pantau render ulang ---------- */
  function enhance() {
    sidebarTools();
    [].forEach.call(document.querySelectorAll(SORTABLE), enhanceTable);
    enhanceAlerts();
    enhanceDrills();
    if (document.body.classList.contains("ix-present")) updateBar();
  }
  function init() {
    document.body.classList.add("ix-on");
    backToTop();
    enhance();
    var pending = false;
    new MutationObserver(function () {
      if (pending) return; pending = true;
      requestAnimationFrame(function () { pending = false; enhance(); });
    }).observe(document.querySelector(".app-shell") || document.body, { childList: true, subtree: true });
    document.addEventListener("click", function (e) { if (e.target.closest(".nav-item")) setTimeout(updateBar, 60); });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
