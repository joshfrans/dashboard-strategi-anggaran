const policyData = [
  { name: "Holding Policy 2026", pic: "Yosua S.", status: "Selesai", target: "17 Jul 2026", start: 0, width: 5, color: "green" },
  { name: "Ratifikasi ECOP (BFKO)", pic: "Bobby P.", status: "On Progress", target: "20 Jul 2026", start: 0, width: 3.3, color: "amber" },
  { name: "Holding E-Transport", pic: "Mario A.", status: "Terlambat", target: "25 Jul 2026", start: 0, width: 2, color: "red" },
  { name: "Ratifikasi ITEMS", pic: "Freddy P.", status: "On Progress", target: "31 Jul 2026", start: 1.5, width: 2.2, color: "amber" },
  { name: "Holding E-Meeting", pic: "Indra K.", status: "Plan", target: "03 Aug 2026", start: 0, width: 1.6, color: "blue" },
  { name: "Ratifikasi E-COP (BFKO) Phase 2", pic: "Bobby P.", status: "Belum Mulai", target: "08 Aug 2026", start: 0, width: 5, color: "gray" },
  { name: "Holding Digital Workplace", pic: "Mario A.", status: "Belum Mulai", target: "15 Aug 2026", start: 0, width: 5, color: "gray" }
];

const crData = [
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
  target.innerHTML = policyData
    .map((row, index) => {
      const color = {
        green: "var(--green)",
        amber: "var(--amber)",
        red: "var(--red)",
        blue: "var(--blue)",
        gray: "#dfe4ee"
      }[row.color];

      return `
        <tr>
          <td>${index + 1}</td>
          <td><strong>${row.name}</strong></td>
          <td><strong>${row.pic}</strong></td>
          <td><span class="status-label"><b class="dot ${statusDotClass[row.status]}"></b>${row.status}</span></td>
          <td colspan="5">
            <div class="timeline">
              <span style="left:${row.start * 20}%; width:${row.width * 20}%; background:${color}"></span>
            </div>
          </td>
          <td><strong>${row.target}</strong></td>
        </tr>
      `;
    })
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

function downloadCsv() {
  const header = ["No", "Aplikasi", "Change Request", "Progress", "Status", "Target Selesai"];
  const rows = crData.map((row, index) => [
    index + 1,
    row.app,
    row.request,
    `${row.progress}%`,
    row.status,
    row.target
  ]);
  const csv = [header, ...rows]
    .map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(","))
    .join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "dashboard-change-request-aplikasi.csv";
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
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

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".priority-card").forEach((card) => card.remove());
  renderPolicyRows();
  renderCrRows();
  setupFilters();
  document.getElementById("exportCsv").addEventListener("click", downloadCsv);
  if (window.lucide) {
    window.lucide.createIcons();
  }
});
