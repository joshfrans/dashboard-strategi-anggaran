import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";

const manifestUrl = new URL("./vendor-integrity.json", import.meta.url);
const rootUrl = new URL("../", import.meta.url);
const manifest = JSON.parse(await readFile(manifestUrl, "utf8"));
const failures = [];

for (const [relativePath, expected] of Object.entries(manifest)) {
  try {
    const contents = await readFile(new URL(relativePath, rootUrl));
    // Git may check text assets out with CRLF on Windows and LF in CI.
    // Normalize line endings so the integrity value describes file contents,
    // not the operating system used to run the scan.
    const normalizedContents = Buffer.from(contents.toString("utf8").replace(/\r\n/g, "\n"));
    const actual = createHash("sha256").update(normalizedContents).digest("hex");
    if (actual !== expected) failures.push(`${relativePath}: checksum berubah`);
  } catch (error) {
    failures.push(`${relativePath}: ${error.code || error.message}`);
  }
}

if (failures.length) {
  console.error(`Vendor integrity scan failed:\n- ${failures.join("\n- ")}`);
  process.exit(1);
}

console.log(`Vendor integrity scan passed (${Object.keys(manifest).length} aset).`);
