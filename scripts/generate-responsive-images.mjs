import { readdirSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";

const srcDir = join(process.cwd(), "public", "images");
const outDir = join(process.cwd(), "public", "images", "opt");
mkdirSync(outDir, { recursive: true });

const files = readdirSync(srcDir).filter((f) => /\.(jpg|webp|png)$/i.test(f));

let count = 0;
for (const file of files) {
  const base = file.replace(/\.[^.]+$/, "");
  const src = join(srcDir, file);
  for (const width of [400, 600]) {
    const out = join(outDir, `${base}-${width}w.webp`);
    await sharp(src, { failOn: "none" })
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(out);
  }
  count++;
}
console.log(`Generated responsive variants for ${count} images`);