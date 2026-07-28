import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const scannedExtensions = new Set([".html", ".js", ".css", ".json", ".txt", ".yml", ".yaml"]);
const ignoredDirectories = new Set([".git", "node_modules"]);

const checks = [
  {
    name: "Private key",
    pattern: /-----BEGIN [A-Z ]*PRIVATE KEY-----/i
  },
  {
    name: "GitHub token",
    pattern: /\bgh[pousr]_[A-Za-z0-9_]{20,}\b/
  },
  {
    name: "AWS access key",
    pattern: /\bAKIA[0-9A-Z]{16}\b/
  },
  {
    name: "Bearer token",
    pattern: /\bBearer\s+[A-Za-z0-9._~+/=-]{24,}\b/i
  },
  {
    name: "Credential assignment",
    pattern: /\b(password|passwd|api[_-]?key|client[_-]?secret|access[_-]?token)\b\s*[:=]\s*["'][^"']{6,}["']/i
  },
  {
    name: "PLN email address",
    pattern: /[A-Z0-9._%+-]+@pln\.co\.id\b/i
  },
  {
    name: "SharePoint internal link",
    pattern: /https?:\/\/ptpln365\.sharepoint\.com\/\S+/i
  },
  {
    name: "Internal IP address",
    pattern: /https?:\/\/(10\.\d{1,3}\.\d{1,3}\.\d{1,3}|172\.(1[6-9]|2\d|3[0-1])\.\d{1,3}\.\d{1,3}|192\.168\.\d{1,3}\.\d{1,3})\b/i
  }
];

async function listFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (ignoredDirectories.has(entry.name)) continue;
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await listFiles(fullPath)));
    } else {
      files.push(fullPath);
    }
  }

  return files;
}

const findings = [];
const files = await listFiles(root);

for (const file of files) {
  const extension = path.extname(file).toLowerCase();
  if (!scannedExtensions.has(extension)) continue;

  const fileStat = await stat(file);
  if (fileStat.size > 2 * 1024 * 1024) continue;

  const relativePath = path.relative(root, file).replaceAll(path.sep, "/");
  const content = await readFile(file, "utf8");

  for (const check of checks) {
    if (check.pattern.test(content)) {
      findings.push(`${relativePath}: ${check.name}`);
    }
  }
}

if (findings.length) {
  console.error("Potential data leak detected:");
  findings.forEach((finding) => console.error(`- ${finding}`));
  process.exit(1);
}

console.log("Data leak scan passed.");
