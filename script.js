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

function percentLabel(value) {
  if (Number.isInteger(value)) return `${value}%`;
  return `${value.toFixed(2).replace(".", ",")}%`;
}

function renderPolicyRows() {
  const target = document.getElementById("policyRows");
  const statusLabel = {
    done: "Selesai",
    discussion: "Diskusi",
    "no-ratification": "Tidak Ratifikasi",
    drafting: "Drafting",
    "review-fix": "Perbaikan Review"
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

function updateDashboardMetrics() {
  const total = crData.length;
  const done = crData.filter((row) => row.status === "Selesai").length;
  const onProgress = crData.filter((row) => row.status === "On Progress").length;
  const notStarted = crData.filter((row) => row.status === "Belum Mulai").length;
  const progress = total
    ? crData.reduce((sum, row) => sum + Number(row.progress || 0), 0) / total
    : 0;

  const values = {
    totalCr: total,
    doneCr: done,
    progressCr: onProgress,
    notStartedCr: notStarted,
    summaryTotal: total,
    summaryDone: done,
    summaryProgress: onProgress,
    summaryNotStarted: notStarted,
    summaryPolicyEntities: policyData.length,
    summaryPolicyTypes: policyData[0]?.statuses.length || 0,
    summaryPolicyDone: policyData.reduce((sum, row) => sum + row.statuses.filter((status) => status === "done").length, 0),
    summaryPolicyFollowUp: policyData.reduce((sum, row) => sum + row.statuses.filter((status) => status !== "done").length, 0)
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
    summaryText.textContent = `Dashboard menunjukkan dua perhatian utama: ratifikasi kebijakan dan penyelesaian Change Request aplikasi. Dari ${values.summaryPolicyEntities} entitas SH/AP dan ${values.summaryPolicyTypes} jenis kebijakan, terdapat ${values.summaryPolicyDone} status selesai endorsement dan ${values.summaryPolicyFollowUp} status yang masih perlu tindak lanjut. Pada sisi aplikasi, terdapat ${total} Change Request dengan progress keseluruhan ${progressLabel}, terdiri dari ${done} selesai, ${onProgress} on progress, dan ${notStarted} belum mulai. Prioritas manajemen adalah mempercepat status ratifikasi yang belum selesai, menutup gap diskusi/drafting, serta menjaga penyelesaian CR prioritas agar roadmap General Affairs tetap terkendali.`;
  }
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
  window.print();
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
  renderCrRows();
  updateDashboardMetrics();
  setupFilters();
  setupPeriodPicker();
  setupExportMenu();
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
