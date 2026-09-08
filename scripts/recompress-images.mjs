// 重压 public/images/opt 下的 webp：输出到 opt-new 再整体替换
// 用法: node scripts/recompress-images.mjs [--commit]
import sharp from "sharp";
import { readdirSync, statSync, mkdirSync, copyFileSync, rmSync, existsSync } from "node:fs";
import { join, basename } from "node:path";

const DIR = "public/images/opt";
const OUT = "public/images/opt-new";
const Q_STEPS = [82, 76, 70, 64, 58];
const commit = process.argv.includes("--commit");

if (!existsSync(OUT)) mkdirSync(OUT, { recursive: true });

const files = readdirSync(DIR).filter(f => f.endsWith(".webp"));
let totalBefore = 0, totalAfter = 0;
for (const f of files) {
  const src = join(DIR, f);
  const orig = statSync(src).size;
  const meta = await sharp(src).metadata();
  let bestBuf = null;
  for (const q of Q_STEPS) {
    bestBuf = await sharp(src).webp({ quality: q, effort: 6 }).toBuffer();
    if (bestBuf.length <= orig * 0.85 || q <= 70) break;
  }
  if (bestBuf.length < orig) {
    const dst = join(OUT, f);
    await sharp(bestBuf).toFile(dst); // write buffer to a separate output file
    totalBefore += orig; totalAfter += bestBuf.length;
    console.log(`${f}  ${(orig / 1024).toFixed(0)}KB -> ${(bestBuf.length / 1024).toFixed(0)}KB  (-${((1 - bestBuf.length / orig) * 100).toFixed(0)}%)  [w=${meta.width}]`);
  } else {
    totalBefore += orig; totalAfter += orig;
    console.log(`${f}  unchanged (${(orig / 1024).toFixed(0)}KB)`);
  }
}
console.log(`\nTOTAL: ${(totalBefore / 1024).toFixed(0)}KB -> ${(totalAfter / 1024).toFixed(0)}KB`);

if (commit) {
  // 先删原文件再 rename（Windows 上覆盖 copy 会偶发 UNKNOWN/EBUSY）
  for (const f of readdirSync(OUT)) {
    const dst = join(DIR, f);
    try { rmSync(dst, { force: true }); } catch {}
    copyFileSync(join(OUT, f), dst);
  }
  rmSync(OUT, { recursive: true, force: true });
  console.log("COMMITTED: opt-new -> opt");
}
