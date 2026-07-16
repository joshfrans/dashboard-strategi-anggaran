const policyData = [
  {
    entity: "PLN IP",
    statuses: ["done", "done", "discussion", "discussion", "discussion", "done", "done"]
  },
  {
    entity: "PLN EPI",
    statuses: ["no-ratification", "done", "done", "done", "done", "no-ratification", "done"]
  },
  {
    entity: "PLN NP",
    statuses: ["done", "done", "discussion", "done", "done", "done", "done"]
  },
  {
    entity: "PLN ICON+",
    statuses: ["drafting", "done", "done", "done", "done", "review-fix", "done"]
  },
  {
    entity: "PLN EMI",
    statuses: ["no-ratification", "done", "done", "done", "no-ratification", "done", "done"]
  },
  {
    entity: "PLN ES",
    statuses: ["done", "done", "done", "done", "done", "done", "done"]
  },
  {
    entity: "PLN Haleyora Power",
    statuses: ["done", "done", "done", "done", "done", "done", "done"]
  },
  {
    entity: "PLN Nusa Daya",
    statuses: ["done", "done", "done", "done", "done", "done", "done"]
  },
  {
    entity: "PLN MCTN",
    statuses: ["no-ratification", "done", "done", "done", "done", "no-ratification", "done"]
  },
  {
    entity: "PLN Batam",
    statuses: ["drafting", "drafting", "done", "drafting", "done", "no-ratification", "done"]
  }
];

const policyEntities = [
  "PLN IP",
  "PLN EPI",
  "PLN NP",
  "PLN ICON+",
  "PLN EMI",
  "PLN ES",
  "PLN Haleyora Power",
  "PLN Nusa Daya",
  "PLN MCTN",
  "PLN Batam"
];

const policyTypes = [
  "Aset Properti",
  "Arsip",
  "SPPD",
  "Fasilitas Kerja",
  "BFKO",
  "Indirect Procurement",
  "Kendaraan Operasional"
];

let crData = [
  { app: "ESPPD", request: "CR utama E-SPPD", progress: 60.35, status: "On Progress", target: "Multi target" },
  { app: "ESPPD Manage Service", request: "Integrasi manage service", progress: 36.43, status: "On Progress", target: "30 Jun 2026" },
  { app: "ESPPD Reengineering", request: "Persiapan infrastruktur & migrasi", progress: 0, status: "Belum Mulai", target: "Belum tersedia" },
  { app: "ESPPD SHAP", request: "Pilot PLN EPI / SHAP", progress: 93.18, status: "On Progress", target: "Sosialisasi" },
  { app: "NEW E-COP", request: "Tahap I selesai, Tahap II 42,5%", progress: 71.25, status: "On Progress", target: "Tahap II" },
  { app: "E-COP PLN EPI", request: "Migrasi, approval, pemesanan kendaraan", progress: 51.82, status: "On Progress", target: "08 Jul 2026" },
  { app: "NEW E-MEETING PLN Click", request: "Integrasi E-Meeting dengan PLN Click", progress: 100, status: "Selesai", target: "23 Mei 2026" },
  { app: "E-MEETING Konsumsi Online", request: "Role, SIT, UAT, deploy", progress: 100, status: "Selesai", target: "05 Mei 2026" },
  { app: "E-TRANSPORT Multitrip", request: "Tahap I selesai, Tahap II belum berjalan", progress: 50, status: "On Progress", target: "25 Mei 2026" }
];

const aoCorporateData = {
  period: "Mei 2026",
  total: 2931185,
  topCosts: [
    { name: "Honorarium", value: 841322, yoy: 118, rkap: 28 },
    { name: "Beban Amortisasi", value: 505117, yoy: 161, rkap: 50 },
    { name: "Asuransi", value: 347801, yoy: 109, rkap: 35 },
    { name: "Perjalanan dinas non diklat", value: 250611, yoy: 95, rkap: 31 },
    { name: "Pajak / Retribusi", value: 233802, yoy: 107, rkap: 24 },
    { name: "Listrik, gas dan air", value: 190372, yoy: 86, rkap: 39 },
    { name: "Tehnologi Informasi", value: 119896, yoy: 112, rkap: 45 },
    { name: "Bahan Makanan dan Konsumsi", value: 105855, yoy: 88, rkap: 32 }
  ],
  topUnits: [
    { unit: "KPST", value: 1086889 },
    { unit: "SPIP", value: 590642 },
    { unit: "SPIC", value: 387503 },
    { unit: "SPNP", value: 379701 },
    { unit: "APEJ", value: 163045 },
    { unit: "SPEP", value: 62343 },
    { unit: "APBT", value: 60377 },
    { unit: "TJBB", value: 54263 }
  ]
};

const statusClass = {
  "Selesai": "done",
  "On Progress": "progress",
  "Belum Mulai": "not-started",
  "Terlambat": "progress",
  "Plan": "not-started"
};

const statusDotClass = {
  "Selesai": "green-dot",
  "On Progress": "amber-dot",
  "Belum Mulai": "gray-dot",
  "Terlambat": "red-dot",
  "Plan": "blue-dot"
};

const policyColumns = [
  "Aset Properti",
  "Arsip",
  "SPPD",
  "Fasilitas Kerja",
  "BFKO",
  "Indirect Procurement",
  "Kendaraan Operasional"
];

const policyStatusLabel = {
  done: "Selesai endorsement",
  discussion: "Diskusi internal",
  "no-ratification": "Tidak ratifikasi",
  drafting: "Proses drafting",
  "review-fix": "Perbaikan review"
};

function percentLabel(value) {
  if (Number.isInteger(value)) return `${value}%`;
  return `${value.toFixed(2).replace(".", ",")}%`;
}

function numberLabel(value) {
  return Number(value || 0).toLocaleString("id-ID");
}

function policyMetrics() {
  const flat = policyData.flatMap((row) => row.statuses);
  return {
    entities: policyData.length,
    types: policyColumns.length,
    total: flat.length,
    done: flat.filter((status) => status === "done").length,
    discussion: flat.filter((status) => status === "discussion").length,
    drafting: flat.filter((status) => status === "drafting").length,
    reviewFix: flat.filter((status) => status === "review-fix").length,
    noRatification: flat.filter((status) => status === "no-ratification").length,
    followUp: flat.filter((status) => status !== "done").length
  };
}

function renderPolicyRows() {
  const target = document.getElementById("policyRows");
  if (!target) return;
  const statusLabel = {
    done: "Selesai",
    discussion: "Diskusi",
    "no-ratification": "Tidak Ratifikasi",
    drafting: "Drafting",
    "review-fix": "Perbaikan Review"
  };
  const statusTitle = {
    done: "Selesai endorsement",
    discussion: "Diskusi internal di SHAP / terdapat perbedaan ketentuan",
    "no-ratification": "Tidak melakukan ratifikasi",
    drafting: "Proses drafting",
    "review-fix": "Perbaikan hasil review"
  };

  target.innerHTML = policyData
    .map((row, index) => {
      const statuses = row.statuses
        .map((status, statusIndex) => `
          <td>
            <span class="ratification-status ${status}" title="${policyColumns[statusIndex]} - ${statusTitle[status]}">
              ${statusLabel[status]}
            </span>
          </td>
        `)
        .join("");

      return `
        <tr>
          <td>${index + 1}</td>
          <td><strong>${row.entity}</strong></td>
          ${statuses}
        </tr>
      `;
    })
    .join("");
}

function renderPolicyEntities() {
  const target = document.getElementById("policyEntities");
  if (!target) return;
  target.innerHTML = policyEntities
    .map((entity, index) => `<span><b>${index + 1}</b>${entity}</span>`)
    .join("");
}

function renderPolicyTypes() {
  const target = document.getElementById("policyTypes");
  if (!target) return;
  target.innerHTML = policyTypes
    .map((policy, index) => `<span><b>${index + 1}</b>${policy}</span>`)
    .join("");
}

function setupInfoPopover(triggerId, popoverId) {
  const trigger = document.getElementById(triggerId);
  const popover = document.getElementById(popoverId);
  if (!trigger || !popover) return;

  function closePopover() {
    popover.hidden = true;
    trigger.setAttribute("aria-expanded", "false");
  }

  function togglePopover() {
    document.querySelectorAll(".entity-popover").forEach((item) => {
      if (item !== popover) {
        item.hidden = true;
        const owner = document.querySelector(`[aria-controls="${item.id}"]`);
        if (owner) owner.setAttribute("aria-expanded", "false");
      }
    });
    popover.hidden = !popover.hidden;
    trigger.setAttribute("aria-expanded", String(!popover.hidden));
  }

  trigger.addEventListener("click", (event) => {
    event.stopPropagation();
    togglePopover();
  });

  popover.addEventListener("click", (event) => {
    event.stopPropagation();
  });

  trigger.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      togglePopover();
    }
  });

  document.addEventListener("click", (event) => {
    if (!popover.hidden && !trigger.contains(event.target)) closePopover();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closePopover();
  });
}

function renderCrRows(rows = crData) {
  const target = document.getElementById("crRows");
  target.innerHTML = rows
    .map((row, index) => {
      const barClass = row.progress >= 100 ? "" : row.progress >= 50 ? "warn" : "risk";
      return `
        <tr>
          <td>${index + 1}</td>
          <td><strong>${row.app}</strong></td>
          <td>${row.request}</td>
          <td>
            <div class="progress-cell">
              <div class="bar ${barClass}"><span style="width:${row.progress}%"></span></div>
              ${percentLabel(row.progress)}
            </div>
          </td>
          <td><span class="badge ${statusClass[row.status]}">${row.status}</span></td>
          <td><strong>${row.target}</strong></td>
        </tr>
      `;
    })
    .join("");
}

function renderAoCorporate() {
  const topRows = document.getElementById("aoTopRows");
  const unitRows = document.getElementById("aoUnitRows");
  if (topRows) {
    topRows.innerHTML = aoCorporateData.topCosts
      .map((row) => `
        <tr>
          <td><strong>${row.name}</strong></td>
          <td>${numberLabel(row.value)} jt</td>
          <td><span class="${row.yoy >= 100 ? "ao-hot" : "ao-cool"}">${row.yoy}%</span></td>
          <td>${row.rkap}%</td>
        </tr>
      `)
      .join("");
  }
  if (unitRows) {
    unitRows.innerHTML = aoCorporateData.topUnits
      .map((row) => `
        <tr>
          <td><strong>${row.unit}</strong></td>
          <td>${numberLabel(row.value)} jt</td>
          <td>${Math.round(row.value / aoCorporateData.total * 100)}%</td>
        </tr>
      `)
      .join("");
  }
}

function updateDashboardMetrics() {
  const total = crData.length;
  const done = crData.filter((row) => row.status === "Selesai").length;
  const onProgress = crData.filter((row) => row.status === "On Progress").length;
  const notStarted = crData.filter((row) => row.status === "Belum Mulai").length;
  const progress = total
    ? crData.reduce((sum, row) => sum + Number(row.progress || 0), 0) / total
    : 0;
  const policy = policyMetrics();

  const values = {
    totalCr: total,
    doneCr: done,
    progressCr: onProgress,
    notStartedCr: notStarted,
    summaryTotal: total,
    summaryDone: done,
    summaryProgress: onProgress,
    summaryNotStarted: notStarted,
    summaryPolicyEntities: policy.entities,
    summaryPolicyTypes: policy.types,
    summaryPolicyDone: policy.done,
    summaryPolicyFollowUp: policy.followUp
  };

  Object.entries(values).forEach(([id, value]) => {
    const element = document.getElementById(id);
    if (element) element.textContent = value;
  });

  const progressLabel = percentLabel(progress);
  const progressText = document.getElementById("overallProgress");
  const donut = document.getElementById("progressDonut");
  if (progressText) progressText.textContent = progressLabel;
  if (donut) donut.style.setProperty("--value", progress.toFixed(2));

  document.querySelectorAll(".summary-metrics .percent-ring strong").forEach((element) => {
    element.textContent = progressLabel;
  });

  const summaryText = document.getElementById("executiveSummaryText");
  if (summaryText) {
    summaryText.textContent = `Dashboard menunjukkan tiga perhatian utama: ratifikasi kebijakan, monitoring kinerja, dan penyelesaian Change Request aplikasi. Dari ${values.summaryPolicyEntities} entitas SH/AP dan ${values.summaryPolicyTypes} jenis kebijakan, terdapat ${values.summaryPolicyDone} status selesai endorsement dan ${values.summaryPolicyFollowUp} status yang masih perlu tindak lanjut. Monitoring kinerja s.d. Juni 2026 menunjukkan NKO 106,84 dengan status tercapai. Pada sisi aplikasi, terdapat ${total} Change Request dengan progress keseluruhan ${progressLabel}, terdiri dari ${done} selesai, ${onProgress} on progress, dan ${notStarted} belum mulai.`;
  }
}

function setupNavigation() {
  const dashboard = document.querySelector(".dashboard");
  const title = document.querySelector(".title-block h1");
  const description = document.querySelector(".title-block .description");
  const navItems = document.querySelectorAll(".nav-item");
  const defaultTitle = "Strategi & Evaluasi GA";
  const defaultDescription = "Dashboard ini menyajikan status kebijakan (Holding & Ratifikasi) dan Change Request Aplikasi untuk mendukung percepatan pencapaian target perusahaan.";

  navItems.forEach((item) => {
    item.addEventListener("click", (event) => {
      const target = item.dataset.nav;
      if (!target) return;
      event.preventDefault();
      navItems.forEach((nav) => nav.classList.remove("is-active"));
      item.classList.add("is-active");

      if (target === "ao") {
        dashboard.classList.add("ao-mode");
        title.textContent = "AO Korporat";
        description.textContent = "Monitoring realisasi Biaya Administrasi Umum korporat, RKAP/AO 2026, sinyal risiko, dan kontributor biaya terbesar.";
      } else {
        dashboard.classList.remove("ao-mode");
        title.textContent = defaultTitle;
        description.textContent = defaultDescription;
      }
    });
  });
}

function crExportRows() {
  return crData.map((row, index) => [
    index + 1,
    row.app,
    row.request,
    `${row.progress}%`,
    row.status,
    row.target
  ]);
}

function policyExportRows() {
  const statusLabel = {
    done: "Selesai endorsement",
    discussion: "Diskusi internal/perbedaan ketentuan",
    "no-ratification": "Tidak melakukan ratifikasi",
    drafting: "Proses drafting",
    "review-fix": "Perbaikan hasil review"
  };

  return policyData.map((row, index) => [
    index + 1,
    row.entity,
    ...row.statuses.map((status) => statusLabel[status] || status)
  ]);
}

function downloadBlob(content, filename, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function downloadCsv() {
  const header = ["No", "Aplikasi", "Change Request", "Progress", "Status", "Target Selesai"];
  const rows = crExportRows();
  const csv = [header, ...rows]
    .map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(","))
    .join("\n");
  downloadBlob(`\ufeff${csv}`, "dashboard-change-request-aplikasi.csv", "text/csv;charset=utf-8");
}

function downloadJson() {
  const data = {
    generatedAt: new Date().toISOString(),
    policyRatification: policyData,
    changeRequest: crData
  };
  downloadBlob(JSON.stringify(data, null, 2), "dashboard-strategi-evaluasi-ga.json", "application/json;charset=utf-8");
}

function downloadExcel() {
  if (!window.XLSX) {
    alert("Library Excel belum siap. Silakan refresh halaman lalu coba lagi.");
    return;
  }

  const policyHeader = [
    "No",
    "Entitas",
    "Aset Properti",
    "Arsip",
    "SPPD",
    "Fasilitas Kerja",
    "BFKO",
    "Indirect Procurement",
    "Kendaraan Operasional"
  ];
  const crHeader = ["No", "Aplikasi", "Change Request", "Progress", "Status", "Target Selesai"];
  const policyRows = policyExportRows();
  const crRows = crExportRows();
  const donePolicy = policyData.reduce((sum, row) => sum + row.statuses.filter((status) => status === "done").length, 0);
  const followUpPolicy = policyData.reduce((sum, row) => sum + row.statuses.filter((status) => status !== "done").length, 0);
  const crProgress = crData.length
    ? crData.reduce((sum, row) => sum + Number(row.progress || 0), 0) / crData.length
    : 0;

  const workbook = window.XLSX.utils.book_new();
  const summarySheet = window.XLSX.utils.aoa_to_sheet([
    ["Dashboard Strategi & Evaluasi GA"],
    ["Tanggal Export", new Date().toLocaleString("id-ID")],
    [],
    ["Area", "Indikator", "Nilai"],
    ["Ratifikasi Kebijakan", "Entitas SH/AP", policyData.length],
    ["Ratifikasi Kebijakan", "Jenis Kebijakan", policyHeader.length - 2],
    ["Ratifikasi Kebijakan", "Selesai endorsement", donePolicy],
    ["Ratifikasi Kebijakan", "Perlu tindak lanjut", followUpPolicy],
    ["Change Request", "Total CR", crData.length],
    ["Change Request", "Progress keseluruhan", percentLabel(crProgress)]
  ]);
  const policySheet = window.XLSX.utils.aoa_to_sheet([policyHeader, ...policyRows]);
  const crSheet = window.XLSX.utils.aoa_to_sheet([crHeader, ...crRows]);

  window.XLSX.utils.book_append_sheet(workbook, summarySheet, "Ringkasan");
  window.XLSX.utils.book_append_sheet(workbook, policySheet, "Ratifikasi Kebijakan");
  window.XLSX.utils.book_append_sheet(workbook, crSheet, "Change Request");
  window.XLSX.writeFile(workbook, "dashboard-strategi-evaluasi-ga.xlsx");
}

function exportPdf() {
  const dashboard = document.querySelector(".dashboard");
  const activeNav = document.querySelector(".nav-item.is-active");
  const strategyNav = document.querySelector('[data-nav="strategy"]');
  const title = document.querySelector(".title-block h1");
  const description = document.querySelector(".title-block .description");
  const previousNav = activeNav;
  const wasAoMode = dashboard?.classList.contains("ao-mode");

  dashboard?.classList.remove("ao-mode");
  document.querySelectorAll(".nav-item").forEach((nav) => nav.classList.remove("is-active"));
  strategyNav?.classList.add("is-active");
  if (title) title.textContent = "Strategi & Evaluasi GA";
  if (description) {
    description.textContent = "Dashboard ini menyajikan status kebijakan (Holding & Ratifikasi) dan Change Request Aplikasi untuk mendukung percepatan pencapaian target perusahaan.";
  }

  document.body.classList.add("print-strategy");
  setTimeout(() => window.print(), 150);

  const restore = () => {
    document.body.classList.remove("print-strategy");
    if (wasAoMode) dashboard?.classList.add("ao-mode");
    document.querySelectorAll(".nav-item").forEach((nav) => nav.classList.remove("is-active"));
    (previousNav || strategyNav)?.classList.add("is-active");
    if (wasAoMode) {
      if (title) title.textContent = "AO Korporat";
      if (description) description.textContent = "Monitoring realisasi Biaya Administrasi Umum korporat, RKAP/AO 2026, sinyal risiko, dan kontributor biaya terbesar.";
    }
    window.removeEventListener("afterprint", restore);
  };
  window.addEventListener("afterprint", restore);
}

function makeMetric(label, value, tone = "") {
  return `<div class="detail-metric ${tone}"><strong>${value}</strong><span>${label}</span></div>`;
}

function renderDetailPolicy() {
  const metrics = policyMetrics();
  const followUpRows = policyData
    .map((row) => {
      const issues = row.statuses
        .map((status, index) => ({ status, column: policyColumns[index] }))
        .filter((item) => item.status !== "done");
      return { entity: row.entity, issues };
    })
    .filter((row) => row.issues.length);

  const detailRows = policyData
    .map((row) => `
      <tr>
        <td><strong>${row.entity}</strong></td>
        ${row.statuses.map((status) => `<td><span class="ratification-status ${status}">${policyStatusLabel[status]}</span></td>`).join("")}
      </tr>
    `)
    .join("");

  return `
    <section class="detail-section">
      <h3>Executive Snapshot</h3>
      <div class="detail-metrics">
        ${makeMetric("Entitas SH/AP", metrics.entities)}
        ${makeMetric("Jenis Kebijakan", metrics.types)}
        ${makeMetric("Selesai Endorsement", metrics.done, "green")}
        ${makeMetric("Perlu Tindak Lanjut", metrics.followUp, "amber")}
        ${makeMetric("Diskusi Internal", metrics.discussion, "amber")}
        ${makeMetric("Drafting/Review", metrics.drafting + metrics.reviewFix, "purple")}
      </div>
    </section>
    <section class="detail-columns">
      <article class="detail-section">
        <h3>Decision Points</h3>
        <ul class="detail-action-list">
          <li><strong>Prioritaskan ${metrics.followUp} status non-hijau</strong><span>BoD dapat meminta komitmen tanggal penyelesaian dari SH/AP terkait.</span></li>
          <li><strong>Kunci penyelesaian diskusi internal</strong><span>Fokus pada status kuning yang menunjukkan perbedaan ketentuan atau pembahasan internal.</span></li>
          <li><strong>Validasi evidence endorsement</strong><span>Pastikan status hijau memiliki dokumen pengesahan atau bukti implementasi.</span></li>
        </ul>
      </article>
      <article class="detail-section">
        <h3>Working Actions</h3>
        <ul class="detail-action-list">
          ${followUpRows.slice(0, 5).map((row) => `
            <li><strong>${row.entity}</strong><span>${row.issues.map((issue) => issue.column).join(", ")}</span></li>
          `).join("")}
        </ul>
      </article>
    </section>
    <section class="detail-section">
      <h3>Detail Monitoring Ratifikasi</h3>
      <div class="detail-table-wrap">
        <table class="detail-table">
          <thead>
            <tr class="detail-policy-group-row">
              <th rowspan="2">Entitas</th>
              <th colspan="${policyColumns.length}">Kebijakan</th>
            </tr>
            <tr>
              ${policyColumns.map((column) => `<th>${column}</th>`).join("")}
            </tr>
          </thead>
          <tbody>${detailRows}</tbody>
        </table>
      </div>
      <div class="detail-legend">
        <strong>Keterangan Status</strong>
        <div>
          <span><b class="dot green-dot"></b>Selesai endorsement</span>
          <span><b class="dot amber-dot"></b>Diskusi internal/perbedaan ketentuan</span>
          <span><b class="dot peach-dot"></b>Tidak melakukan ratifikasi</span>
          <span><b class="dot white-dot"></b>Proses drafting</span>
          <span><b class="dot purple-dot"></b>Perbaikan hasil review</span>
        </div>
      </div>
    </section>
  `;
}

function renderDetailCr() {
  const total = crData.length;
  const done = crData.filter((row) => row.status === "Selesai").length;
  const onProgress = crData.filter((row) => row.status === "On Progress").length;
  const notStarted = crData.filter((row) => row.status === "Belum Mulai").length;
  const progress = total ? crData.reduce((sum, row) => sum + Number(row.progress || 0), 0) / total : 0;
  const critical = crData
    .filter((row) => row.status !== "Selesai")
    .sort((a, b) => a.progress - b.progress);

  return `
    <section class="detail-section">
      <h3>Executive Snapshot</h3>
      <div class="detail-metrics">
        ${makeMetric("Total Change Request", total)}
        ${makeMetric("Progress Keseluruhan", percentLabel(progress), "green")}
        ${makeMetric("Selesai", done, "green")}
        ${makeMetric("On Progress", onProgress, "amber")}
        ${makeMetric("Belum Mulai", notStarted, "gray")}
        ${makeMetric("Prioritas Minggu Ini", critical.slice(0, 3).length, "purple")}
      </div>
    </section>
    <section class="detail-columns">
      <article class="detail-section">
        <h3>Decision Points</h3>
        <ul class="detail-action-list">
          <li><strong>ESPPD Manage Service</strong><span>Perlu kepastian resource UAT dan deploy karena progress masih 36,43%.</span></li>
          <li><strong>ESPPD Reengineering</strong><span>Belum mulai, perlu owner definitif dan target baru.</span></li>
          <li><strong>Tahap II E-COP/E-Transport</strong><span>Perlu keputusan scope agar tidak menjadi bottleneck lanjutan.</span></li>
        </ul>
      </article>
      <article class="detail-section">
        <h3>Working Actions</h3>
        <ul class="detail-action-list">
          ${critical.slice(0, 5).map((row) => `
            <li><strong>${row.app}</strong><span>${row.request} - ${percentLabel(row.progress)} - Target: ${row.target}</span></li>
          `).join("")}
        </ul>
      </article>
    </section>
    <section class="detail-section">
      <h3>Detail Monitoring Change Request</h3>
      <div class="detail-table-wrap">
        <table class="detail-table">
          <thead>
            <tr><th>Aplikasi</th><th>Change Request</th><th>Progress</th><th>Status</th><th>Target</th><th>Management Signal</th></tr>
          </thead>
          <tbody>
            ${crData.map((row) => `
              <tr>
                <td><strong>${row.app}</strong></td>
                <td>${row.request}</td>
                <td>${percentLabel(row.progress)}</td>
                <td><span class="badge ${statusClass[row.status]}">${row.status}</span></td>
                <td><strong>${row.target}</strong></td>
                <td>${row.status === "Selesai" ? "Monitor pasca implementasi" : row.progress < 50 ? "Perlu keputusan/percepatan" : "Pantau target mingguan"}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </section>
  `;
}

function renderDetailPerformance() {
  const source = document.querySelector(".performance-panel");
  if (!source) return "";
  const report = source.querySelector(".performance-source-shell")?.outerHTML || "";
  const table = source.querySelector(".performance-table-wrap")?.outerHTML || "";
  const legend = source.querySelector(".performance-legend")?.outerHTML || "";
  return `
    <section class="detail-metrics">
      <div class="detail-metric green"><strong>106,84</strong><span>Nilai NKO</span></div>
      <div class="detail-metric green"><strong>Tercapai</strong><span>Status Kinerja</span></div>
      <div class="detail-metric purple"><strong>10</strong><span>Indikator Utama</span></div>
      <div class="detail-metric gray"><strong>100</strong><span>Total Bobot</span></div>
    </section>
    <section class="detail-section">
      <h3>Laporan Pencapaian KPI Tahun 2026</h3>
      ${report}
      ${table}
      ${legend}
    </section>
  `;
}

function setupDetailModal() {
  const overlay = document.getElementById("detailOverlay");
  const closeButton = document.getElementById("detailClose");
  const title = document.getElementById("detailTitle");
  const subtitle = document.getElementById("detailSubtitle");
  const eyebrow = document.getElementById("detailEyebrow");
  const body = document.getElementById("detailBody");
  if (!overlay || !closeButton || !title || !subtitle || !eyebrow || !body) return;

  function openDetail(type) {
    try {
      if (type === "policy") {
        eyebrow.textContent = "Kebijakan & Ratifikasi";
        title.textContent = "Detail Monitoring Ratifikasi Kebijakan";
        subtitle.textContent = "Membantu BoD melihat entitas yang membutuhkan keputusan, evidence, dan tindak lanjut.";
        body.innerHTML = renderDetailPolicy();
      } else if (type === "performance") {
        eyebrow.textContent = "Monitoring Kinerja";
        title.textContent = "Detail Monitoring Kinerja Divisi Umum dan Aset Properti";
        subtitle.textContent = "Menampilkan detail NKO s.d. Juni 2026 berdasarkan laporan pencapaian KPI Divisi Umum dan Aset Properti.";
        body.innerHTML = renderDetailPerformance();
      } else {
        eyebrow.textContent = "Change Request Aplikasi";
        title.textContent = "Detail Monitoring Change Request";
        subtitle.textContent = "Membantu BoD melihat prioritas aplikasi, risiko delivery, dan action working level.";
        body.innerHTML = renderDetailCr();
      }
      overlay.hidden = false;
      document.body.classList.add("modal-open");
      if (window.lucide) window.lucide.createIcons();
    } catch (error) {
      console.error(error);
      alert("Detail belum dapat ditampilkan. Silakan refresh halaman lalu coba kembali.");
    }
  }

  function closeDetail() {
    overlay.hidden = true;
    document.body.classList.remove("modal-open");
  }

  document.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-detail]");
    if (!trigger) return;
    event.preventDefault();
    openDetail(trigger.dataset.detail);
  });

  closeButton.addEventListener("click", closeDetail);
  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) closeDetail();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !overlay.hidden) closeDetail();
  });
}

function parseProgress(value) {
  if (typeof value === "number") return value <= 1 ? value * 100 : value;
  const cleaned = String(value || "")
    .replace("%", "")
    .replace(",", ".")
    .trim();
  const parsed = Number(cleaned);
  if (Number.isNaN(parsed)) return 0;
  return parsed <= 1 ? parsed * 100 : parsed;
}

function excelDate(value) {
  if (!value && value !== 0) return "";
  if (typeof value === "number" && window.XLSX?.SSF) {
    return window.XLSX.SSF.format("dd mmm yyyy", value);
  }
  return String(value);
}

function normalizeRow(row) {
  const app = row.Aplikasi || row.Application || row.app;
  const request = row["Change Request"] || row["Change request"] || row.Request || row.request;
  const progress = row.Progress || row.Progres || row["Progress Dashboard"] || row.progress;
  const status = row.Status || row["Status Dashboard"] || row.status;
  const target = row["Target Selesai"] || row.Target || row.target;

  if (!app || !request) return null;

  return {
    app: String(app),
    request: String(request),
    progress: parseProgress(progress),
    status: String(status || "On Progress"),
    target: excelDate(target || "")
  };
}

function rowsFromWorkbook(workbook) {
  const preferredSheet =
    workbook.Sheets.Dashboard_Source ||
    workbook.Sheets.List_Monitoring_CR ||
    workbook.Sheets.CR_Master ||
    workbook.Sheets[workbook.SheetNames[0]];
  const matrix = window.XLSX.utils.sheet_to_json(preferredSheet, { header: 1, defval: "" });
  const headerIndex = matrix.findIndex((row) => {
    const labels = row.map((cell) => String(cell).trim().toLowerCase());
    return labels.includes("aplikasi") && labels.some((label) => label.includes("change request"));
  });

  if (headerIndex === -1) return [];

  const headers = matrix[headerIndex].map((cell) => String(cell).trim());
  const rows = matrix.slice(headerIndex + 1).map((row) => {
    const record = {};
    headers.forEach((header, index) => {
      if (header) record[header] = row[index];
    });
    return record;
  });
  return rows.map(normalizeRow).filter(Boolean);
}

function rowsFromCsv(text) {
  const workbook = window.XLSX.read(text, { type: "string" });
  return rowsFromWorkbook(workbook);
}

function rowsFromJson(text) {
  const parsed = JSON.parse(text);
  const rows = Array.isArray(parsed) ? parsed : parsed.crData || parsed.data || [];
  return rows.map(normalizeRow).filter(Boolean);
}

async function importDataFile(file) {
  const extension = file.name.split(".").pop().toLowerCase();
  let rows = [];

  if (["xlsx", "xls"].includes(extension)) {
    const buffer = await file.arrayBuffer();
    const workbook = window.XLSX.read(buffer, { type: "array", cellDates: false });
    rows = rowsFromWorkbook(workbook);
  } else if (extension === "csv") {
    rows = rowsFromCsv(await file.text());
  } else if (extension === "json") {
    rows = rowsFromJson(await file.text());
  }

  if (!rows.length) {
    alert("Data tidak terbaca. Pastikan file memiliki kolom Aplikasi, Change Request, Progress/Progres, Status, dan Target Selesai.");
    return;
  }

  crData = rows;
  renderCrRows();
  updateDashboardMetrics();
  alert(`Import berhasil: ${rows.length} Change Request dimuat.`);
}

function setupFilters() {
  const unitFilter = document.getElementById("unitFilter");
  unitFilter.addEventListener("change", () => {
    const unit = unitFilter.value;
    if (unit === "PLN EPI") {
      renderCrRows(crData.filter((row) => row.app.includes("EPI") || row.app.includes("SHAP")));
    } else {
      renderCrRows(crData);
    }
  });
}

function setupPeriodPicker() {
  const months = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Juli", "Agu", "Sep", "Okt", "Nov", "Des"];
  const trigger = document.getElementById("periodTrigger");
  const picker = document.getElementById("periodPicker");
  const yearLabel = document.getElementById("periodYear");
  const periodLabel = document.getElementById("periodLabel");
  const monthGrid = document.getElementById("monthGrid");
  const prevYear = document.getElementById("prevYear");
  const nextYear = document.getElementById("nextYear");
  let selectedMonth = 6;
  let selectedYear = 2026;

  if (!trigger || !picker || !yearLabel || !periodLabel || !monthGrid) return;

  function renderMonths() {
    yearLabel.textContent = selectedYear;
    periodLabel.textContent = `${months[selectedMonth]} ${selectedYear}`;
    monthGrid.innerHTML = months
      .map((month, index) => `
        <button class="${index === selectedMonth ? "active" : ""}" type="button" data-month="${index}">
          ${month}
        </button>
      `)
      .join("");
  }

  function closePicker() {
    picker.hidden = true;
    trigger.setAttribute("aria-expanded", "false");
  }

  trigger.addEventListener("click", (event) => {
    event.stopPropagation();
    picker.hidden = !picker.hidden;
    trigger.setAttribute("aria-expanded", String(!picker.hidden));
  });

  prevYear?.addEventListener("click", () => {
    selectedYear -= 1;
    renderMonths();
  });

  nextYear?.addEventListener("click", () => {
    selectedYear += 1;
    renderMonths();
  });

  monthGrid.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-month]");
    if (!button) return;
    selectedMonth = Number(button.dataset.month);
    renderMonths();
    closePicker();
  });

  document.addEventListener("click", (event) => {
    if (!picker.hidden && !picker.contains(event.target) && !trigger.contains(event.target)) {
      closePicker();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closePicker();
  });

  renderMonths();
}

function setupExportMenu() {
  const button = document.getElementById("exportMenuButton");
  const menu = document.getElementById("exportOptions");
  if (!button || !menu) return;

  function closeMenu() {
    menu.hidden = true;
    button.setAttribute("aria-expanded", "false");
  }

  button.addEventListener("click", (event) => {
    event.stopPropagation();
    menu.hidden = !menu.hidden;
    button.setAttribute("aria-expanded", String(!menu.hidden));
  });

  menu.addEventListener("click", (event) => {
    const option = event.target.closest("button[data-export]");
    if (!option) return;
    const format = option.dataset.export;
    closeMenu();
    if (format === "pdf") exportPdf();
    if (format === "xlsx") downloadExcel();
    if (format === "csv") downloadCsv();
    if (format === "json") downloadJson();
  });

  document.addEventListener("click", (event) => {
    if (!menu.hidden && !menu.contains(event.target) && !button.contains(event.target)) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".priority-card").forEach((card) => card.remove());
  renderPolicyRows();
  renderPolicyEntities();
  renderPolicyTypes();
  setupInfoPopover("entityTrigger", "entityPopover");
  setupInfoPopover("policyTypeTrigger", "policyTypePopover");
  renderCrRows();
  renderAoCorporate();
  updateDashboardMetrics();
  setupNavigation();
  setupFilters();
  setupPeriodPicker();
  setupExportMenu();
  setupDetailModal();
  document.getElementById("importData").addEventListener("click", () => {
    document.getElementById("dataFile").click();
  });
  document.getElementById("dataFile").addEventListener("change", (event) => {
    const file = event.target.files?.[0];
    if (file) importDataFile(file);
    event.target.value = "";
  });
  if (window.lucide) {
    window.lucide.createIcons();
  }
});
