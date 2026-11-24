import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "I bought a cat flap so my cat could come and go as she pleases. She now uses it to bring in other cats to show them the house.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  console.error("MAKEFUN_OUTPUT_DIR is not set");
  process.exit(1);
}

if (LINE.length < 1 || LINE.length > 200) {
  console.error(`line must be 1-200 characters, got ${LINE.length}`);
  process.exit(1);
}
if (LINE.trim().length === 0 || LINE.includes("\n")) {
  console.error("line must be a single non-blank line");
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
const back = readFileSync(join(outDir, "entry.txt"), "utf8");
if (back !== LINE) {
  console.error("read-back mismatch: entry.txt does not match the line");
  process.exit(1);
}
