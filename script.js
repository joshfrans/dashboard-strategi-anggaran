let policyData = [
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

let policyEntities = [
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

let policyTypes = [
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
  rkap: 8856162,
  absorption: 33,
  targetRate: 82,
  projection: 7724829,
  projectionRate: 87,
  yoy: 113,
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

let aoOfficeData = {
  period: "Juni 2026",
  selectedUnit: "KPST",
  realization: 1389043,
  rank: "#1 dari 39",
  rkap: 3647914,
  absorption: 38,
  yoy: 129,
  topCosts: [
    { name: "Honorarium", value: 597771, yoy: 101, absorption: 31 },
    { name: "Beban Amortisasi", value: 306464, yoy: 352, absorption: 103 },
    { name: "Teknologi Informasi", value: 267682, yoy: 177, absorption: 65 },
    { name: "Perjalanan dinas non diklat", value: 61521, yoy: 80, absorption: 20 }
  ]
};

let investmentData = {
  reportDate: "Report ANG Investasi - 16 Juli 2026",
  executiveSignal: "AKI terserap 30,43% dari anggaran kas investasi. Fokus utama: evaluasi realisasi Juli, BAPP, rekomposisi AKI, dan percepatan handshake AI 2027.",
  totalInvestment: "10,89 T",
  totalInvestmentNote: "KP 10,64 T + Sarpras Unit 255,31 M",
  aiRealization: "344,27 M",
  aiRealizationNote: "3,16% dari total AI terbit",
  aiRealizationPct: "3,16%",
  akiTotal: "1,35 T",
  akiTotalNote: "KP 1,18 T + Sarpras Unit 178,66 M",
  akiRealization: "412,23 M",
  akiRealizationNote: "30,43% dari total AKI",
  akiRealizationPct: "30,43%",
  akiGaugeNote: "412,23 M dari total AKI 1.354,51 M sudah terealisasi.",
  akiRealizationChip: "Realisasi 412,23 M",
  akiGapChip: "Sisa 942,28 M",
  akiOfficePct: "29,02%",
  akiOfficeNote: "341,29 M dari 1.175,85 M",
  akiSarprasPct: "39,71%",
  akiSarprasNote: "70,94 M dari 178,66 M",
  akiGapPct: "69,57%",
  akiGapNote: "Perlu BAPP & rekomposisi",
  akiInsight: "Serapan AKI masih 30,43%. Kantor Pusat menjadi porsi terbesar, sedangkan Sarpras Unit relatif lebih cepat menyerap. Fokus berikutnya adalah validasi BAPP Juli dan rekomposisi AKI untuk menutup gap 942,28 M."
};

const investmentFieldLabels = {
  reportDate: "Periode Laporan",
  executiveSignal: "Executive Signal",
  totalInvestment: "Total Anggaran Investasi 2026",
  totalInvestmentNote: "Catatan Total Anggaran Investasi",
  aiRealization: "Realisasi AI s.d. Juni",
  aiRealizationNote: "Catatan Realisasi AI",
  aiRealizationPct: "Persentase Realisasi AI",
  akiTotal: "Total AKI 2026",
  akiTotalNote: "Catatan Total AKI",
  akiRealization: "Realisasi AKI s.d. Juni",
  akiRealizationNote: "Catatan Realisasi AKI",
  akiRealizationPct: "Persentase Realisasi AKI",
  akiGaugeNote: "Narasi Gauge AKI",
  akiRealizationChip: "Chip Realisasi AKI",
  akiGapChip: "Chip Sisa AKI",
  akiOfficePct: "Persentase AKI Kantor Pusat",
  akiOfficeNote: "Catatan AKI Kantor Pusat",
  akiSarprasPct: "Persentase AKI Sarpras Unit",
  akiSarprasNote: "Catatan AKI Sarpras Unit",
  akiGapPct: "Persentase Gap AKI",
  akiGapNote: "Catatan Gap AKI",
  akiInsight: "Insight AKI"
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

const DEFAULT_DATABASE_UPDATED_AT = "15 Juli 2026 10:30 WIB";
const STRATEGY_LOCAL_SOURCE_KEY = "dashboardStrategyEvaluationDataSource:v20260815-google-1ZuKo8";
const STRATEGY_LOCAL_SOURCE_MODE_KEY = "dashboardStrategyEvaluationDataSourceMode:v20260815-google-1ZuKo8";
const STRATEGY_GOOGLE_SHEET_ID = "1ZuKo8aD2LJszyQa3_371rigeVJZM4Iw0";
const STRATEGY_GOOGLE_XLSX_URL = `https://docs.google.com/spreadsheets/d/${STRATEGY_GOOGLE_SHEET_ID}/export?format=xlsx`;
const STRATEGY_REALTIME_REFRESH_MS = 60 * 1000;
const STRATEGY_IMPORT_GRACE_MS = 5 * 60 * 1000;
const POLICY_MAX_ENTITY_COUNT = 30;
const POLICY_MAX_TYPE_COUNT = 30;
const POLICY_STATUS_KEYS = new Set(["done", "on-progress", "no-ratification"]);
let strategyGoogleSourceError = "";
let strategyGoogleImported = {};
let strategyRealtimeTimer;
let strategyRealtimeInFlight = false;
let strategyManualImportUntil = 0;

function formatDatabaseTimestamp(date = new Date()) {
  return new Intl.DateTimeFormat("id-ID", {
    timeZone: "Asia/Jakarta",
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  })
    .format(date)
    .replace(" pukul ", " ")
    .replace(".", ":") + " WIB";
}

function formatSourceSyncTimestamp(date = new Date()) {
  return new Intl.DateTimeFormat("id-ID", {
    timeZone: "Asia/Jakarta",
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  })
    .format(date)
    .replace(":", ".");
}

function setDatabaseUpdatedAt(value = DEFAULT_DATABASE_UPDATED_AT, persist = false) {
  const label = value || DEFAULT_DATABASE_UPDATED_AT;
  document.querySelectorAll("[data-last-updated]").forEach((element) => {
    element.textContent = label;
  });
  if (persist) localStorage.setItem("dashboardDatabaseUpdatedAt", label);
}

function markDatabaseUploadedNow() {
  const label = formatDatabaseTimestamp();
  setDatabaseUpdatedAt(label, true);
  return label;
}

function setStrategySourceStatus(sourceLabel = "Google Sheets (online)", syncedAt = new Date(), detail = "") {
  const element = document.getElementById("strategySourceStatus");
  if (!element) return;
  const status = `Sumber data: ${sourceLabel}${detail ? ` - ${detail}` : ""} - sinkron ${formatSourceSyncTimestamp(syncedAt)}`;
  element.textContent = `Sumber data: ${sourceLabel}${detail ? ` (${detail})` : ""}`;
  element.title = status;
  element.closest(".date-card")?.setAttribute("title", status);
}

function currentStrategyDataSource(generatedAt = new Date().toISOString()) {
  return {
    generatedAt,
    databaseUpdatedAt: localStorage.getItem("dashboardDatabaseUpdatedAt") || DEFAULT_DATABASE_UPDATED_AT,
    policyData,
    policyEntities,
    policyTypes,
    policyColumns,
    crData,
    performanceData,
    performanceOfficialScore,
    policyPrepData,
    businessExcellenceData,
    investmentData,
    aoCorporateData,
    aoOfficeData
  };
}

function saveLocalStrategyDataSource(mode = "import") {
  try {
    localStorage.setItem(STRATEGY_LOCAL_SOURCE_KEY, JSON.stringify(currentStrategyDataSource()));
    localStorage.setItem(STRATEGY_LOCAL_SOURCE_MODE_KEY, mode);
    return true;
  } catch (error) {
    console.info("Data source lokal tidak dapat disimpan:", error);
    alert("Import berhasil, tetapi browser tidak dapat menyimpan data untuk refresh berikutnya. Coba hapus cache/storage browser atau gunakan file JSON sebagai backup.");
    return false;
  }
}

function loadLocalStrategyDataSource(options = {}) {
  try {
    const mode = localStorage.getItem(STRATEGY_LOCAL_SOURCE_MODE_KEY) || "google-cache";
    if (options.mode && mode !== options.mode) return false;
    const stored = localStorage.getItem(STRATEGY_LOCAL_SOURCE_KEY);
    if (!stored) return false;
    const source = JSON.parse(stored);
    const applied = applyStrategyDataSource(source);
    if (applied && !isValidPolicySource({ policyData, policyColumns })) {
      console.info("Data source lokal diabaikan karena struktur ratifikasi tidak valid.");
      localStorage.removeItem(STRATEGY_LOCAL_SOURCE_KEY);
      localStorage.removeItem(STRATEGY_LOCAL_SOURCE_MODE_KEY);
      return false;
    }
    if (applied && source.databaseUpdatedAt) setDatabaseUpdatedAt(source.databaseUpdatedAt, true);
    return applied;
  } catch (error) {
    console.info("Data source lokal tidak dapat dimuat:", error);
    localStorage.removeItem(STRATEGY_LOCAL_SOURCE_KEY);
    localStorage.removeItem(STRATEGY_LOCAL_SOURCE_MODE_KEY);
    return false;
  }
}

let policyColumns = [
  "Aset Properti",
  "Arsip",
  "SPPD",
  "Fasilitas Kerja",
  "BFKO",
  "Indirect Procurement",
  "Kendaraan Operasional"
];

const policyStatusLabel = {
  done: "Selesai",
  "on-progress": "On Progress",
  discussion: "On Progress",
  "no-ratification": "Tidak Ratifikasi",
  drafting: "On Progress",
  "review-fix": "On Progress"
};

const MIN_PERFORMANCE_MAIN_INDICATORS = 10;
const performanceOfficialWeight = 100;

let performanceData = [
  { no: 1, indicator: "Efisiensi Biaya", unit: "", weight: 20, target: "", targetPeriod: "", realization: "", achievement: "", score: 22, status: "Tercapai" },
  { no: "", indicator: "a. Efektifitas Biaya Administrasi Umum", unit: "Rp Miliar", weight: 14, target: "8.856,16", targetPeriod: "4.740,294", realization: "3.284,569", achievement: "110,00%", score: "15,40", status: "Tercapai" },
  { no: "", indicator: "b. Pengendalian NAC (Non Allowable Cost)", unit: "Rp Miliar", weight: 6, target: "Sesuai SKAO Tahun 2026", targetPeriod: "451.040551784", realization: "292.145057590", achievement: "110,00%", score: "6,60", status: "Tercapai" },
  { no: 2, indicator: "Optimalisasi penggunaan aset tanah dan bangunan", unit: "Rp Miliar", weight: 12, target: "147,74", targetPeriod: "59.83358626", realization: "85.48141199", achievement: "110,00%", score: "13,20", status: "Tercapai" },
  { no: 3, indicator: "Penyediaan Dokumen Pengadaan Barang Jasa Kantor Pusat sampai dengan selesainya draft kontrak", unit: "", weight: 12, target: "", targetPeriod: "", realization: "", achievement: "", score: "13,02", status: "Tercapai" },
  { no: "", indicator: "a. Pengadaan Langsung / Penunjukan Langsung Pasca Kualifikasi", unit: "%", weight: "", target: "93,96", targetPeriod: "93.96", realization: "100.00", achievement: "106,43%", score: "3,19", status: "Tercapai" },
  { no: "", indicator: "b. Penunjukan Langsung Prakualifikasi", unit: "%", weight: "", target: "85,19", targetPeriod: "85,19", realization: "100", achievement: "110,00%", score: "3,30", status: "Tercapai" },
  { no: "", indicator: "c. Tender Terbuka / Tender Terbatas / Seleksi Umum / Seleksi Terbatas", unit: "%", weight: "", target: "92,86", targetPeriod: "92,85714286", realization: "100,00000000", achievement: "107,69%", score: "", status: "Tercapai" },
  { no: "", indicator: "d. Seleksi Umum / Seleksi Terbatas / Tender Terbuka Prakualifikasi", unit: "%", weight: "", target: "83,33", targetPeriod: "83,33333333", realization: "100", achievement: "110,00%", score: "", status: "Tercapai" },
  { no: 4, indicator: "Integrated GA Management System", unit: "", weight: 12, target: "", targetPeriod: "", realization: "", achievement: "", score: "12,72", status: "Tercapai" },
  { no: "", indicator: "a. Optimalisasi penyerapan anggaran pemeliharaan sarana terkonsolidasi", unit: "%", weight: "", target: "95-100", targetPeriod: "95-100", realization: "98,87", achievement: "107,74%", score: "", status: "Tercapai" },
  { no: "", indicator: "b. Pengembangan Aplikasi Transformasi GA", unit: "Waktu", weight: "", target: "31 Desember 2026", targetPeriod: "30 Juni 2026", realization: "E-Meeting: 103,71%; DigiSign: 105%; rata-rata 104,36%", achievement: "104,36%", score: "", status: "Tercapai" },
  { no: 5, indicator: "Penyusunan Kebijakan General Affair", unit: "Waktu", weight: 12, target: "31 Desember 2026", targetPeriod: "30 Juni 2026", realization: "Nodin Kebijakan Layanan GA: 103,86%; Aset: 106,86%; Arsip: 110,00%", achievement: "106,90%", score: "12,82", status: "Tercapai" },
  { no: 6, indicator: "Proses Sentralisasi Pembayaran", unit: "%", weight: 10, target: "93,92", targetPeriod: "93,92", realization: "94", achievement: "100,09%", score: "10,00", status: "Tercapai" },
  { no: 7, indicator: "Manajemen Kearsipan", unit: "%", weight: 10, target: "95", targetPeriod: "95", realization: "105,61", achievement: "110,00%", score: "11,00", status: "Tercapai" },
  { no: 8, indicator: "Implementasi smart and green building", unit: "SM 1: Waktu; SM 2: Unit", weight: 6, target: "7", targetPeriod: "31 Mei 2026", realization: "21 Mei 2026", achievement: "101,43%", score: "6,08", status: "Tercapai" },
  { no: 9, indicator: "Usulan Anggaran Investasi Non Infrastruktur Ketenagalistrikan-Sarana Prasarana Umum untuk Tahun 2026", unit: "%", weight: 6, target: "100", targetPeriod: "100", realization: "100", achievement: "100,00%", score: "6,00", status: "Tercapai" },
  { no: 10, indicator: "Kepatuhan, Maturity Level dan Tata Kelola Perusahaan", unit: "", weight: "", target: "", targetPeriod: "", realization: "", achievement: "", score: "0,00", status: "Tercapai" }
];
let performanceOfficialScore = 106.84;

let policyPrepData = [
  { no: 1, area: "Fasilitas", scope: "Petunjuk Teknis Fasilitas Komunikasi", progress: 81, status: "On Progress", target: "31 Juli 2026" },
  { no: 2, area: "Fasilitas", scope: "Petunjuk Teknis BFKO", progress: 81, status: "On Progress", target: "31 Juli 2026" },
  { no: 3, area: "ATK", scope: "Petunjuk Teknis Pengelolaan ATK", progress: 10, status: "On Progress", target: "31 Okt 2026" }
];

let businessExcellenceData = [
  { semester: "Semester 1", activity: "Penyusunan dan updating dokumen aplikasi", target: 100, realization: 100.18, status: "Tercapai" },
  { semester: "Semester 2", activity: "Pencapaian update dokumen dan asesmen nilai skor PLN Bisnis Ekselen", target: 100, realization: "Belum Dinilai", status: "Belum Ukur" }
];

function percentLabel(value) {
  if (Number.isInteger(value)) return `${value}%`;
  return `${value.toFixed(2).replace(".", ",")}%`;
}

function numberLabel(value) {
  return Number(value || 0).toLocaleString("id-ID");
}

function policyMetrics() {
  const flat = policyData.flatMap((row) => row.statuses);
  const onProgress = flat.filter((status) => status !== "done" && status !== "no-ratification").length;
  return {
    entities: policyData.length,
    types: policyColumns.length,
    total: flat.length,
    done: flat.filter((status) => status === "done").length,
    discussion: onProgress,
    onProgress,
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
    "on-progress": "On Progress",
    discussion: "On Progress",
    "no-ratification": "Tidak Ratifikasi",
    drafting: "On Progress",
    "review-fix": "On Progress"
  };
  const statusTitle = {
    done: "Selesai",
    "on-progress": "On Progress",
    discussion: "On Progress",
    "no-ratification": "Tidak Ratifikasi",
    drafting: "On Progress",
    "review-fix": "On Progress"
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
    .map((policy, index) => `<span title="${policy}"><b>${index + 1}</b>${policy}</span>`)
    .join("");
}

function smartLabel(value, type = "text") {
  if (value === null || value === undefined || value === "") return "";
  if (type === "percent") return percentLabel(parseProgress(value));
  if (typeof value === "number") {
    if (Math.abs(value) > 0 && Math.abs(value) < 1 && type !== "plain") return percentLabel(value * 100);
    return numberLabel(Math.round(value * 100) / 100);
  }
  return String(value);
}

function performanceDotClass(status) {
  const normalized = String(status || "").toLowerCase();
  if (normalized.includes("belum")) return "gray-dot";
  if (normalized.includes("perlu") || normalized.includes("merah") || normalized.includes("tidak")) return "red-dot";
  if (normalized.includes("hampir") || normalized.includes("kuning")) return "amber-dot";
  return "done-dot";
}

function performanceStatusBucket(row) {
  const normalized = String(row?.status || "").toLowerCase();
  if (normalized.includes("belum")) return "gray";
  if (normalized.includes("perlu") || normalized.includes("merah") || normalized.includes("tidak")) return "red";
  if (normalized.includes("hampir") || normalized.includes("kuning")) return "amber";
  if (normalized.includes("tercapai") || normalized.includes("hijau")) return "green";

  const achievement = numberFromImport(row?.achievement, NaN);
  if (Number.isFinite(achievement)) {
    const achievementRate = achievement > 2 ? achievement / 100 : achievement;
    if (achievementRate >= 1) return "green";
    if (achievementRate >= 0.95) return "amber";
    return "red";
  }
  return "gray";
}

function performanceScoreStatus(score) {
  if (score >= 100) {
    return {
      label: "Tercapai",
      message: "Semua indikator utama berada di zona hijau."
    };
  }
  if (score >= 95) {
    return {
      label: "Hampir Tercapai",
      message: "Kinerja mendekati target, perlu monitoring indikator prioritas."
    };
  }
  return {
    label: "Perlu Peningkatan",
    message: "NKO masih di bawah target, perlu tindak lanjut pada indikator prioritas."
  };
}

function performanceMainRows() {
  const rows = performanceData.filter((row) => String(row?.no || "").trim());
  return rows.length ? rows : performanceData.filter((row) => String(row?.indicator || "").trim());
}

function renderPerformanceRows() {
  const target = document.getElementById("performanceRows");
  if (!target) return;
  const score = calculatePerformanceScore();
  target.innerHTML = `
    <tr class="performance-group-row"><td colspan="10"></td></tr>
    ${performanceData
      .map((row) => `
        <tr class="${row.no ? "performance-main-row" : "performance-sub-row"}">
          <td>${row.no || ""}</td>
          <td>${row.no ? `<strong>${row.no}. ${row.indicator || ""}</strong>` : row.indicator || ""}</td>
          <td>${row.unit || ""}</td>
          <td>${smartLabel(row.weight, "plain")}</td>
          <td>${smartLabel(row.target)}</td>
          <td>${smartLabel(row.targetPeriod)}</td>
          <td>${smartLabel(row.realization)}</td>
          <td>${row.achievement === "" || row.achievement === undefined ? "" : smartLabel(row.achievement, "percent")}</td>
          <td>${smartLabel(row.score, "plain")}</td>
          <td><span class="status-dot ${performanceDotClass(row.status)}"></span></td>
        </tr>
      `)
      .join("")}
    <tr class="performance-total-row">
      <td></td>
      <td><strong>Total</strong></td>
      <td></td>
      <td>${performanceOfficialWeight}</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td>${smartLabel(score, "plain")}</td>
      <td></td>
    </tr>
    <tr class="performance-total-row">
      <td></td>
      <td><strong>Nilai</strong></td>
      <td></td>
      <td>${performanceOfficialWeight}</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td>${smartLabel(score, "plain")}</td>
      <td><span class="status-dot done-dot"></span></td>
    </tr>
  `;
}

function renderPolicyPrepRows() {
  const target = document.getElementById("policyPrepRows");
  if (!target) return;
  target.innerHTML = policyPrepData
    .map((row, index) => `
      <tr>
        <td>${row.no || `${index + 1}.`}</td>
        <td>${row.area || ""}</td>
        <td>${row.scope || ""}</td>
        <td>${percentLabel(parseProgress(row.progress))}</td>
        <td>${row.status || ""}</td>
        <td>${row.target || ""}</td>
      </tr>
    `)
    .join("");
}

function renderBusinessExcellence() {
  businessExcellenceData.slice(0, 2).forEach((row, index) => {
    const target = document.getElementById(`businessSemester${index + 1}`);
    if (!target) return;
    const targetLabel = smartLabel(row.target, "plain");
    const realizationLabel = smartLabel(row.realization, "plain");
    target.innerHTML = `
      <div>
        <strong>${row.semester || `Semester ${index + 1}`}</strong>
        <span>${row.activity || ""}</span>
      </div>
      <b>Target<br /><em>${targetLabel}</em></b>
      <b class="${String(row.realization || "").toLowerCase().includes("belum") ? "amber-box" : "green-box"}">Realisasi<br /><em>${realizationLabel}</em></b>
    `;
  });
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
  const topCosts = Array.isArray(aoCorporateData.topCosts) ? aoCorporateData.topCosts : [];
  const topUnits = Array.isArray(aoCorporateData.topUnits) ? aoCorporateData.topUnits : [];
  if (topRows) {
    topRows.innerHTML = topCosts
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
    const total = numberFromImport(aoCorporateData.total, 0);
    unitRows.innerHTML = topUnits
      .map((row) => `
        <tr>
          <td><strong>${row.unit}</strong></td>
          <td>${numberLabel(row.value)} jt</td>
          <td>${total ? Math.round(numberFromImport(row.value) / total * 100) : 0}%</td>
        </tr>
      `)
      .join("");
  }
}

function setText(id, value) {
  document.querySelectorAll(`[id="${id}"]`).forEach((element) => {
    element.textContent = value;
  });
}

function clampPercent(value) {
  return Math.max(0, Math.min(100, Number(value || 0)));
}

function makeAnalyticsBar(label, value, tone = "") {
  const numeric = clampPercent(value);
  return `
    <div>
      <span>${label}</span>
      <b class="${tone}"><i style="width: ${numeric}%"></i></b>
      <strong>${percentLabel(Number(value || 0))}</strong>
    </div>
  `;
}

function updateAnalyticsDashboard() {
  const policy = policyMetrics();
  const crTotal = crData.length;
  const crDone = crData.filter((row) => row.status === "Selesai").length;
  const crOpen = crData.filter((row) => row.status === "On Progress").length;
  const crNotStarted = crData.filter((row) => row.status === "Belum Mulai").length;
  const crProgress = crTotal
    ? crData.reduce((sum, row) => sum + Number(row.progress || 0), 0) / crTotal
    : 0;
  const performanceScore = calculatePerformanceScore();
  const performanceSummary = getPerformanceStatusSummary();
  const policyDoneRate = policy.total ? (policy.done / policy.total) * 100 : 0;
  const akiProgress = investmentPercentValue(investmentData.akiRealizationPct);
  const akiGap = investmentData.akiGapChip || `${smartLabel(100 - akiProgress, "plain")}% belum terserap`;
  const aoAbsorption = Number(aoCorporateData.absorption || 0);
  const aoProjection = `Proyeksi setahun ${numberLabel(aoCorporateData.projection || 0)} jt`;
  const aoOfficeAbsorption = Number(aoOfficeData.absorption || 0);
  const priorityCr = [...crData]
    .filter((row) => row.status !== "Selesai")
    .sort((a, b) => Number(a.progress || 0) - Number(b.progress || 0))[0];
  const topAoCost = aoCorporateData.topCosts
    .slice()
    .sort((a, b) => b.value - a.value)[0];
  const topAoUnit = aoCorporateData.topUnits
    .slice()
    .sort((a, b) => b.value - a.value)[0];

  setText("analyticsAkiProgress", investmentData.akiRealizationPct || percentLabel(akiProgress));
  setText("analyticsAkiGap", `Gap AKI ${akiGap.replace(/^Sisa\s+/i, "")} perlu dimonitor`);
  setText("analyticsAoAbsorption", percentLabel(aoAbsorption));
  setText("analyticsAoProjection", aoProjection);
  setText("analyticsAoOfficeAbsorption", percentLabel(aoOfficeAbsorption));
  setText("analyticsAoOfficeUnit", `${aoOfficeData.selectedUnit || "Unit prioritas"} - ${aoOfficeData.rank || "peringkat belum tersedia"}`);

  const investmentGrid = document.getElementById("analyticsInvestmentGrid");
  if (investmentGrid) {
    investmentGrid.innerHTML = [
      ["Total Anggaran Investasi", investmentData.totalInvestment, investmentData.totalInvestmentNote],
      ["Realisasi AI", investmentData.aiRealization, investmentData.aiRealizationNote],
      ["Total AKI", investmentData.akiTotal, investmentData.akiTotalNote],
      ["Realisasi AKI", investmentData.akiRealization, investmentData.akiRealizationNote]
    ]
      .map(([label, value, note]) => `<div><span>${label}</span><strong>${value || "-"}</strong><small>${note || "-"}</small></div>`)
      .join("");
  }

  const investmentSignal = document.getElementById("analyticsInvestmentSignal");
  if (investmentSignal) {
    investmentSignal.innerHTML = `
      <b>Prioritas Investasi</b>
      <span>${investmentData.akiInsight || `AKI terserap ${investmentData.akiRealizationPct || percentLabel(akiProgress)} dengan ${akiGap.toLowerCase()}. Fokus pada BAPP, rekomposisi, dan validasi realisasi bulan berjalan.`}</span>
    `;
  }

  const executiveMessage = document.getElementById("analyticsExecutiveMessage");
  if (executiveMessage) {
    executiveMessage.textContent = `Laporan manajemen mengkonsolidasikan Strategi & Evaluasi, Investasi, AO Korporat, dan AO Kantor Pusat. Ratifikasi kebijakan mencatat ${policy.total} status: ${policy.done} selesai, ${policy.onProgress} on progress, dan ${policy.noRatification} tidak ratifikasi. Change Request berada pada progress ${percentLabel(crProgress)} dari ${crTotal} CR, NKO ${smartLabel(performanceScore, "plain")} berstatus tercapai. Pada Investasi, total anggaran ${investmentData.totalInvestment || "-"}, realisasi AI ${investmentData.aiRealization || "-"}, total AKI ${investmentData.akiTotal || "-"}, dan AKI terserap ${investmentData.akiRealizationPct || percentLabel(akiProgress)}. AO Korporat mencatat serapan RKAP ${percentLabel(aoAbsorption)}, sementara AO Kantor Pusat ${aoOfficeData.selectedUnit || "unit prioritas"} berada pada serapan ${percentLabel(aoOfficeAbsorption)}. Fokus keputusan berada pada ${policy.onProgress} status on progress, ${policy.noRatification} tidak ratifikasi, ${crOpen} CR on progress, gap investasi, dan pengendalian biaya AO lintas korporat serta kantor pusat.`;
  }

  const mainMessage = document.getElementById("analyticsMainMessage");
  if (mainMessage) {
    mainMessage.textContent = `Kinerja dan ratifikasi relatif terkendali, namun percepatan ${priorityCr?.app || "CR prioritas"}, validasi realisasi AI ${investmentData.aiRealization || "-"}, penutupan ${akiGap.toLowerCase()}, monitoring biaya AO Korporat ${topAoCost?.name || "utama"}, dan review unit AO Kantor Pusat ${aoOfficeData.selectedUnit || "prioritas"} perlu menjadi agenda manajemen minggu ini.`;
  }

  const decisionList = document.getElementById("analyticsDecisionList");
  if (decisionList) {
    decisionList.innerHTML = [
      ["Strategi & Evaluasi", `${policy.followUp} status ratifikasi belum hijau; perlu komitmen evidence, PIC, dan target penyelesaian SH/AP.`],
      ["Change Request", priorityCr ? `${priorityCr.app} menjadi prioritas karena status ${priorityCr.status} dengan progress ${percentLabel(Number(priorityCr.progress || 0))}.` : "Seluruh Change Request telah selesai; fokus pada monitoring pasca implementasi."],
      ["Investasi", `AI terealisasi ${investmentData.aiRealization || "-"} (${investmentData.aiRealizationPct || "progress belum tersedia"}), AKI terserap ${investmentData.akiRealizationPct || percentLabel(akiProgress)}, dan ${akiGap} perlu BAPP, rekomposisi, serta review realisasi bulan berjalan.`],
      ["AO Korporat", `${topAoCost?.name || "Unsur biaya utama"} menjadi kontributor biaya dominan dengan serapan RKAP ${percentLabel(aoAbsorption)}; perlu pengendalian agar proyeksi akhir tahun tetap terkendali.`],
      ["AO Kantor Pusat", `${aoOfficeData.selectedUnit || topAoUnit?.unit || "Unit prioritas"} mencatat serapan RKAP ${percentLabel(aoOfficeAbsorption)} dan YoY ${percentLabel(Number(aoOfficeData.yoy || 0))}; perlu monitoring unit/divisi prioritas.`]
    ]
      .map(([title, text]) => `<div><b>${title}</b><span>${text}</span></div>`)
      .join("");
  }

  const bars = document.getElementById("analyticsBars");
  if (bars) {
    bars.innerHTML = [
      makeAnalyticsBar("Ratifikasi selesai", policyDoneRate, policyDoneRate >= 75 ? "green" : "amber"),
      makeAnalyticsBar("Progress CR", crProgress, crProgress >= 80 ? "green" : "amber"),
      makeAnalyticsBar("NKO tercapai", Math.min(performanceScore, 120), "green").replace(`<strong>${percentLabel(Math.min(performanceScore, 120))}</strong>`, `<strong>${smartLabel(performanceScore, "plain")}</strong>`),
      makeAnalyticsBar("Realisasi AI", investmentPercentValue(investmentData.aiRealizationPct), investmentPercentValue(investmentData.aiRealizationPct) >= 70 ? "green" : "amber"),
      makeAnalyticsBar("Serapan AKI", akiProgress, akiProgress >= 70 ? "green" : "amber"),
      makeAnalyticsBar("Serapan RKAP AO Korporat", aoAbsorption, aoAbsorption >= 75 ? "green" : "amber"),
      makeAnalyticsBar(`Serapan RKAP AO ${aoOfficeData.selectedUnit || "KPST"}`, aoOfficeAbsorption, aoOfficeAbsorption >= 75 ? "green" : "amber")
    ].join("");
  }

  const actionRows = document.getElementById("analyticsActionRows");
  if (actionRows) {
    actionRows.innerHTML = [
      ["Validasi evidence ratifikasi", `${policy.followUp} status non-hijau terkunci owner dan due date`, policy.followUp ? "Tinggi" : "Monitor"],
      ["Lock owner CR prioritas", priorityCr ? `${priorityCr.app} memiliki target delivery mingguan` : "Monitoring pasca implementasi CR", crOpen || crNotStarted ? "Tinggi" : "Monitor"],
      ["Review realisasi AI dan gap AKI", `AI ${investmentData.aiRealization || "-"}; ${akiGap} terpetakan BAPP dan rekomposisi`, akiProgress < 70 ? "Tinggi" : "Medium"],
      ["Analisa AO Korporat", `${topAoCost?.name || "Biaya dominan"} dan proyeksi akhir tahun tervalidasi`, aoAbsorption > 90 ? "Tinggi" : "Medium"],
      ["Analisa AO Kantor Pusat", `${aoOfficeData.selectedUnit || topAoUnit?.unit || "Unit prioritas"} dan serapan RKAP ditindaklanjuti`, aoOfficeAbsorption > 90 ? "Tinggi" : "Medium"]
    ]
      .map((row) => `<tr><td>${row[0]}</td><td>${row[1]}</td><td>${row[2]}</td></tr>`)
      .join("");
  }

  updateAlertCenter();
}

function updateAlertCenter() {
  const policy = policyMetrics();
  const crTotal = crData.length;
  const crOpen = crData.filter((row) => row.status === "On Progress").length;
  const crNotStarted = crData.filter((row) => row.status === "Belum Mulai").length;
  const priorityCr = [...crData]
    .filter((row) => row.status !== "Selesai")
    .sort((a, b) => Number(a.progress || 0) - Number(b.progress || 0))[0];
  const akiProgress = investmentPercentValue(investmentData.akiRealizationPct);
  const aiProgress = investmentPercentValue(investmentData.aiRealizationPct);
  const akiGap = investmentData.akiGapChip || `${smartLabel(100 - akiProgress, "plain")}% belum terserap`;
  const aoAbsorption = Number(aoCorporateData.absorption || 0);
  const aoOfficeAbsorption = Number(aoOfficeData.absorption || 0);
  const topAoCost = aoCorporateData.topCosts
    .slice()
    .sort((a, b) => b.value - a.value)[0];

  const alerts = [
    policy.followUp > 0 && {
      area: "Strategi & Evaluasi",
      text: `${policy.onProgress} status ratifikasi on progress dan ${policy.noRatification} tidak ratifikasi perlu update keputusan/evidence SH/AP.`,
      level: policy.followUp >= 15 ? "High" : "Medium"
    },
    priorityCr && {
      area: "Change Request",
      text: `${priorityCr.app} perlu tindak lanjut karena progress ${percentLabel(Number(priorityCr.progress || 0))} dengan status ${priorityCr.status}.`,
      level: Number(priorityCr.progress || 0) < 30 ? "High" : "Medium"
    },
    akiProgress < 70 && {
      area: "Investasi",
      text: `AKI terserap ${investmentData.akiRealizationPct || percentLabel(akiProgress)}; ${akiGap} perlu BAPP dan rekomposisi.`,
      level: "High"
    },
    aiProgress < 10 && {
      area: "Investasi",
      text: `Realisasi AI masih ${investmentData.aiRealizationPct || percentLabel(aiProgress)} dari total AI terbit.`,
      level: "Medium"
    },
    aoAbsorption < 50 && {
      area: "AO Korporat",
      text: `Serapan RKAP AO Korporat ${percentLabel(aoAbsorption)} perlu dikendalikan terhadap proyeksi akhir tahun.`,
      level: "Medium"
    },
    aoOfficeAbsorption < 50 && {
      area: "AO Kantor Pusat",
      text: `${aoOfficeData.selectedUnit || "Unit prioritas"} mencatat serapan RKAP ${percentLabel(aoOfficeAbsorption)} dan perlu monitoring unit.`,
      level: "Medium"
    }
  ].filter(Boolean);

  const critical = alerts.filter((alert) => alert.level === "Critical").length;
  const high = alerts.filter((alert) => alert.level === "High").length;
  const medium = alerts.filter((alert) => alert.level === "Medium").length;
  const ok = Math.max(0, 4 - critical - high - medium);

  setText("alertCriticalCount", critical);
  setText("alertHighCount", high);
  setText("alertMediumCount", medium);
  setText("alertOkCount", ok);

  const alertRows = document.getElementById("alertRows");
  if (alertRows) {
    alertRows.innerHTML = alerts.length
      ? alerts
          .map((alert) => `<div><b>${alert.area}</b><span>${alert.text}</span><em>${alert.level}</em></div>`)
          .join("")
      : `<div><b>Dashboard</b><span>Belum ada alert prioritas dari data aktif.</span><em>On Track</em></div>`;
  }

  const riskRows = document.getElementById("alertRiskRows");
  if (riskRows) {
    riskRows.innerHTML = [
      policy.followUp ? `Evidence ratifikasi belum lengkap pada ${policy.followUp} status.` : "Ratifikasi kebijakan terkendali.",
      crOpen || crNotStarted ? `${crOpen + crNotStarted} CR belum selesai sepenuhnya.` : "Change Request seluruhnya selesai.",
      akiProgress < 70 ? "Gap investasi masih perlu BAPP, rekomposisi, dan review realisasi." : "Serapan investasi berada di jalur aman.",
      topAoCost ? `${topAoCost.name} menjadi kontributor biaya AO utama.` : "Biaya AO belum memiliki kontributor utama."
    ]
      .map((text) => `<li>${text}</li>`)
      .join("");
  }

  const actionRows = document.getElementById("alertActionRows");
  if (actionRows) {
    actionRows.innerHTML = [
      ["Strategi & Evaluasi", policy.followUp ? "Kunci evidence dan target SH/AP" : "Monitor status hijau", "PIC SH/AP", policy.followUp ? "High" : "Monitor"],
      ["Change Request", priorityCr ? `Lock owner dan target ${priorityCr.app}` : "Monitoring pasca implementasi", "Working Team", priorityCr ? "High" : "Monitor"],
      ["Investasi", `Review AI ${investmentData.aiRealization || "-"} dan gap AKI`, "Tim Investasi", akiProgress < 70 ? "High" : "Medium"],
      ["AO Korporat", topAoCost ? `Review biaya ${topAoCost.name}` : "Review proyeksi AO", "Tim AO", "Medium"],
      ["AO Kantor Pusat", `Pantau ${aoOfficeData.selectedUnit || "unit prioritas"} dan serapan RKAP`, "Tim AO KP", "Medium"]
    ]
      .map((row) => `<tr><td>${row[0]}</td><td>${row[1]}</td><td>${row[2]}</td><td>${row[3]}</td></tr>`)
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
  const prepTotal = policyPrepData.length;
  const prepDone = policyPrepData.filter((row) => row.status === "Selesai").length;
  const prepProgress = policyPrepData.filter((row) => row.status === "On Progress").length;
  const prepNotStarted = policyPrepData.filter((row) => row.status === "Belum Mulai").length;
  const performanceScore = calculatePerformanceScore();
  const performanceSummary = getPerformanceStatusSummary();
  const businessScore = businessExcellenceData[0]?.realization ?? 0;

  const values = {
    policyTotal: policy.total,
    policyDoneCard: policy.done,
    policyDiscussionCard: policy.discussion,
    policyFollowUpCard: policy.noRatification,
    policyEntityCount: policy.entities,
    policyEntityPopoverCount: policy.entities,
    policyTypeCount: policy.types,
    policyTypePopoverCount: policy.types,
    policyDoneOverview: policy.done,
    policyPrepTotal: prepTotal,
    policyPrepDone: prepDone,
    policyPrepProgress: prepProgress,
    policyPrepNotStarted: prepNotStarted,
    performanceScore: smartLabel(performanceScore, "plain"),
    performanceIndicatorCount: performanceSummary.total,
    summaryNko: smartLabel(performanceScore, "plain"),
    summaryPolicyPrepProgress: prepProgress,
    summaryBusinessExcellence: smartLabel(businessScore, businessScore <= 1 ? "percent" : "plain"),
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
    summaryPolicyFollowUp: policy.noRatification,
    analyticsPolicyDone: policy.done,
    analyticsPolicyTotal: policy.total,
    analyticsPolicyFollowUp: policy.noRatification,
    analyticsCrTotal: total,
    analyticsCrOpen: onProgress,
    analyticsCrNotStarted: notStarted,
    analyticsNko: smartLabel(performanceScore, "plain"),
    analyticsKpiGreen: performanceSummary.green
  };

  Object.entries(values).forEach(([id, value]) => {
    document.querySelectorAll(`[id="${id}"]`).forEach((element) => {
      element.textContent = value;
    });
  });

  const progressLabel = percentLabel(progress);
  const progressText = document.getElementById("overallProgress");
  const donut = document.getElementById("progressDonut");
  if (progressText) progressText.textContent = progressLabel;
  if (donut) donut.style.setProperty("--value", progress.toFixed(2));

  document.querySelectorAll(".summary-metrics .progress-cr-ring strong").forEach((element) => {
    element.textContent = progressLabel;
  });

  const summaryText = document.getElementById("executiveSummaryText");
  if (summaryText) {
    summaryText.textContent = `Strategi & Evaluasi menunjukkan ${policy.total} status kebijakan dari ${values.summaryPolicyEntities} entitas SH/AP dan ${values.summaryPolicyTypes} jenis kebijakan, terdiri dari ${values.summaryPolicyDone} selesai, ${policy.onProgress} on progress, dan ${policy.noRatification} tidak ratifikasi. Monitoring kinerja s.d. Juni 2026 mencatat NKO ${smartLabel(performanceScore, "plain")} dengan ${performanceSummary.green} indikator tercapai, ${performanceSummary.amber} hampir tercapai, dan ${performanceSummary.red} perlu peningkatan. Pada transformasi aplikasi terdapat ${total} Change Request dengan progress keseluruhan ${progressLabel}, terdiri dari ${done} selesai, ${onProgress} on progress, dan ${notStarted} belum mulai. Penyusunan kebijakan layanan GA memonitor ${prepTotal} kebijakan, serta implementasi PLN Business Excellence menunjukkan realisasi ${smartLabel(businessScore, businessScore <= 1 ? "percent" : "plain")} pada semester utama.`;
  }

  document.querySelectorAll('[id="analyticsCrProgress"]').forEach((element) => {
    element.textContent = progressLabel;
  });

  const analyticsExecutiveMessage = document.getElementById("analyticsExecutiveMessage");
  if (analyticsExecutiveMessage) {
    analyticsExecutiveMessage.textContent = `Dashboard menunjukkan ${policy.total} status ratifikasi: ${policy.done} selesai, ${policy.onProgress} on progress, dan ${policy.noRatification} tidak ratifikasi. NKO ${smartLabel(performanceScore, "plain")} berada pada status tercapai, dan Change Request aplikasi berada pada progress ${progressLabel}. Perhatian manajemen perlu diarahkan pada status ratifikasi yang masih berjalan, ${onProgress} CR on progress, ${notStarted} CR belum mulai, gap AKI, serta pengendalian biaya Administrasi Umum agar target akhir tahun tetap terkendali.`;
  }

  updateAnalyticsDashboard();
}

function setupNavigation() {
  const dashboard = document.querySelector(".dashboard");
  const title = document.querySelector(".title-block h1");
  const description = document.querySelector(".title-block .description");
  const navItems = document.querySelectorAll(".nav-item");
  const defaultTitle = "Strategi & Evaluasi";
  const defaultDescription = "Dashboard ini menyajikan status kebijakan (Holding & Ratifikasi) dan Change Request Aplikasi untuk mendukung percepatan pencapaian target perusahaan.";
  const navRoutes = {
    dashboard: "overview",
    strategy: "strategi-evaluasi",
    investment: "investasi",
    ao: "ao-kantor-pusat",
    "ao-office": "ao-korporat",
    analytics: "laporan-analitik",
    alerts: "alert-center",
    settings: "pengaturan"
  };
  const routeAliases = {
    overview: "dashboard",
    dashboard: "dashboard",
    strategi: "strategy",
    strategy: "strategy",
    "strategi-evaluasi": "strategy",
    "strategi-evaluasi-ga": "strategy",
    investasi: "investment",
    investment: "investment",
    "ao-kantor-pusat": "ao",
    "ao-kp": "ao",
    ao: "ao",
    "ao-korporat": "ao-office",
    "ao-corporate": "ao-office",
    "ao-office": "ao-office",
    "laporan-analitik": "analytics",
    laporan: "analytics",
    analytics: "analytics",
    "alert-center": "alerts",
    alerts: "alerts",
    pengaturan: "settings",
    settings: "settings"
  };

  function routeTarget() {
    const params = new URLSearchParams(window.location.search);
    const menu = params.get("menu") || params.get("view");
    const hash = window.location.hash.replace(/^#/, "");
    const route = String(menu || hash || "").toLowerCase().trim();
    return routeAliases[route] || "strategy";
  }

  function setActiveNav(target) {
    const item = document.querySelector(`.nav-item[data-nav="${target}"]`) || document.querySelector('.nav-item[data-nav="strategy"]');
    if (!item || !dashboard || !title || !description) return;

    navItems.forEach((nav) => nav.classList.remove("is-active"));
    item.classList.add("is-active");

    dashboard.classList.remove("ao-mode", "ao-office-mode", "investment-mode", "dashboard-mode", "analytics-mode", "alerts-mode", "settings-mode");
    if (target === "dashboard") {
      dashboard.classList.add("dashboard-mode");
      title.textContent = "Dashboard";
      description.textContent = "Ringkasan umum lintas Strategi & Evaluasi, Investasi, AO Korporat, dan AO Kantor Pusat untuk pembacaan manajemen.";
    } else if (target === "analytics") {
      dashboard.classList.add("analytics-mode");
      title.textContent = "Laporan & Analitik";
      description.textContent = "Executive management report untuk membaca status, risiko, dan tindak lanjut lintas menu saat presentasi dashboard.";
    } else if (target === "ao") {
      dashboard.classList.add("ao-mode");
      title.textContent = "AO Kantor Pusat";
      description.textContent = "Dashboard Administrasi Umum Kantor Pusat dari sumber monitoring utama.";
    } else if (target === "ao-office") {
      dashboard.classList.add("ao-office-mode");
      title.textContent = "AO Korporat";
      description.textContent = "Monitoring realisasi Biaya Administrasi Umum Korporat, serapan RKAP, proyeksi 2026, dan kontributor biaya terbesar.";
    } else if (target === "investment") {
      dashboard.classList.add("investment-mode");
      title.textContent = "Investasi";
      description.textContent = "Monitoring AI dan AKI 2026, usulan AI 2027, rekomposisi anggaran, serta prioritas tindak lanjut investasi.";
    } else if (target === "alerts") {
      dashboard.classList.add("alerts-mode");
      title.textContent = "Alert Center";
      description.textContent = "Pusat monitoring risiko, isu prioritas, dan tindak lanjut lintas dashboard.";
    } else if (target === "settings") {
      dashboard.classList.add("settings-mode");
      title.textContent = "Pengaturan";
      description.textContent = "Konfigurasi data source, export/import, security scan, dan informasi deployment dashboard.";
    } else {
      title.textContent = defaultTitle;
      description.textContent = defaultDescription;
    }
  }

  navItems.forEach((item) => {
    const route = navRoutes[item.dataset.nav];
    if (route) item.setAttribute("href", `#${route}`);
    item.addEventListener("click", (event) => {
      const target = item.dataset.nav;
      if (!target) return;
      event.preventDefault();
      const route = navRoutes[target] || "strategi-evaluasi";
      if (window.location.hash !== `#${route}`) {
        window.location.hash = route;
      } else {
        setActiveNav(target);
      }
    });
  });

  window.addEventListener("hashchange", () => setActiveNav(routeTarget()));
  window.setDashboardNav = setActiveNav;
  setActiveNav(routeTarget());
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

let xlsxLoadPromise;

function loadXlsxLibrary() {
  if (window.XLSX) return Promise.resolve(true);
  if (xlsxLoadPromise) return xlsxLoadPromise;

  xlsxLoadPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => {
      xlsxLoadPromise = null;
      reject(new Error("Library Excel gagal dimuat"));
    };
    document.head.appendChild(script);
  });

  return xlsxLoadPromise;
}

async function ensureXlsxLibrary() {
  try {
    await loadXlsxLibrary();
    return true;
  } catch (error) {
    console.info(error);
    alert("Library Excel belum dapat dimuat. Gunakan export CSV/JSON, atau pastikan koneksi internet mengizinkan akses CDN Excel.");
    return false;
  }
}

let importToastTimer;

function showImportToast(title, message) {
  const toast = document.getElementById("importToast");
  const titleElement = document.getElementById("importToastTitle");
  const messageElement = document.getElementById("importToastMessage");
  if (!toast || !titleElement || !messageElement) {
    alert(`${title}\n${message}`);
    return;
  }
  titleElement.textContent = title;
  messageElement.textContent = message;
  toast.hidden = false;
  requestAnimationFrame(() => toast.classList.add("is-visible"));
  if (window.lucide) window.lucide.createIcons();
  clearTimeout(importToastTimer);
  importToastTimer = setTimeout(() => {
    toast.classList.remove("is-visible");
    setTimeout(() => {
      toast.hidden = true;
    }, 220);
  }, 5200);
}

function setupImportToast() {
  const toast = document.getElementById("importToast");
  const close = document.getElementById("importToastClose");
  if (!toast || !close) return;
  close.addEventListener("click", () => {
    clearTimeout(importToastTimer);
    toast.classList.remove("is-visible");
    setTimeout(() => {
      toast.hidden = true;
    }, 180);
  });
}

function refreshStrategyMenuAfterImport() {
  renderStrategyDashboard();
  const route = "strategi-evaluasi";
  if (window.location.hash !== `#${route}`) {
    window.location.hash = route;
  }
  window.setDashboardNav?.("strategy");
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
  const data = currentStrategyDataSource();
  downloadBlob(JSON.stringify(data, null, 2), "data-source-strategi-evaluasi.json", "application/json;charset=utf-8");
}

async function downloadExcel() {
  if (!(await ensureXlsxLibrary())) return;

  const policyRows = policyData.flatMap((row) =>
    policyColumns.map((type, index) => {
      const statusKey = row.statuses[index];
      const progress = statusKey === "done" ? 100 : statusKey === "no-ratification" ? 0 : 50;
      return [
        row.entity,
        type,
        policyStatusLabel[statusKey] || statusKey || "",
        progress,
        ""
      ];
    })
  );
  const crRows = crExportRows();
  const performanceRows = performanceData.map((row) => [
    row.no,
    row.indicator,
    row.unit,
    row.weight,
    row.target,
    row.targetPeriod,
    row.realization,
    row.achievement,
    row.score,
    row.status
  ]);
  const policyPrepRows = policyPrepData.map((row) => [
    row.no,
    row.area,
    row.scope,
    row.progress,
    row.status,
    row.target
  ]);
  const businessRows = businessExcellenceData.map((row) => [
    row.semester,
    row.activity,
    row.target,
    row.realization,
    row.status,
    row.note || row.description || ""
  ]);
  const donePolicy = policyData.reduce((sum, row) => sum + row.statuses.filter((status) => status === "done").length, 0);
  const onProgressPolicy = policyData.reduce((sum, row) => sum + row.statuses.filter((status) => status !== "done" && status !== "no-ratification").length, 0);
  const noRatificationPolicy = policyData.reduce((sum, row) => sum + row.statuses.filter((status) => status === "no-ratification").length, 0);
  const crProgress = crData.length
    ? crData.reduce((sum, row) => sum + Number(row.progress || 0), 0) / crData.length
    : 0;

  const workbook = window.XLSX.utils.book_new();
  const summarySheet = window.XLSX.utils.aoa_to_sheet([
    ["Dashboard Strategi & Evaluasi"],
    ["Tanggal Export", new Date().toLocaleString("id-ID")],
    ["Fungsi", "Data source ini dapat di-import kembali untuk update menu Strategi & Evaluasi"],
    [],
    ["Area", "Indikator", "Nilai"],
    ["Ratifikasi Kebijakan", "Entitas SH/AP", policyData.length],
    ["Ratifikasi Kebijakan", "Jenis Kebijakan", policyColumns.length],
    ["Ratifikasi Kebijakan", "Selesai", donePolicy],
    ["Ratifikasi Kebijakan", "On Progress", onProgressPolicy],
    ["Ratifikasi Kebijakan", "Tidak Ratifikasi", noRatificationPolicy],
    ["Change Request", "Total CR", crData.length],
    ["Change Request", "Progress keseluruhan", percentLabel(crProgress)]
  ]);
  const policySheet = window.XLSX.utils.aoa_to_sheet([["Entitas SH/AP", "Jenis Kebijakan", "Status", "Progress", "Catatan"], ...policyRows]);
  const crSheet = window.XLSX.utils.aoa_to_sheet([["No", "Aplikasi", "Change Request", "Progress", "Status", "Target Selesai"], ...crRows]);
  const performanceSheet = window.XLSX.utils.aoa_to_sheet([["No", "Indikator Kerja", "Satuan", "Bobot", "Target 2026", "Target S.D. Juni", "Realisasi", "Pencapaian", "Nilai", "Status"], ...performanceRows]);
  const prepSheet = window.XLSX.utils.aoa_to_sheet([["No", "Bidang", "Lingkup", "Progress", "Status", "Target"], ...policyPrepRows]);
  const businessSheet = window.XLSX.utils.aoa_to_sheet([["Semester", "Aktivitas", "Target", "Realisasi", "Status", "Catatan"], ...businessRows]);
  const strategySummarySheet = window.XLSX.utils.aoa_to_sheet([
    ["Indikator", "Rumus/Nilai", "Catatan"],
    ["Nilai NKO", performanceOfficialScore, "Nilai resmi yang ditampilkan pada card Monitoring Kinerja"],
    ["Total Bobot", 100, "Bobot kinerja penuh"],
    ["Total Entitas SH/AP", policyData.length, "Dihitung dari sheet 01_Ratifikasi"],
    ["Total Kebijakan GA", policyColumns.length, "Dihitung dari sheet 01_Ratifikasi"],
    ["Total Change Request", crData.length, "Dihitung dari sheet 02_Change_Request"]
  ]);

  window.XLSX.utils.book_append_sheet(workbook, summarySheet, "00_Panduan");
  window.XLSX.utils.book_append_sheet(workbook, policySheet, "01_Ratifikasi");
  window.XLSX.utils.book_append_sheet(workbook, crSheet, "02_Change_Request");
  window.XLSX.utils.book_append_sheet(workbook, performanceSheet, "03_Kinerja");
  window.XLSX.utils.book_append_sheet(workbook, prepSheet, "04_Penyusunan_Kebijakan");
  window.XLSX.utils.book_append_sheet(workbook, businessSheet, "05_Business_Excellence");
  window.XLSX.utils.book_append_sheet(workbook, strategySummarySheet, "09_Ringkasan");
  window.XLSX.writeFile(workbook, "template-data-source-strategi-evaluasi.xlsx");
}

function investmentPercentValue(value) {
  const match = String(value || "").replace(",", ".").match(/-?\d+(\.\d+)?/);
  if (!match) return 0;
  return Math.max(0, Math.min(100, Number(match[0])));
}

function investmentExportRows() {
  return Object.entries(investmentFieldLabels).map(([key, label]) => [
    key,
    label,
    investmentData[key] ?? ""
  ]);
}

function updateInvestmentDashboard() {
  document.querySelectorAll("[data-investment-text]").forEach((element) => {
    const key = element.dataset.investmentText;
    if (investmentData[key] != null) element.textContent = investmentData[key];
  });
  document.querySelectorAll("[data-investment-width]").forEach((element) => {
    const key = element.dataset.investmentWidth;
    element.style.width = `${investmentPercentValue(investmentData[key])}%`;
  });
  document.querySelectorAll("[data-investment-style]").forEach((element) => {
    const key = element.dataset.investmentStyle;
    element.style.setProperty("--value", investmentPercentValue(investmentData[key]));
  });
  updateAnalyticsDashboard();
}

function downloadInvestmentCsv() {
  const header = ["Kode", "Indikator", "Nilai"];
  const csv = [header, ...investmentExportRows()]
    .map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(","))
    .join("\n");
  downloadBlob(`\ufeff${csv}`, "data-source-investasi.csv", "text/csv;charset=utf-8");
}

function downloadInvestmentJson() {
  downloadBlob(
    JSON.stringify({ generatedAt: new Date().toISOString(), investasi: investmentData }, null, 2),
    "data-source-investasi.json",
    "application/json;charset=utf-8"
  );
}

async function downloadInvestmentExcel() {
  if (!(await ensureXlsxLibrary())) return;
  const workbook = window.XLSX.utils.book_new();
  const sourceSheet = window.XLSX.utils.aoa_to_sheet([
    ["Kode", "Indikator", "Nilai"],
    ...investmentExportRows()
  ]);
  const guideSheet = window.XLSX.utils.aoa_to_sheet([
    ["Panduan Update Data Investasi"],
    ["1. Ubah nilai pada kolom Nilai di sheet Data Investasi."],
    ["2. Jangan mengubah kolom Kode agar dashboard dapat membaca data otomatis."],
    ["3. Import kembali file ini dari panel Import Data Investasi di dashboard."],
    [],
    ["Format yang didukung", "Excel, CSV, JSON"]
  ]);
  window.XLSX.utils.book_append_sheet(workbook, sourceSheet, "Data Investasi");
  window.XLSX.utils.book_append_sheet(workbook, guideSheet, "Panduan");
  window.XLSX.writeFile(workbook, "template-data-source-investasi.xlsx");
}

function exportInvestmentPdf() {
  const dashboard = document.querySelector(".dashboard");
  const investmentNav = document.querySelector('[data-nav="investment"]');
  const activeNav = document.querySelector(".nav-item.is-active");
  const title = document.querySelector(".title-block h1");
  const description = document.querySelector(".title-block .description");
  const previousNav = activeNav;
  const previousTitle = title?.textContent;
  const previousDescription = description?.textContent;

  dashboard?.classList.remove("ao-mode", "ao-office-mode", "dashboard-mode");
  dashboard?.classList.add("investment-mode");
  document.querySelectorAll(".nav-item").forEach((nav) => nav.classList.remove("is-active"));
  investmentNav?.classList.add("is-active");
  if (title) title.textContent = "Investasi";
  if (description) description.textContent = "Monitoring AI dan AKI 2026, usulan AI 2027, rekomposisi anggaran, serta prioritas tindak lanjut investasi.";

  document.body.classList.add("print-investment");
  setTimeout(() => window.print(), 150);

  const restore = () => {
    document.body.classList.remove("print-investment");
    document.querySelectorAll(".nav-item").forEach((nav) => nav.classList.remove("is-active"));
    previousNav?.classList.add("is-active");
    if (title && previousTitle) title.textContent = previousTitle;
    if (description && previousDescription) description.textContent = previousDescription;
    window.removeEventListener("afterprint", restore);
  };
  window.addEventListener("afterprint", restore);
}

async function exportInvestment(format) {
  if (format === "pdf") exportInvestmentPdf();
  if (format === "xlsx") await downloadInvestmentExcel();
  if (format === "csv") downloadInvestmentCsv();
  if (format === "json") downloadInvestmentJson();
}

function exportPdf() {
  const dashboard = document.querySelector(".dashboard");
  const activeNav = document.querySelector(".nav-item.is-active");
  const strategyNav = document.querySelector('[data-nav="strategy"]');
  const title = document.querySelector(".title-block h1");
  const description = document.querySelector(".title-block .description");
  const previousNav = activeNav;
  const wasAoMode = dashboard?.classList.contains("ao-mode");
  const wasAoOfficeMode = dashboard?.classList.contains("ao-office-mode");
  const wasInvestmentMode = dashboard?.classList.contains("investment-mode");
  const wasDashboardMode = dashboard?.classList.contains("dashboard-mode");

  dashboard?.classList.remove("ao-mode", "ao-office-mode", "investment-mode", "dashboard-mode");
  document.querySelectorAll(".nav-item").forEach((nav) => nav.classList.remove("is-active"));
  strategyNav?.classList.add("is-active");
  if (title) title.textContent = "Strategi & Evaluasi";
  if (description) {
    description.textContent = "Dashboard ini menyajikan status kebijakan (Holding & Ratifikasi) dan Change Request Aplikasi untuk mendukung percepatan pencapaian target perusahaan.";
  }

  document.body.classList.add("print-strategy");
  setTimeout(() => window.print(), 150);

  const restore = () => {
    document.body.classList.remove("print-strategy");
    if (wasAoMode) dashboard?.classList.add("ao-mode");
    if (wasAoOfficeMode) dashboard?.classList.add("ao-office-mode");
    if (wasInvestmentMode) dashboard?.classList.add("investment-mode");
    if (wasDashboardMode) dashboard?.classList.add("dashboard-mode");
    document.querySelectorAll(".nav-item").forEach((nav) => nav.classList.remove("is-active"));
    (previousNav || strategyNav)?.classList.add("is-active");
    if (wasAoMode) {
      if (title) title.textContent = "AO Kantor Pusat";
      if (description) description.textContent = "Dashboard Administrasi Umum Kantor Pusat dari sumber monitoring utama.";
    } else if (wasAoOfficeMode) {
      if (title) title.textContent = "AO Korporat";
      if (description) description.textContent = "Monitoring realisasi Biaya Administrasi Umum Korporat, serapan RKAP, proyeksi 2026, dan kontributor biaya terbesar.";
    } else if (wasInvestmentMode) {
      if (title) title.textContent = "Investasi";
      if (description) description.textContent = "Monitoring AI dan AKI 2026, usulan AI 2027, rekomposisi anggaran, serta prioritas tindak lanjut investasi.";
    } else if (wasDashboardMode) {
      if (title) title.textContent = "Dashboard";
      if (description) description.textContent = "Ringkasan umum lintas Strategi & Evaluasi, Investasi, AO Korporat, dan AO Kantor Pusat untuk pembacaan manajemen.";
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
          <span><b class="dot green-dot"></b><em>${metrics.done}</em> Selesai</span>
          <span><b class="dot amber-dot"></b><em>${metrics.onProgress}</em> On Progress</span>
          <span><b class="dot peach-dot"></b><em>${metrics.noRatification}</em> Tidak Ratifikasi</span>
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
  const table = source.querySelector(".performance-table-wrap")?.outerHTML || "";
  const legend = source.querySelector(".performance-legend")?.outerHTML || "";
  const score = calculatePerformanceScore();
  const scoreStatus = performanceScoreStatus(score);
  const summary = getPerformanceStatusSummary();
  return `
    <section class="detail-metrics">
      <div class="detail-metric green"><strong>${smartLabel(score, "plain")}</strong><span>Nilai NKO</span></div>
      <div class="detail-metric green"><strong>${scoreStatus.label}</strong><span>Status Kinerja</span></div>
      <div class="detail-metric purple"><strong>${summary.total}</strong><span>Indikator Utama</span></div>
      <div class="detail-metric gray"><strong>${performanceOfficialWeight}</strong><span>Total Bobot</span></div>
    </section>
    <section class="detail-section performance-detail-section">
      <div class="performance-detail-head">
        <h3>Laporan Pencapaian KPI Tahun 2026</h3>
        <label class="performance-period-chip">
          <span>Periode</span>
          <strong>S.D. Juni 2026 <i data-lucide="calendar-days"></i></strong>
        </label>
      </div>
      ${table}
      ${legend}
      <div class="performance-exec-signal performance-detail-signal">
        <div class="signal-main">
          <span>Status Manajemen</span>
          <strong>Kinerja Aman</strong>
          <p>NKO ${smartLabel(score, "plain")} berada di zona hijau. Tidak ada indikator utama yang membutuhkan eskalasi saat ini.</p>
        </div>
        <div class="signal-drivers">
          <span>Pendorong Nilai</span>
          <div><b>22,00</b><strong>Efisiensi Biaya</strong></div>
          <div><b>12,82</b><strong>Kebijakan GA</strong></div>
          <div><b>12,72</b><strong>Transformasi GA</strong></div>
        </div>
        <div class="signal-action">
          <span>Fokus Berikutnya</span>
          <strong>Jaga NKO >= 100</strong>
          <p>Monitor indikator bobot besar dan pastikan evidence capaian siap sampai akhir tahun.</p>
        </div>
      </div>
    </section>
  `;
}

function renderDetailBusiness() {
  const rows = businessExcellenceData
    .map((row) => `
      <tr>
        <td><strong>${row.semester}</strong></td>
        <td>${row.activity}</td>
        <td>${smartLabel(row.target, Number(row.target) <= 1 ? "percent" : "plain")}</td>
        <td>${smartLabel(row.realization, Number(row.realization) <= 1 ? "percent" : "plain")}</td>
        <td><span class="badge done">${row.status || "Tercapai"}</span></td>
        <td>${Number.isFinite(Number(row.realization)) && Number(row.realization || 0) >= Number(row.target || 0) ? "Pertahankan evidence dan kesiapan asesmen" : "Perlu penilaian / percepatan pemenuhan target"}</td>
      </tr>
    `)
    .join("");

  const numericRows = businessExcellenceData.filter((row) => Number.isFinite(Number(row.realization)));
  const avgRealization = numericRows.length
    ? numericRows.reduce((sum, row) => sum + Number(row.realization || 0), 0) / numericRows.length
    : 0;

  return `
    <section class="detail-section">
      <h3>Executive Snapshot</h3>
      <div class="detail-metrics">
        ${makeMetric("Semester Dimonitor", businessExcellenceData.length)}
        ${makeMetric("Rata-rata Realisasi", smartLabel(avgRealization, "plain"), "green")}
        ${makeMetric("Semester Tercapai", businessExcellenceData.filter((row) => String(row.status || "").toLowerCase().includes("tercapai")).length, "green")}
        ${makeMetric("Perlu Follow-up", businessExcellenceData.filter((row) => !Number.isFinite(Number(row.realization)) || Number(row.realization || 0) < Number(row.target || 0)).length, "amber")}
      </div>
    </section>
    <section class="detail-columns">
      <article class="detail-section">
        <h3>Management Signal</h3>
        <ul class="detail-action-list">
          <li><strong>Implementasi Business Excellence berada pada jalur tercapai</strong><span>Realisasi semester utama menunjukkan capaian di atas target.</span></li>
          <li><strong>Evidence tetap perlu dijaga</strong><span>Pastikan dokumen aplikasi, update dokumen, dan asesmen nilai siap untuk kebutuhan review manajemen.</span></li>
        </ul>
      </article>
      <article class="detail-section">
        <h3>Working Actions</h3>
        <ul class="detail-action-list">
          <li><strong>Finalisasi evidence semester 1</strong><span>Kunci dokumen pendukung penyusunan dan updating dokumen aplikasi.</span></li>
          <li><strong>Siapkan asesmen semester 2</strong><span>Monitor pencapaian update dokumen dan nilai skor PLN Bisnis Ekselen.</span></li>
        </ul>
      </article>
    </section>
    <section class="detail-section">
      <h3>Detail Implementasi PLN Business Excellence</h3>
      <div class="detail-table-wrap">
        <table class="detail-table">
          <thead>
            <tr><th>Semester</th><th>Aktivitas</th><th>Target</th><th>Realisasi</th><th>Status</th><th>Action</th></tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    </section>
  `;
}

function getPerformanceStatusSummary() {
  const indicatorRows = performanceMainRows();
  const summary = {
    total: indicatorRows.length,
    green: 0,
    amber: 0,
    red: 0,
    gray: 0
  };

  indicatorRows.forEach((row) => {
    summary[performanceStatusBucket(row)] += 1;
  });

  return summary;
}

function updatePerformanceStatusPanel() {
  const grid = document.getElementById("performanceStatusGrid");
  const message = document.getElementById("performanceStatusMessage");
  const indicatorCard = document.querySelector(".performance-indicator-card");
  const metaIndicator = document.getElementById("performanceMetaIndicator");
  const scoreElement = document.getElementById("performanceScore");
  const mainStatus = document.getElementById("performanceMainStatus");
  if (!grid) return;

  const summary = getPerformanceStatusSummary();
  const score = calculatePerformanceScore();
  const scoreStatus = performanceScoreStatus(score);
  if (scoreElement) scoreElement.textContent = smartLabel(score, "plain");
  if (mainStatus) mainStatus.textContent = scoreStatus.label;
  if (indicatorCard) {
    indicatorCard.innerHTML = `<strong>${summary.total}</strong><span>Indikator</span>`;
  }
  if (metaIndicator) metaIndicator.textContent = `${summary.total} Indikator`;
  if (message) {
    message.textContent = "";
    message.hidden = true;
  }

  grid.innerHTML = `
    <div class="status-green"><strong>${summary.green}</strong><span>Tercapai</span></div>
    <div class="status-amber"><strong>${summary.amber}</strong><span>Hampir Tercapai</span></div>
    <div class="status-red"><strong>${summary.red}</strong><span>Perlu Peningkatan</span></div>
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
      subtitle.hidden = false;
      if (type === "policy") {
        eyebrow.textContent = "Kebijakan & Ratifikasi";
        title.textContent = "Detail Monitoring Ratifikasi Kebijakan";
        subtitle.textContent = "";
        body.innerHTML = renderDetailPolicy();
      } else if (type === "performance") {
        eyebrow.textContent = "Monitoring Kinerja";
        title.textContent = "Detail Monitoring Kinerja Divisi Umum dan Aset Properti";
        subtitle.textContent = "Menampilkan detail NKO s.d. Juni 2026 berdasarkan laporan pencapaian KPI Divisi Umum dan Aset Properti.";
        body.innerHTML = renderDetailPerformance();
      } else if (type === "business") {
        eyebrow.textContent = "Business Excellence";
        title.textContent = "Detail Implementasi PLN Business Excellence";
        subtitle.textContent = "Menampilkan target, realisasi, status capaian, dan tindak lanjut implementasi Business Excellence.";
        body.innerHTML = renderDetailBusiness();
      } else {
        eyebrow.textContent = "Change Request Aplikasi";
        title.textContent = "Detail Monitoring Change Request";
        subtitle.textContent = "Membantu BoD melihat prioritas aplikasi, risiko delivery, dan action working level.";
        body.innerHTML = renderDetailCr();
      }
      subtitle.hidden = !subtitle.textContent.trim();
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
  const text = String(value);
  const isoDate = text.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (isoDate) {
    const [, year, month, day] = isoDate;
    const names = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
    return `${Number(day)} ${names[Number(month) - 1]} ${year}`;
  }
  return text;
}

function normalizeImportKey(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function findSheetName(workbook, expectedName) {
  const expected = normalizeImportKey(expectedName);
  return workbook.SheetNames.find((name) => normalizeImportKey(name) === expected) ||
    workbook.SheetNames.find((name) => normalizeImportKey(name).includes(expected.replace(/^[0-9]+ /, "")));
}

function rowValue(row, ...labels) {
  for (const label of labels) {
    if (Object.prototype.hasOwnProperty.call(row, label)) return row[label];
  }
  const normalizedRow = Object.fromEntries(
    Object.entries(row).map(([key, value]) => [normalizeImportKey(key), value])
  );
  for (const label of labels) {
    const value = normalizedRow[normalizeImportKey(label)];
    if (value !== undefined) return value;
  }
  return "";
}

function numberFromImport(value, fallback = 0) {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  const text = String(value ?? "").trim();
  if (!text) return fallback;
  const numericText = text.replace(/[^0-9,.-]+/g, "");
  const dotCount = (numericText.match(/\./g) || []).length;
  const normalized = numericText.includes(",")
    ? numericText.replace(/\./g, "").replace(",", ".")
    : dotCount > 1 || /\.\d{3}$/.test(numericText)
      ? numericText.replace(/\./g, "")
      : numericText;
  const cleaned = normalized.replace(/[^0-9.-]+/g, "");
  const parsed = Number(cleaned);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function calculatePerformanceScore() {
  if (Number.isFinite(numberFromImport(performanceOfficialScore, NaN))) {
    return numberFromImport(performanceOfficialScore, 106.84);
  }
  const scoredRows = performanceData.filter((row) => Number.isFinite(numberFromImport(row.score, NaN)));
  const scoreSum = scoredRows.reduce((sum, row) => sum + numberFromImport(row.score, 0), 0);
  const weightSum = scoredRows.reduce((sum, row) => sum + numberFromImport(row.weight, 0), 0);
  if (weightSum > 0 && Math.abs(weightSum - 100) > 0.01) return scoreSum * (100 / weightSum);
  return scoreSum;
}

function sheetRows(workbook, sheetName) {
  const resolvedName = findSheetName(workbook, sheetName);
  const sheet = workbook.Sheets[resolvedName];
  if (!sheet) return [];
  return window.XLSX.utils.sheet_to_json(sheet, { defval: "" });
}

function normalizePolicyStatus(status, progress = 0) {
  const value = String(status || "").toLowerCase();
  if (value.includes("tidak")) return "no-ratification";
  if (value.includes("sebagian")) return "on-progress";
  if (value.includes("selesai")) return "done";
  if (
    value.includes("proses") ||
    value.includes("pengesahan") ||
    value.includes("grc") ||
    value.includes("review") ||
    value.includes("legal") ||
    value.includes("endorsement") ||
    value.includes("draft") ||
    value.includes("pembahasan") ||
    value.includes("diskusi") ||
    value.includes("on progres") ||
    value.includes("on progress")
  ) return "on-progress";
  if (Number(progress) >= 100) return "done";
  return "on-progress";
}

function normalizeDashboardStatus(status, progress = 0) {
  const value = String(status || "").toLowerCase();
  if (value.includes("selesai") || Number(progress) >= 100) return "Selesai";
  if (value.includes("belum")) return "Belum Mulai";
  return "On Progress";
}

function isPolicyEntityName(value) {
  const text = String(value || "").trim();
  if (!text) return false;
  return /^PLN\b/i.test(text) || /^PT PLN\b/i.test(text);
}

function canonicalPolicyStatus(status) {
  return POLICY_STATUS_KEYS.has(status) ? status : normalizePolicyStatus(status);
}

function isValidPolicySource(source) {
  const rows = Array.isArray(source?.policyData) ? source.policyData : [];
  const columns = Array.isArray(source?.policyColumns) ? source.policyColumns : Array.isArray(source?.policyTypes) ? source.policyTypes : [];
  if (!rows.length || !columns.length) return false;
  if (rows.length > POLICY_MAX_ENTITY_COUNT || columns.length > POLICY_MAX_TYPE_COUNT) return false;
  return rows.every((row) =>
    row &&
    String(row.entity || "").trim() &&
    Array.isArray(row.statuses) &&
    row.statuses.length === columns.length &&
    row.statuses.every((status) => POLICY_STATUS_KEYS.has(canonicalPolicyStatus(status)))
  );
}

function normalizePolicySource(source) {
  const columns = Array.isArray(source?.policyColumns)
    ? source.policyColumns.map((column) => String(column || "").trim()).filter(Boolean)
    : Array.isArray(source?.policyTypes)
      ? source.policyTypes.map((column) => String(column || "").trim()).filter(Boolean)
      : [];
  const rows = Array.isArray(source?.policyData)
    ? source.policyData
        .map((row) => ({
          entity: String(row?.entity || "").trim(),
          statuses: Array.isArray(row?.statuses)
            ? row.statuses.slice(0, columns.length).map((status) => canonicalPolicyStatus(status))
            : []
        }))
        .filter((row) => row.entity)
    : [];
  const normalized = {
    policyData: rows,
    policyEntities: rows.map((row) => row.entity),
    policyTypes: columns,
    policyColumns: columns
  };
  return isValidPolicySource(normalized) ? normalized : null;
}

function extractPolicyMatrix(workbook) {
  const sheetName = findSheetName(workbook, "Ratifikasi");
  if (!sheetName) return null;
  const matrix = window.XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1, defval: "" });
  const entityRowIndex = matrix.findIndex((row) =>
    row.some((cell) => String(cell || "").trim().toLowerCase().includes("pln ip"))
  );
  if (entityRowIndex === -1) return null;

  const entityRow = matrix[entityRowIndex];
  const entityColumns = entityRow
    .map((cell, index) => ({ entity: String(cell || "").trim(), index }))
    .filter((item) => isPolicyEntityName(item.entity));
  const policyNameColumn = 1;
  const policies = [];
  let category = "";

  matrix.slice(entityRowIndex + 1).forEach((row) => {
    const no = row[0];
    const name = String(row[policyNameColumn] || "").trim();
    if (!name) return;
    if (no === "" || no === null || no === undefined) {
      category = name;
      return;
    }
    if (!Number.isFinite(numberFromImport(no, NaN))) return;
    policies.push({
      name,
      category,
      statuses: entityColumns.map(({ index }) => normalizePolicyStatus(row[index]))
    });
  });

  if (!entityColumns.length || !policies.length) return null;

  return {
    entities: entityColumns.map((item) => item.entity),
    policies
  };
}

function importPolicySheet(workbook) {
  const matrixSource = extractPolicyMatrix(workbook);
  if (matrixSource) {
    if (
      matrixSource.entities.length > POLICY_MAX_ENTITY_COUNT ||
      matrixSource.policies.length > POLICY_MAX_TYPE_COUNT
    ) {
      console.info(`Data matrix ratifikasi diabaikan: ${matrixSource.entities.length} entitas dan ${matrixSource.policies.length} kebijakan terbaca di luar batas aman.`);
      return 0;
    }
    policyEntities = matrixSource.entities;
    policyTypes = matrixSource.policies.map((policy) => policy.name);
    policyColumns = policyTypes;
    policyData = policyEntities.map((entity, entityIndex) => ({
      entity,
      statuses: matrixSource.policies.map((policy) => policy.statuses[entityIndex] || "drafting")
    }));
    return matrixSource.policies.length * matrixSource.entities.length;
  }

  const rows = sheetRows(workbook, "01_Ratifikasi");
  if (!rows.length) return 0;
  const validRows = rows
    .map((row) => ({
      entity: String(rowValue(row, "Entitas SH/AP", "Entitas") || "").trim(),
      type: String(rowValue(row, "Jenis Kebijakan", "Kebijakan") || "").trim(),
      status: rowValue(row, "Status"),
      progress: rowValue(row, "Progress", "Progres")
    }))
    .filter((row) => row.entity && row.type && (String(row.status || "").trim() || String(row.progress || "").trim()));
  const entities = [...new Set(validRows.map((row) => row.entity))];
  const types = [...new Set(validRows.map((row) => row.type))];
  if (!entities.length || !types.length) return 0;
  if (entities.length > POLICY_MAX_ENTITY_COUNT || types.length > POLICY_MAX_TYPE_COUNT) {
    console.info(`Data ratifikasi diabaikan: ${entities.length} entitas dan ${types.length} kebijakan terbaca di luar batas aman.`);
    return 0;
  }

  policyEntities = entities;
  policyTypes = types;
  policyColumns = types;
  policyData = entities.map((entity) => ({
    entity,
    statuses: types.map((type) => {
      const match = validRows.find((row) =>
        row.entity === entity &&
        row.type === type
      );
      return normalizePolicyStatus(match?.status, parseProgress(match?.progress));
    })
  }));
  return entities.length * types.length;
}

function importCrSheet(workbook) {
  const rows = sheetRows(workbook, "02_Change_Request");
  if (!rows.length) return 0;
  crData = rows
    .map((row) => {
      const progress = parseProgress(rowValue(row, "Progress", "Progres"));
      const app = String(rowValue(row, "Aplikasi") || "").trim();
      const request = String(rowValue(row, "Change Request", "CR", "Request") || "").trim();
      if (!app || !request) return null;
      return {
        app,
        request,
        progress,
        status: normalizeDashboardStatus(rowValue(row, "Status"), progress),
        target: excelDate(rowValue(row, "Target Selesai", "Target"))
      };
    })
    .filter(Boolean);
  return crData.length;
}

function importPerformanceSheet(workbook) {
  const rows = sheetRows(workbook, "03_Kinerja");
  if (!rows.length) return 0;
  const importedRows = rows
    .map((row) => ({
      no: rowValue(row, "No"),
      indicator: rowValue(row, "Indikator Kerja"),
      unit: rowValue(row, "Satuan"),
      weight: rowValue(row, "Bobot"),
      target: rowValue(row, "Target 2026"),
      targetPeriod: rowValue(row, "Target S.D. Juni", "Target Bulanan"),
      realization: rowValue(row, "Realisasi", "Realisasi Bulan Current"),
      achievement: rowValue(row, "Pencapaian", "%"),
      score: rowValue(row, "Nilai"),
      status: rowValue(row, "Status", "Ket.") || "Tercapai"
    }))
    .filter((row) => row.indicator);

  const mainIndicatorCount = importedRows.filter((row) => String(row.no || "").trim()).length;
  if (mainIndicatorCount < MIN_PERFORMANCE_MAIN_INDICATORS) {
    console.info(
      `Sheet 03_Kinerja diabaikan karena hanya memuat ${mainIndicatorCount} indikator utama. Minimal ${MIN_PERFORMANCE_MAIN_INDICATORS} indikator diperlukan.`
    );
    return 0;
  }

  performanceData = importedRows;
  return performanceData.length;
}

function importStrategySummarySheet(workbook) {
  const rows = sheetRows(workbook, "09_Ringkasan");
  if (!rows.length) return 0;
  let imported = 0;
  rows.forEach((row) => {
    const indicator = String(rowValue(row, "Indikator", "Parameter", "Metric") || "").toLowerCase();
    const value = rowValue(row, "Rumus/Nilai", "Nilai", "Value");
    if ((indicator.includes("nko") || indicator.includes("nilai kinerja")) && value !== "") {
      performanceOfficialScore = numberFromImport(value, performanceOfficialScore);
      imported += 1;
    }
  });
  return imported;
}

function importPolicyPrepSheet(workbook) {
  const rows = sheetRows(workbook, "04_Penyusunan_Kebijakan");
  if (!rows.length) return 0;
  policyPrepData = rows
    .map((row, index) => ({
      no: rowValue(row, "No") || `${index + 1}.`,
      area: rowValue(row, "Bidang"),
      scope: rowValue(row, "Lingkup"),
      progress: parseProgress(rowValue(row, "Progress", "Progres")),
      status: normalizeDashboardStatus(rowValue(row, "Status"), parseProgress(rowValue(row, "Progress", "Progres"))),
      target: excelDate(rowValue(row, "Target"))
    }))
    .filter((row) => row.area || row.scope);
  return policyPrepData.length;
}

function importBusinessSheet(workbook) {
  const rows = sheetRows(workbook, "05_Business_Excellence");
  if (!rows.length) return 0;
  function businessPercentValue(value) {
    const numeric = numberFromImport(value, NaN);
    if (!Number.isFinite(numeric)) return "";
    return numeric > 0 && numeric <= 2 ? numeric * 100 : numeric;
  }
  businessExcellenceData = rows
    .map((row) => {
      const rawTarget = rowValue(row, "Target");
      const rawRealization = rowValue(row, "Realisasi");
      const rawStatus = rowValue(row, "Status");
      const semesterText = String(rowValue(row, "Semester") || "").trim();
      const activityText = String(rowValue(row, "Aktivitas") || "").trim();
      const realizationText = String(rawRealization ?? "").trim();
      const statusText = String(rawStatus ?? "").trim();
      const parsedTarget = rawTarget === "" ? "" : businessPercentValue(rawTarget);
      const parsedRealization = rawRealization === "" || rawRealization === null || rawRealization === undefined
        ? ""
        : businessPercentValue(rawRealization);
      const isLegacySemesterTwoValue =
        semesterText.toLowerCase().includes("semester 2") &&
        activityText.toLowerCase().includes("asesmen") &&
        Number(parsedTarget) > 100 &&
        Number(parsedRealization) === 100.18;
      const isPendingAssessment =
        isLegacySemesterTwoValue ||
        statusText.toLowerCase().includes("belum") ||
        realizationText.toLowerCase().includes("belum");
      return {
        semester: semesterText,
        activity: activityText,
        target: isPendingAssessment && Number(parsedTarget) > 100 ? 100 : parsedTarget,
        realization: isPendingAssessment
          ? "Belum Dinilai"
          : realizationText && /[a-zA-Z]/.test(realizationText)
          ? realizationText
          : rawRealization === "" || rawRealization === null || rawRealization === undefined
            ? (statusText.toLowerCase().includes("belum") ? "Belum Dinilai" : "")
            : parsedRealization,
        status: isPendingAssessment
          ? (statusText.toLowerCase().includes("belum") ? rawStatus : "Belum Ukur")
          : rawStatus,
        note: rowValue(row, "Catatan")
      };
    })
    .filter((row) => row.semester);
  return businessExcellenceData.length;
}

function importInvestmentSheet(workbook) {
  const rows = sheetRows(workbook, "06_Investasi");
  if (!rows.length) return 0;
  return applyInvestmentRows(rows);
}

function monthIndex(value) {
  const months = [
    "januari",
    "februari",
    "maret",
    "april",
    "mei",
    "juni",
    "juli",
    "agustus",
    "september",
    "oktober",
    "november",
    "desember"
  ];
  const normalized = normalizeImportKey(value);
  const index = months.findIndex((month) => normalized.includes(month));
  return index === -1 ? 0 : index + 1;
}

function sumBy(rows, valueLabels, predicate = () => true) {
  return rows.reduce((total, row) => {
    if (!predicate(row)) return total;
    return total + numberFromImport(rowValue(row, ...valueLabels), 0);
  }, 0);
}

function groupSum(rows, groupLabels, valueLabels, predicate = () => true) {
  const grouped = new Map();
  rows.forEach((row) => {
    if (!predicate(row)) return;
    const group = String(rowValue(row, ...groupLabels) || "").trim();
    if (!group) return;
    grouped.set(group, (grouped.get(group) || 0) + numberFromImport(rowValue(row, ...valueLabels), 0));
  });
  return [...grouped.entries()]
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
}

function parseAoOperationalWorkbook(workbook) {
  const targetRows = sheetRows(workbook, "Target Bulanan").filter((row) => rowValue(row, "Divisi", "Unit"));
  const realizationRows = sheetRows(workbook, "Realisasi Bulanan").filter((row) => rowValue(row, "Divisi", "Unit"));
  const budgetRows = sheetRows(workbook, "Rekap per Divisi").filter((row) => rowValue(row, "Divisi", "Unit"));
  if (!targetRows.length && !realizationRows.length && !budgetRows.length) return null;

  const latestMonthNumber = Math.max(
    1,
    ...targetRows.map((row) => monthIndex(rowValue(row, "Bulan", "Periode"))),
    ...realizationRows.map((row) => monthIndex(rowValue(row, "Bulan", "Periode")))
  );
  const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
  const period = `${monthNames[latestMonthNumber - 1] || "Juni"} 2026`;
  const isToDate = (row) => {
    const current = monthIndex(rowValue(row, "Bulan", "Periode"));
    return current > 0 && current <= latestMonthNumber;
  };

  const realization = sumBy(realizationRows, ["Realisasi", "Nilai", "Value"], isToDate) / 1000000;
  const target = sumBy(targetRows, ["Target", "Nilai", "Value"], isToDate) / 1000000;
  const rkap = sumBy(budgetRows, ["Anggaran Operasi", "RKAP", "Anggaran", "Nilai"], () => true) / 1000000;
  const denominator = rkap || target || realization;
  const absorption = denominator ? Math.round((realization / denominator) * 1000) / 10 : 0;
  const targetRate = target ? Math.round((realization / target) * 1000) / 10 : absorption;
  const projection = Math.max(realization, denominator ? denominator * Math.min(1, absorption / 100 + 0.5) : realization);

  const costGroups = groupSum(realizationRows, ["Unsur Standar", "Unsur"], ["Realisasi", "Nilai", "Value"], isToDate);
  const budgetByCost = groupSum(budgetRows, ["Unsur Standar", "Unsur"], ["Anggaran Operasi", "RKAP", "Anggaran", "Nilai"]);
  const budgetLookup = Object.fromEntries(budgetByCost.map((row) => [row.name, row.value]));
  const topCosts = costGroups.slice(0, 8).map((row) => ({
    name: row.name,
    value: Math.round(row.value / 1000000),
    yoy: 100,
    rkap: budgetLookup[row.name] ? Math.round((row.value / budgetLookup[row.name]) * 100) : 0
  }));

  const unitGroups = groupSum(realizationRows, ["Divisi", "Unit"], ["Realisasi", "Nilai", "Value"], isToDate);
  const topUnits = unitGroups.slice(0, 10).map((row) => ({
    unit: row.name,
    value: Math.round(row.value / 1000000)
  }));
  const selected = topUnits[0];

  return {
    period,
    total: Math.round(realization),
    realization: Math.round(realization),
    selectedUnit: selected?.unit || "",
    rank: selected ? "#1 dari " + Math.max(unitGroups.length, 1) : "",
    rkap: Math.round(rkap),
    absorption,
    targetRate,
    projection: Math.round(projection),
    projectionRate: denominator ? Math.round((projection / denominator) * 100) : 0,
    yoy: 100,
    topCosts,
    topUnits
  };
}

function importKeyValueSheet(workbook, sheetName) {
  const rows = sheetRows(workbook, sheetName);
  const result = {};
  rows.forEach((row) => {
    const key = String(rowValue(row, "Kode", "kode", "Key", "key") || "").trim();
    if (!key) return;
    result[key] = rowValue(row, "Nilai", "nilai", "Value", "value");
  });
  return result;
}

function importAoCorporateSheet(workbook) {
  const source = importKeyValueSheet(workbook, "07_AO_Korporat");
  if (!Object.keys(source).length) return 0;
  Object.assign(aoCorporateData, normalizeAoSource(source, aoCorporateData));
  return Object.keys(source).length;
}

function importAoOfficeSheet(workbook) {
  const source = importKeyValueSheet(workbook, "08_AO_Kantor_Pusat");
  const operationalSource = parseAoOperationalWorkbook(workbook);
  if (!Object.keys(source).length && !operationalSource) return 0;
  aoOfficeData = normalizeAoSource({ ...aoOfficeData, ...(operationalSource || {}), ...source }, aoOfficeData);
  return Object.keys(source).length + (operationalSource ? 1 : 0);
}

function applyStrategyWorkbook(workbook) {
  const imported = {
    ratifikasi: importPolicySheet(workbook),
    changeRequest: importCrSheet(workbook),
    kinerja: importPerformanceSheet(workbook),
    ringkasan: importStrategySummarySheet(workbook),
    penyusunanKebijakan: importPolicyPrepSheet(workbook),
    businessExcellence: importBusinessSheet(workbook),
    investasi: importInvestmentSheet(workbook),
    aoKorporat: importAoCorporateSheet(workbook),
    aoKantorPusat: importAoOfficeSheet(workbook)
  };
  const hasData = Object.values(imported).some((count) => Number(count) > 0);
  return { imported, hasData };
}

function normalizeAoSource(source, fallback = {}) {
  const normalized = { ...source };
  ["total", "realization", "rkap", "absorption", "targetRate", "projection", "projectionRate", "yoy"].forEach((key) => {
    if (normalized[key] !== "" && normalized[key] != null) {
      normalized[key] = numberFromImport(normalized[key], fallback[key] ?? 0);
    }
  });
  if (Array.isArray(normalized.topCosts)) {
    normalized.topCosts = normalized.topCosts
      .map((row) => ({
        name: row.name || row.unsur || row.Unsur || row.biaya || row.Biaya || "",
        value: numberFromImport(row.value ?? row.realisasi ?? row.Realisasi ?? row.nilai ?? row.Nilai, 0),
        yoy: numberFromImport(row.yoy ?? row.YoY ?? row["% YoY"], 0),
        rkap: numberFromImport(row.rkap ?? row.RKAP ?? row["% RKAP"], 0)
      }))
      .filter((row) => row.name);
  }
  if (Array.isArray(normalized.topUnits)) {
    normalized.topUnits = normalized.topUnits
      .map((row) => ({
        unit: row.unit || row.Unit || row.divisi || row.Divisi || "",
        value: numberFromImport(row.value ?? row.realisasi ?? row.Realisasi ?? row.nilai ?? row.Nilai, 0)
      }))
      .filter((row) => row.unit);
  }
  return normalized;
}

function applyStrategyDataSource(source) {
  if (!source || typeof source !== "object") return false;

  const normalizedPolicy = normalizePolicySource(source);
  if (normalizedPolicy) {
    policyData = normalizedPolicy.policyData;
    policyEntities = normalizedPolicy.policyEntities;
    policyTypes = normalizedPolicy.policyTypes;
    policyColumns = normalizedPolicy.policyColumns;
  } else if (Array.isArray(source.policyData) || Array.isArray(source.policyColumns) || Array.isArray(source.policyTypes)) {
    console.info("Data ratifikasi pada data source diabaikan karena struktur tidak valid.");
  }
  if (Array.isArray(source.crData)) crData = source.crData;
  if (Array.isArray(source.changeRequest)) crData = source.changeRequest;
  let performanceSourceIsComplete = true;
  if (Array.isArray(source.performanceData)) {
    const mainIndicatorCount = source.performanceData.filter((row) => String(row?.no || "").trim()).length;
    if (mainIndicatorCount >= MIN_PERFORMANCE_MAIN_INDICATORS) {
      performanceData = source.performanceData;
    } else {
      performanceSourceIsComplete = false;
      console.info("Data kinerja pada data source diabaikan karena indikator utama belum lengkap.");
    }
  }
  if (performanceSourceIsComplete && source.performanceOfficialScore !== undefined) performanceOfficialScore = numberFromImport(source.performanceOfficialScore, performanceOfficialScore);
  if (performanceSourceIsComplete && source.performanceScore !== undefined) performanceOfficialScore = numberFromImport(source.performanceScore, performanceOfficialScore);
  if (performanceSourceIsComplete && source.nko !== undefined) performanceOfficialScore = numberFromImport(source.nko, performanceOfficialScore);
  if (Array.isArray(source.policyPrepData)) policyPrepData = source.policyPrepData;
  if (Array.isArray(source.businessExcellenceData)) businessExcellenceData = source.businessExcellenceData;
  if (source.investmentData && typeof source.investmentData === "object") investmentData = { ...investmentData, ...source.investmentData };
  if (source.investasi && typeof source.investasi === "object") investmentData = { ...investmentData, ...source.investasi };
  if (source.aoCorporateData && typeof source.aoCorporateData === "object") Object.assign(aoCorporateData, normalizeAoSource(source.aoCorporateData, aoCorporateData));
  if (source.aoKorporat && typeof source.aoKorporat === "object") Object.assign(aoCorporateData, normalizeAoSource(source.aoKorporat, aoCorporateData));
  if (source.aoOfficeData && typeof source.aoOfficeData === "object") aoOfficeData = { ...aoOfficeData, ...normalizeAoSource(source.aoOfficeData, aoOfficeData) };
  if (source.aoKantorPusat && typeof source.aoKantorPusat === "object") aoOfficeData = { ...aoOfficeData, ...normalizeAoSource(source.aoKantorPusat, aoOfficeData) };

  return true;
}

function renderStrategyDashboard() {
  renderPolicyRows();
  renderPolicyEntities();
  renderPolicyTypes();
  renderCrRows();
  renderPerformanceRows();
  renderPolicyPrepRows();
  renderBusinessExcellence();
  updatePerformanceStatusPanel();
  updateInvestmentDashboard();
  renderAoCorporate();
  updateDashboardMetrics();
}

async function loadGoogleStrategyDataSource() {
  try {
    strategyGoogleSourceError = "";
    strategyGoogleImported = {};
    if (!(await ensureXlsxLibrary())) return false;
    const response = await fetch(`${STRATEGY_GOOGLE_XLSX_URL}&_=${Date.now()}`, {
      cache: "no-store",
      credentials: "omit"
    });
    if (!response.ok) {
      strategyGoogleSourceError = `Google ${response.status}`;
      console.info(`Google data source tidak dapat dimuat: HTTP ${response.status}`);
      return false;
    }
    const contentType = response.headers.get("content-type") || "";
    if (contentType.includes("text/html")) {
      strategyGoogleSourceError = "Google butuh akses";
      console.info("Google data source mengembalikan halaman HTML. Pastikan file dapat diakses oleh siapa pun yang memiliki link.");
      return false;
    }
    const buffer = await response.arrayBuffer();
    const workbook = window.XLSX.read(buffer, { type: "array", cellDates: false });
    const { imported, hasData } = applyStrategyWorkbook(workbook);
    if (!hasData) {
      strategyGoogleSourceError = "format sheet tidak cocok";
      return false;
    }
    strategyGoogleImported = imported || {};
    const lastModified = response.headers.get("last-modified");
    const sourceTime = new Date();
    setDatabaseUpdatedAt(formatDatabaseTimestamp(sourceTime), true);
    setStrategySourceStatus("Google Sheets (online)", sourceTime);
    saveLocalStrategyDataSource("google-cache");
    return true;
  } catch (error) {
    strategyGoogleImported = {};
    strategyGoogleSourceError = "Google tidak terbaca";
    console.info("Google data source Strategi & Evaluasi tidak dimuat:", error);
    return false;
  }
}

async function loadEmbeddedRatificationDataSource() {
  try {
    const response = await fetch("./assets/data-ratifikasi-kebijakan-ga.json?v=20260814-1", { cache: "no-store" });
    if (!response.ok) return false;
    const source = await response.json();
    if (!Array.isArray(source.policyData) || !Array.isArray(source.policyColumns)) return false;
    policyData = source.policyData;
    policyEntities = Array.isArray(source.policyEntities) ? source.policyEntities : source.policyData.map((row) => row.entity);
    policyTypes = Array.isArray(source.policyTypes) ? source.policyTypes : source.policyColumns;
    policyColumns = source.policyColumns;
    return true;
  } catch (error) {
    console.info("Data Ratifikasi Kebijakan GA tidak dimuat:", error);
    return false;
  }
}

async function loadStrategyDataSource() {
  const googleLoaded = await loadGoogleStrategyDataSource();
  const googleHasRatification = googleLoaded && Number(strategyGoogleImported.ratifikasi || 0) > 0;
  const ratificationLoaded = googleHasRatification ? false : await loadEmbeddedRatificationDataSource();
  if (googleLoaded || ratificationLoaded) {
    if (googleLoaded) {
      saveLocalStrategyDataSource("google-cache");
      setStrategySourceStatus(
        googleHasRatification ? "Google Sheets (online)" : "Google Sheets + Excel Ratifikasi",
        new Date()
      );
    } else if (ratificationLoaded) {
      saveLocalStrategyDataSource("asset-cache");
      setStrategySourceStatus("Excel Ratifikasi", new Date());
    }
    return true;
  }
  if (loadLocalStrategyDataSource({ mode: "import" })) {
    setStrategySourceStatus("File import (lokal)", new Date(), "cadangan browser ini");
    return true;
  }
  if (loadLocalStrategyDataSource()) {
    const mode = localStorage.getItem(STRATEGY_LOCAL_SOURCE_MODE_KEY) || "google-cache";
    const sourceLabel = mode === "google-cache" ? "Cache Google terakhir" : "Data import lokal";
    setStrategySourceStatus(sourceLabel, new Date(), strategyGoogleSourceError);
    return true;
  }
  try {
    const response = await fetch("./assets/data-source-strategi-evaluasi.json?v=20260728-3", { cache: "no-store" });
    if (!response.ok) return false;
    const source = await response.json();
    const applied = applyStrategyDataSource(source);
    if (applied) setStrategySourceStatus("Data bawaan dashboard", new Date(), strategyGoogleSourceError);
    return applied;
  } catch (error) {
    console.info("Data source Strategi & Evaluasi tidak dimuat:", error);
    return false;
  }
}

async function refreshOnlineDashboardData(options = {}) {
  const { force = false, silent = true } = options;
  if (strategyRealtimeInFlight) return false;
  if (!force && Date.now() < strategyManualImportUntil) return false;
  strategyRealtimeInFlight = true;
  try {
    const googleLoaded = await loadGoogleStrategyDataSource();
    if (!googleLoaded) {
      if (!silent) {
        showImportToast(
          "Sinkronisasi online belum berhasil",
          `Dashboard tetap memakai cache terakhir. Detail: ${strategyGoogleSourceError || "sumber online tidak terbaca"}.`
        );
      }
      return false;
    }
    renderStrategyDashboard();
    setStrategySourceStatus("Google Sheets (online)", new Date(), "auto refresh aktif");
    if (!silent) {
      showImportToast(
        "Sinkronisasi online berhasil",
        `Dashboard sudah membaca data terbaru dari Google Sheets. Data per ${formatDatabaseTimestamp()}.`
      );
    }
    return true;
  } finally {
    strategyRealtimeInFlight = false;
  }
}

function startRealtimeDataSync() {
  window.clearInterval(strategyRealtimeTimer);
  strategyRealtimeTimer = window.setInterval(() => {
    if (document.hidden) return;
    refreshOnlineDashboardData({ silent: true });
  }, STRATEGY_REALTIME_REFRESH_MS);
  window.addEventListener("focus", () => {
    refreshOnlineDashboardData({ silent: true });
  });
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) refreshOnlineDashboardData({ silent: true });
  });
}

function normalizeRow(row) {
  const app = rowValue(row, "Aplikasi", "Application", "App");
  const request = rowValue(row, "Change Request", "Request", "CR");
  const progress = rowValue(row, "Progress", "Progres", "Progress Dashboard");
  const status = rowValue(row, "Status", "Status Dashboard");
  const target = rowValue(row, "Target Selesai", "Target");

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
    workbook.Sheets[findSheetName(workbook, "02_Change_Request")] ||
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

function investmentKeyFromLabel(label) {
  const normalized = String(label || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
  const labelMap = Object.fromEntries(
    Object.entries(investmentFieldLabels).map(([key, value]) => [
      String(value).toLowerCase().replace(/[^a-z0-9]+/g, " ").trim(),
      key
    ])
  );
  return investmentData[normalized] != null ? normalized : labelMap[normalized];
}

function applyInvestmentRows(rows) {
  let count = 0;
  rows.forEach((row) => {
    const key = investmentKeyFromLabel(rowValue(row, "Kode", "Key", "Indikator", "Metric"));
    const rawValue = rowValue(row, "Nilai", "Value");
    if (!key || rawValue === "") return;
    investmentData[key] = String(rawValue);
    count += 1;
  });
  if (count) updateInvestmentDashboard();
  return count;
}

function parseInvestmentCsv(text) {
  const workbook = window.XLSX.read(text, { type: "string" });
  const sheetName = workbook.SheetNames[0];
  return window.XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { defval: "" });
}

async function importInvestmentDataFile(file) {
  const extension = file.name.split(".").pop().toLowerCase();
  let count = 0;

  if (["xlsx", "xls"].includes(extension)) {
    if (!(await ensureXlsxLibrary())) return;
    const buffer = await file.arrayBuffer();
    const workbook = window.XLSX.read(buffer, { type: "array", cellDates: false });
    const sheetName =
      findSheetName(workbook, "Data Investasi") ||
      findSheetName(workbook, "06_Investasi") ||
      workbook.SheetNames.find((name) => normalizeImportKey(name).includes("investasi")) ||
      workbook.SheetNames[0];
    const rows = window.XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { defval: "" });
    count = applyInvestmentRows(rows);
  } else if (extension === "csv") {
    if (!(await ensureXlsxLibrary())) return;
    count = applyInvestmentRows(parseInvestmentCsv(await file.text()));
  } else if (extension === "json") {
    const json = JSON.parse(await file.text());
    const source = json.investasi || json.investment || json;
    if (Array.isArray(source)) {
      count = applyInvestmentRows(source);
    } else {
      count = applyInvestmentRows(Object.entries(source).map(([key, value]) => ({ Kode: key, Nilai: value })));
    }
  }

  if (!count) {
    alert("Data Investasi tidak terbaca. Pastikan file memakai kolom Kode, Indikator, dan Nilai dari template data source investasi.");
    return;
  }
  const uploadedAt = markDatabaseUploadedNow();
  strategyManualImportUntil = Date.now() + STRATEGY_IMPORT_GRACE_MS;
  setStrategySourceStatus("File import (lokal)", new Date());
  const saved = saveLocalStrategyDataSource();
  updateInvestmentDashboard();
  updateDashboardMetrics();
  showImportToast(
    "Import data Investasi berhasil",
    `${count} nilai dashboard diperbarui. Data per ${uploadedAt}${saved ? " dan tersimpan untuk refresh berikutnya." : "."}`
  );
}

async function importDataFile(file) {
  const extension = file.name.split(".").pop().toLowerCase();
  let rows = [];
  const imported = {};

  if (["xlsx", "xls"].includes(extension)) {
    if (!(await ensureXlsxLibrary())) return;
    const buffer = await file.arrayBuffer();
    const workbook = window.XLSX.read(buffer, { type: "array", cellDates: false });
    Object.assign(imported, applyStrategyWorkbook(workbook).imported);
    rows = Object.values(imported).some((count) => Number(count) > 0) ? crData : [];
  } else if (extension === "csv") {
    if (!(await ensureXlsxLibrary())) return;
    rows = rowsFromCsv(await file.text());
    if (rows.length) crData = rows;
  } else if (extension === "json") {
    const parsed = JSON.parse(await file.text());
    const isFullDataSource =
      parsed.policyData ||
      parsed.crData ||
      parsed.performanceData ||
      parsed.policyPrepData ||
      parsed.businessExcellenceData ||
      parsed.investmentData ||
      parsed.investasi ||
      parsed.aoCorporateData ||
      parsed.aoKorporat ||
      parsed.aoOfficeData ||
      parsed.aoKantorPusat;
    if (isFullDataSource) {
      applyStrategyDataSource(parsed);
      rows = crData;
      imported.dataSource = true;
    } else {
      rows = rowsFromJson(JSON.stringify(parsed));
      if (rows.length) crData = rows;
    }
  }

  if (!rows.length) {
    alert("Data tidak terbaca. Pastikan file menggunakan template Strategi & Evaluasi atau memiliki kolom Aplikasi, Change Request, Progress/Progres, Status, dan Target Selesai.");
    return;
  }

  refreshStrategyMenuAfterImport();
  const uploadedAt = markDatabaseUploadedNow();
  strategyManualImportUntil = Date.now() + STRATEGY_IMPORT_GRACE_MS;
  setStrategySourceStatus("File import (lokal)", new Date());
  const saved = saveLocalStrategyDataSource();
  const message = [];
  if (imported.dataSource) {
    message.push("Data source Strategi & Evaluasi lengkap dimuat.");
  } else if (Object.keys(imported).length) {
    message.push(`Ratifikasi: ${imported.ratifikasi} baris.`);
    message.push(`Change Request: ${imported.changeRequest} baris.`);
    message.push(`Kinerja: ${imported.kinerja} indikator.`);
    if (imported.ringkasan) message.push(`Nilai NKO: ${smartLabel(performanceOfficialScore, "plain")}.`);
    message.push(`Penyusunan Kebijakan: ${imported.penyusunanKebijakan} baris.`);
    message.push(`Business Excellence: ${imported.businessExcellence} baris.`);
    message.push(`Investasi: ${imported.investasi} nilai.`);
    message.push(`AO Korporat: ${imported.aoKorporat} nilai.`);
    message.push(`AO Kantor Pusat: ${imported.aoKantorPusat} nilai.`);
  } else {
    message.push(`${rows.length} Change Request dimuat.`);
  }
  message.push(`Data per ${uploadedAt}.`);
  if (saved) message.push("Data tersimpan untuk browser ini.");
  message.push("Untuk realtime semua pengguna, update sumber resmi di Google Sheets.");
  showImportToast("Import data Strategi & Evaluasi berhasil", message.join(" "));
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

  menu.addEventListener("click", async (event) => {
    const option = event.target.closest("button[data-export]");
    if (!option) return;
    const format = option.dataset.export;
    closeMenu();
    if (document.querySelector(".dashboard")?.classList.contains("investment-mode")) {
      await exportInvestment(format);
      return;
    }
    if (format === "pdf") exportPdf();
    if (format === "xlsx") await downloadExcel();
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

document.addEventListener("DOMContentLoaded", async () => {
  document.querySelectorAll(".priority-card").forEach((card) => card.remove());
  setDatabaseUpdatedAt(localStorage.getItem("dashboardDatabaseUpdatedAt") || DEFAULT_DATABASE_UPDATED_AT);
  await loadStrategyDataSource();
  renderStrategyDashboard();
  setupInfoPopover("entityTrigger", "entityPopover");
  setupInfoPopover("policyTypeTrigger", "policyTypePopover");
  renderAoCorporate();
  updateInvestmentDashboard();
  setupNavigation();
  setupFilters();
  setupPeriodPicker();
  setupExportMenu();
  setupDetailModal();
  setupImportToast();
  startRealtimeDataSync();
  document.getElementById("importData").addEventListener("click", () => {
    document.getElementById("dataFile").click();
  });
  document.getElementById("dataFile").addEventListener("change", async (event) => {
    const file = event.target.files?.[0];
    if (file) {
      if (document.querySelector(".dashboard")?.classList.contains("investment-mode")) {
        await importInvestmentDataFile(file);
      } else {
        await importDataFile(file);
      }
    }
    event.target.value = "";
  });
  document.getElementById("investmentImportData")?.addEventListener("click", () => {
    document.getElementById("investmentDataFile")?.click();
  });
  document.getElementById("investmentDataFile")?.addEventListener("change", async (event) => {
    const file = event.target.files?.[0];
    if (file) await importInvestmentDataFile(file);
    event.target.value = "";
  });
  document.querySelectorAll("[data-investment-export]").forEach((button) => {
    button.addEventListener("click", async () => exportInvestment(button.dataset.investmentExport));
  });
  document.getElementById("settingsImportStrategy")?.addEventListener("click", () => {
    document.getElementById("dataFile")?.click();
  });
  document.getElementById("settingsExportExcel")?.addEventListener("click", async () => {
    await downloadExcel();
  });
  document.getElementById("settingsImportInvestment")?.addEventListener("click", () => {
    document.getElementById("investmentDataFile")?.click();
  });
  if (window.lucide) {
    window.lucide.createIcons();
  }
});
