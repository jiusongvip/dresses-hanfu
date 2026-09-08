// 构建后处理：把 /_astro/global.*.css 内联进所有 HTML（消除渲染阻塞请求）
// 用法: node scripts/inline-css.mjs  （在 astro build 之后由 postbuild 调用）
import { readdirSync, readFileSync, writeFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const DIST = "dist";

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap(e =>
    e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)]
  );
}

const htmlFiles = walk(DIST).filter(f => f.endsWith(".html"));
const cssFile = walk(join(DIST, "_astro")).find(f => f.endsWith(".css"));
if (!cssFile) { console.log("no css found in _astro"); process.exit(1); }
const css = readFileSync(cssFile, "utf8");
const cssHref = "/" + relative(DIST, cssFile).replace(/\\/g, "/");
console.log(`css: ${cssHref} (${(statSync(cssFile).size / 1024).toFixed(1)}KB raw)`);

let inlined = 0;
for (const f of htmlFiles) {
  let html = readFileSync(f, "utf8");
  const linkTag = `<link rel="stylesheet" href="${cssHref}">`;
  if (!html.includes(linkTag)) continue;
  html = html.replace(linkTag, `<style>${css}</style>`);
  writeFileSync(f, html);
  inlined++;
}
console.log(`inlined into ${inlined}/${htmlFiles.length} pages`);
