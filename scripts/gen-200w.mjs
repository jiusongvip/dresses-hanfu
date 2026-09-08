import sharp from "sharp";
import { readdirSync, statSync } from "node:fs";
import { join } from "node:path";
const DIR = "public/images/opt";
const files = readdirSync(DIR).filter(f => f.endsWith(".webp"));
for (const f of files) {
  if (f.endsWith("-200w.webp")) continue;
  const src = join(DIR, f);
  const meta = await sharp(src).metadata();
  if (meta.width < 500) continue;
  const base = f.replace(/-\d+w\.webp$/, "");
  if (!base) continue;
  const out = join(DIR, base + "-200w.webp");
  try {
    await sharp(src).resize({ width: 200 }).webp({ quality: 70, effort: 6 }).toFile(out);
    console.log(base + "-200w.webp  " + Math.round(statSync(out).size / 1024) + "KB");
  } catch (e) { console.log("SKIP " + f); }
}
