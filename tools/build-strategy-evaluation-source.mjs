import fs from "node:fs/promises";
import path from "node:path";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const repoRoot = process.cwd();
const outputDir = path.join(repoRoot, "outputs", "strategy-evaluation-source");
const assetPath = path.join(repoRoot, "assets", "template-data-source-strategi-evaluasi.xlsx");
const outputPath = path.join(outputDir, "Template_Data_Source_Strategi_Evaluasi_GA.xlsx");
const policySource = JSON.parse(
  await fs.readFile(path.join(repoRoot, "assets", "data-ratifikasi-kebijakan-ga.json"), "utf8")
);

const statusLabel = {
  done: "Selesai",
  "on-progress": "On Progress",
  "no-ratification": "Tidak Ratifikasi"
};

const crRows = [
  ["ESPPD", "CR utama E-SPPD", 60.35, "On Progress", "Multi target"],
  ["ESPPD Manage Service", "Integrasi manage service", 36.43, "On Progress", "2026-06-30"],
  ["ESPPD Reengineering", "Persiapan infrastruktur & migrasi", 0, "Belum Mulai", "Belum tersedia"],
  ["ESPPD SHAP", "Pilot PLN EPI / SHAP", 93.18, "On Progress", "Sosialisasi"],
  ["NEW E-COP", "Tahap I selesai, Tahap II 42,5%", 71.25, "On Progress", "Tahap II"],
  ["E-COP PLN EPI", "Migrasi, approval, pemesanan kendaraan", 51.82, "On Progress", "2026-07-08"],
  ["NEW E-MEETING PLN Click", "Integrasi E-Meeting dengan PLN Click", 100, "Selesai", "2026-05-23"],
  ["E-MEETING Konsumsi Online", "Role, SIT, UAT, deploy", 100, "Selesai", "2026-05-05"],
  ["E-TRANSPORT Multitrip", "Tahap I selesai, Tahap II belum berjalan", 50, "On Progress", "2026-05-25"]
];

const performanceRows = [
  [1, "Efisiensi Biaya", "", 20, "", "", "", "", 22, "Tercapai"],
  ["", "a. Efektifitas Biaya Administrasi Umum", "Rp Miliar", 14, "8.856,16", "4.740,294", "3.284,569", "110,00%", "15,40", "Tercapai"],
  ["", "b. Pengendalian NAC (Non Allowable Cost)", "Rp Miliar", 6, "Sesuai SKAO Tahun 2026", "451.040551784", "292.145057590", "110,00%", "6,60", "Tercapai"],
  [2, "Optimalisasi penggunaan aset tanah dan bangunan", "Rp Miliar", 12, "147,74", "59.83358626", "85.48141199", "110,00%", "13,20", "Tercapai"],
  [3, "Penyediaan Dokumen Pengadaan Barang Jasa Kantor Pusat sampai dengan selesainya draft kontrak", "", 12, "", "", "", "", "13,02", "Tercapai"],
  ["", "a. Pengadaan Langsung / Penunjukan Langsung Pasca Kualifikasi", "%", "", "93,96", "93.96", "100.00", "106,43%", "3,19", "Tercapai"],
  ["", "b. Penunjukan Langsung Prakualifikasi", "%", "", "85,19", "85,19", "100", "110,00%", "3,30", "Tercapai"],
  ["", "c. Tender Terbuka / Tender Terbatas / Seleksi Umum / Seleksi Terbatas", "%", "", "92,86", "92,85714286", "100,00000000", "107,69%", "", "Tercapai"],
  ["", "d. Seleksi Umum / Seleksi Terbatas / Tender Terbuka Prakualifikasi", "%", "", "83,33", "83,33333333", "100", "110,00%", "", "Tercapai"],
  [4, "Integrated GA Management System", "", 12, "", "", "", "", "12,72", "Tercapai"],
  ["", "a. Optimalisasi penyerapan anggaran pemeliharaan sarana terkonsolidasi", "%", "", "95-100", "95-100", "98,87", "107,74%", "", "Tercapai"],
  ["", "b. Pengembangan Aplikasi Transformasi GA", "Waktu", "", "31 Desember 2026", "30 Juni 2026", "E-Meeting: 103,71%; DigiSign: 105%; rata-rata 104,36%", "104,36%", "", "Tercapai"],
  [5, "Penyusunan Kebijakan General Affair", "Waktu", 12, "31 Desember 2026", "30 Juni 2026", "Nodin Kebijakan Layanan GA: 103,86%; Aset: 106,86%; Arsip: 110,00%", "106,90%", "12,82", "Tercapai"],
  [6, "Proses Sentralisasi Pembayaran", "%", 10, "93,92", "93,92", "94", "100,09%", "10,00", "Tercapai"],
  [7, "Manajemen Kearsipan", "%", 10, "95", "95", "105,61", "110,00%", "11,00", "Tercapai"],
  [8, "Implementasi smart and green building", "SM 1: Waktu; SM 2: Unit", 6, "7", "31 Mei 2026", "21 Mei 2026", "101,43%", "6,08", "Tercapai"],
  [9, "Usulan Anggaran Investasi Non Infrastruktur Ketenagalistrikan-Sarana Prasarana Umum untuk Tahun 2026", "%", 6, "100", "100", "100", "100,00%", "6,00", "Tercapai"],
  [10, "Kepatuhan, Maturity Level dan Tata Kelola Perusahaan", "", "", "", "", "", "", "0,00", "Tercapai"]
];

const policyPrepRows = [
  [1, "Fasilitas", "Petunjuk Teknis Fasilitas Komunikasi", 81, "On Progress", "2026-07-31"],
  [2, "Fasilitas", "Petunjuk Teknis BFKO", 81, "On Progress", "2026-07-31"],
  [3, "ATK", "Petunjuk Teknis Pengelolaan ATK", 10, "On Progress", "2026-10-31"]
];

const businessRows = [
  ["Semester 1", "Penyusunan dan updating dokumen aplikasi", 100, 100.18, "Tercapai", "Realisasi di atas target"],
  ["Semester 2", "Pencapaian update dokumen dan asesmen nilai skor PLN Bisnis Ekselen", 100, "Belum Dinilai", "Belum Ukur", "On Progress"]
];

const investmentRows = [
  ["reportDate", "Periode Laporan", "Report ANG Investasi - 16 Juli 2026"],
  ["executiveSignal", "Executive Signal", "AKI terserap 30,43% dari anggaran kas investasi. Fokus utama: evaluasi realisasi Juli, BAPP, rekomposisi AKI, dan percepatan handshake AI 2027."],
  ["totalInvestment", "Total Anggaran Investasi 2026", "10,89 T"],
  ["totalInvestmentNote", "Catatan Total Anggaran Investasi", "KP 10,64 T + Sarpras Unit 255,31 M"],
  ["aiRealization", "Realisasi AI s.d. Juni", "344,27 M"],
  ["aiRealizationNote", "Catatan Realisasi AI", "3,16% dari total AI terbit"],
  ["aiRealizationPct", "Persentase Realisasi AI", "3,16%"],
  ["akiTotal", "Total AKI 2026", "1,35 T"],
  ["akiTotalNote", "Catatan Total AKI", "KP 1,18 T + Sarpras Unit 178,66 M"],
  ["akiRealization", "Realisasi AKI s.d. Juni", "412,23 M"],
  ["akiRealizationNote", "Catatan Realisasi AKI", "30,43% dari total AKI"],
  ["akiRealizationPct", "Persentase Realisasi AKI", "30,43%"],
  ["akiGaugeNote", "Narasi Gauge AKI", "412,23 M dari total AKI 1.354,51 M sudah terealisasi."],
  ["akiRealizationChip", "Chip Realisasi AKI", "Realisasi 412,23 M"],
  ["akiGapChip", "Chip Sisa AKI", "Sisa 942,28 M"],
  ["akiOfficePct", "Persentase AKI Kantor Pusat", "29,02%"],
  ["akiOfficeNote", "Catatan AKI Kantor Pusat", "341,29 M dari 1.175,85 M"],
  ["akiSarprasPct", "Persentase AKI Sarpras Unit", "39,71%"],
  ["akiSarprasNote", "Catatan AKI Sarpras Unit", "70,94 M dari 178,66 M"],
  ["akiGapPct", "Persentase Gap AKI", "69,57%"],
  ["akiGapNote", "Catatan Gap AKI", "Perlu BAPP & rekomposisi"],
  ["akiInsight", "Insight AKI", "Serapan AKI masih 30,43%. Kantor Pusat menjadi porsi terbesar, sedangkan Sarpras Unit relatif lebih cepat menyerap."]
];

const aoCorporateRows = [
  ["period", "Periode", "Mei 2026"],
  ["total", "Realisasi s.d. Mei 2026", 2931185],
  ["rkap", "RKAP 2026", 8856162],
  ["absorption", "Penyerapan thd RKAP 2026", 33],
  ["targetRate", "Realisasi vs Target s.d. Mei", 82],
  ["projection", "Proyeksi Setahun 2026", 7724829],
  ["projectionRate", "Proyeksi % RKAP", 87],
  ["yoy", "% YoY", 113]
];

const aoOfficeRows = [
  ["period", "Periode", "Juni 2026"],
  ["selectedUnit", "Pilih/Cari Unit", "KPST"],
  ["realization", "Realisasi s.d. Juni 2026", 1389043],
  ["rank", "Peringkat di Holding", "#1 dari 39"],
  ["rkap", "RKAP 2026 (AO)", 3647914],
  ["absorption", "Penyerapan thd RKAP 2026", 38],
  ["yoy", "% YoY", 129]
];

const summaryRows = [
  ["Nilai NKO", 106.84, "Wajib 106,84 sesuai laporan NKO DIV GA Juni 2026"],
  ["Total Bobot Kinerja", 100, "Total bobot indikator utama"],
  ["Periode Kinerja", "S.D. Juni 2026", "Ditampilkan pada panel Monitoring Kinerja"],
  ["Status Kinerja", "Tercapai", "NKO >= 100"],
  ["Total Entitas SH/AP", policySource.policyEntities.length, "Dihitung dari sheet ratifikasi"],
  ["Total Kebijakan GA", policySource.policyTypes.length, "Harus 14 kebijakan"],
  ["Total Change Request", crRows.length, "Dihitung dari sheet Change Request"]
];

const workbook = Workbook.create();

function colName(index) {
  let n = index + 1;
  let name = "";
  while (n > 0) {
    const rem = (n - 1) % 26;
    name = String.fromCharCode(65 + rem) + name;
    n = Math.floor((n - 1) / 26);
  }
  return name;
}

function applyHeader(sheet, range) {
  range.format = {
    fill: "#002060",
    font: { bold: true, color: "#FFFFFF" },
    wrapText: true
  };
}

function addSheet(name, headers, rows, widths = []) {
  const sheet = workbook.worksheets.add(name);
  sheet.showGridLines = false;
  const allRows = [headers, ...rows];
  const endCol = colName(headers.length - 1);
  sheet.getRange(`A1:${endCol}${allRows.length}`).values = allRows;
  applyHeader(sheet, sheet.getRange(`A1:${endCol}1`));
  sheet.getRange(`A1:${endCol}${allRows.length}`).format.borders = {
    preset: "all",
    style: "thin",
    color: "#D9E2F3"
  };
  sheet.freezePanes.freezeRows(1);
  sheet.tables.add(`A1:${endCol}${allRows.length}`, true, `${name.replace(/[^A-Za-z0-9]/g, "")}Table`);
  headers.forEach((_, index) => {
    const width = widths[index] || 18;
    sheet.getRange(`${colName(index)}1:${colName(index)}${allRows.length}`).format.columnWidth = width;
  });
  sheet.getRange(`A1:${endCol}${allRows.length}`).format.wrapText = true;
  return sheet;
}

const guide = workbook.worksheets.add("00_Panduan");
guide.showGridLines = false;
guide.getRange("A1:F1").merge();
guide.getRange("A1").values = [["Template Data Source - Strategi & Evaluasi"]];
guide.getRange("A1").format = { fill: "#002060", font: { bold: true, color: "#FFFFFF", size: 16 } };
guide.getRange("A3:F13").values = [
  ["Sheet", "Fungsi", "Catatan Pengisian", "Wajib?", "Dibaca Dashboard?", "Kontrol Error"],
  ["01_Ratifikasi", "Data 10 Entitas SH/AP x 14 Kebijakan GA", "Status hanya: Selesai, On Progress, Tidak Ratifikasi", "Ya", "Ya", "Maks. 30 entitas dan 30 kebijakan"],
  ["02_Change_Request", "Timeline Change Request Aplikasi", "Progress diisi 0-100, status mengikuti kondisi CR", "Ya", "Ya", "Aplikasi dan Change Request tidak boleh kosong"],
  ["03_Kinerja", "Detail NKO/KPI", "Minimal 10 indikator utama dengan kolom No terisi", "Ya", "Ya", "Kurang dari 10 indikator utama akan diabaikan"],
  ["04_Penyusunan_Kebijakan", "Monitoring kebijakan layanan GA", "Progress 0-100, target format yyyy-mm-dd", "Ya", "Ya", "Bidang atau lingkup harus terisi"],
  ["05_Business_Excellence", "Implementasi PLN Business Excellence", "Realisasi boleh angka atau teks Belum Dinilai", "Ya", "Ya", "Tidak mengubah NKO"],
  ["06_Investasi", "Parameter menu Investasi", "Jangan ubah Kode, edit hanya kolom Nilai", "Opsional", "Ya", "Kode harus tetap"],
  ["07_AO_Korporat", "Parameter AO Korporat", "Jangan ubah Kode, edit hanya kolom Nilai", "Opsional", "Ya", "Kode harus tetap"],
  ["08_AO_Kantor_Pusat", "Parameter AO Kantor Pusat", "Jangan ubah Kode, edit hanya kolom Nilai", "Opsional", "Ya", "Kode harus tetap"],
  ["09_Ringkasan", "Parameter ringkasan/NKO", "Nilai NKO wajib 106,84 bila mengikuti PDF Juni 2026", "Ya", "Ya", "Dipakai untuk mengunci NKO"],
  ["Cara update", "Edit data di file ini / Google Sheets", "Import ke dashboard atau hubungkan link Google Drive yang sama", "Ya", "Ya", "Refresh akan mengikuti data valid terakhir"]
];
applyHeader(guide, guide.getRange("A3:F3"));
guide.getRange("A3:F13").format.borders = { preset: "all", style: "thin", color: "#D9E2F3" };
guide.getRange("A1:F13").format.wrapText = true;
["A", "B", "C", "D", "E", "F"].forEach((col, index) => {
  guide.getRange(`${col}1:${col}13`).format.columnWidth = [26, 34, 52, 13, 18, 34][index];
});

addSheet(
  "00_Referensi",
  ["Kategori", "Nilai", "Keterangan"],
  [
    ["Status Ratifikasi", "Selesai", "Akan dibaca sebagai status hijau"],
    ["Status Ratifikasi", "On Progress", "Akan dibaca sebagai status kuning"],
    ["Status Ratifikasi", "Tidak Ratifikasi", "Akan dibaca sebagai status tidak ratifikasi"],
    ["Status CR", "Selesai", "Progress 100"],
    ["Status CR", "On Progress", "Progress 1-99"],
    ["Status CR", "Belum Mulai", "Progress 0"],
    ["Status Kinerja", "Tercapai", "NKO >= 100"],
    ["Status Kinerja", "Hampir Tercapai", "95 <= NKO < 100"],
    ["Status Kinerja", "Perlu Peningkatan", "NKO < 95"],
    ["Status Kinerja", "Belum dilakukan pengukuran", "Belum ada nilai pengukuran"]
  ],
  [24, 26, 48]
);

const ratificationRows = [];
policySource.policyData.forEach((entityRow) => {
  policySource.policyTypes.forEach((policy, index) => {
    const status = entityRow.statuses[index] || "on-progress";
    ratificationRows.push([
      entityRow.entity,
      policy,
      statusLabel[status] || "On Progress",
      status === "done" ? 100 : status === "no-ratification" ? 0 : 50,
      ""
    ]);
  });
});
const ratificationSheet = addSheet(
  "01_Ratifikasi",
  ["Entitas SH/AP", "Jenis Kebijakan", "Status", "Progress", "Catatan"],
  ratificationRows,
  [18, 72, 18, 12, 30]
);
ratificationSheet.getRange(`C2:C${ratificationRows.length + 1}`).dataValidation = {
  rule: { type: "list", values: ["Selesai", "On Progress", "Tidak Ratifikasi"] }
};

const crSheet = addSheet(
  "02_Change_Request",
  ["Aplikasi", "Change Request", "Progress", "Status", "Target Selesai"],
  crRows,
  [26, 44, 14, 18, 18]
);
crSheet.getRange("D2:D200").dataValidation = { rule: { type: "list", values: ["Selesai", "On Progress", "Belum Mulai"] } };

const kinerjaSheet = addSheet(
  "03_Kinerja",
  ["No", "Indikator Kerja", "Satuan", "Bobot", "Target 2026", "Target S.D. Juni", "Realisasi", "Pencapaian", "Nilai", "Status"],
  performanceRows,
  [8, 62, 18, 10, 24, 24, 44, 16, 14, 18]
);
kinerjaSheet.getRange("J2:J200").dataValidation = {
  rule: { type: "list", values: ["Tercapai", "Hampir Tercapai", "Perlu Peningkatan", "Belum dilakukan pengukuran"] }
};

addSheet(
  "04_Penyusunan_Kebijakan",
  ["No", "Bidang", "Lingkup", "Progress", "Status", "Target"],
  policyPrepRows,
  [8, 18, 52, 12, 18, 18]
).getRange("E2:E200").dataValidation = { rule: { type: "list", values: ["Selesai", "On Progress", "Belum Mulai"] } };

addSheet(
  "05_Business_Excellence",
  ["Semester", "Aktivitas", "Target", "Realisasi", "Status", "Catatan", "Last Update"],
  businessRows.map((row) => [...row, "2026-07-15"]),
  [18, 62, 14, 18, 18, 34, 18]
);

addSheet("06_Investasi", ["Kode", "Indikator", "Nilai"], investmentRows, [26, 44, 72]);
addSheet("07_AO_Korporat", ["Kode", "Indikator", "Nilai"], aoCorporateRows, [26, 44, 28]);
addSheet("08_AO_Kantor_Pusat", ["Kode", "Indikator", "Nilai"], aoOfficeRows, [26, 44, 28]);
addSheet("09_Ringkasan", ["Indikator", "Nilai", "Catatan"], summaryRows, [32, 24, 58]);

const inspect = await workbook.inspect({
  kind: "sheet,table",
  maxChars: 6000,
  tableMaxRows: 4,
  tableMaxCols: 6
});
console.log(inspect.ndjson);

const errors = await workbook.inspect({
  kind: "match",
  searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A",
  options: { useRegex: true, maxResults: 200 },
  summary: "formula error scan"
});
console.log(errors.ndjson);

await fs.mkdir(outputDir, { recursive: true });
for (const name of [
  "00_Panduan",
  "01_Ratifikasi",
  "03_Kinerja",
  "05_Business_Excellence",
  "09_Ringkasan"
]) {
  const preview = await workbook.render({ sheetName: name, autoCrop: "all", scale: 1, format: "png" });
  await fs.writeFile(path.join(outputDir, `${name}.png`), new Uint8Array(await preview.arrayBuffer()));
}

const output = await SpreadsheetFile.exportXlsx(workbook);
await output.save(outputPath);
await output.save(assetPath);
console.log(JSON.stringify({ outputPath, assetPath }));
