import sharp from "sharp";
import { mkdirSync, rmSync, existsSync, writeFileSync, statSync } from "node:fs";
const OUT = "public/images/opt-ginkgo-final";
if (existsSync(OUT)) rmSync(OUT,{recursive:true,force:true});
mkdirSync(OUT,{recursive:true});
const src = "public/images/pexels-ginkgo.jpg";
const plan = [
  ["pexels-ginkgo-200w.webp", 200, 62],
  ["pexels-ginkgo-400w.webp", 400, 46],
  ["pexels-ginkgo-600w.webp", 600, 46],
];
for (const [f,w,q] of plan) {
  const buf = await sharp(src).resize({ width: w }).webp({ quality: q, effort: 6 }).toBuffer();
  writeFileSync(OUT+"/"+f, buf);
  console.log(f + ": " + (buf.length/1024).toFixed(1) + "KB (disk: " + (statSync(OUT+"/"+f).size/1024).toFixed(1) + "KB)");
}
