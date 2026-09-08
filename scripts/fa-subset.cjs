const fs = require("fs");
const css = fs.readFileSync("public/vendor/fontawesome/css/fontawesome.min.css","utf8");
const solid = fs.readFileSync("public/vendor/fontawesome/css/solid.min.css","utf8");
const used = ["baby","book-open","brush","camera","cart-shopping","champagne-glasses","circle-question","coins","compass","crown","fan","fire","gem","hand-sparkles","hands","images","landmark","leaf","link","map-location-dot","map-pin","palette","ring","rotate-left","ruler-combined","sack-dollar","scale-balanced","shirt","soap","sun","tshirt","user-large","user-tie","wand-sparkles"];
const tool = ["solid","classic","fw","xs","sm","lg","xl","2xl","beat","bounce","fade","flip","shake","spin","spin-reverse","spin-pulse","stack","stack-1x","stack-2x","inverse","border","pull-start","pull-right","ul","li","beat-fade"];
const rules = css.match(/[^{}]+\{[^{}]*\}/g) || [];
const keep = [];
for (const r of rules) {
  const sel = r.split("{")[0];
  const iconMatch = sel.match(/\.fa-([a-z0-9-]+)/g);
  if (!iconMatch) { keep.push(r); continue; }
  const names = iconMatch.map(s => s.replace(".fa-",""));
  if (names.some(n => used.includes(n) || tool.includes(n))) keep.push(r);
}
// solid.min.css 的 @font-face + 基础变量（去掉 license 注释）
const solidRules = solid.replace(/\/\*[\s\S]*?\*\//g, "").match(/[^{}]+\{[^{}]*\}/g) || [];
const out = solidRules.join("") + keep.join("");
fs.writeFileSync("public/vendor/fontawesome/css/fa-subset.css", out);
console.log("total size:", (out.length/1024).toFixed(1) + "KB (orig 69.9KB + solid)");
console.log("has @font-face:", out.includes("@font-face"));
const missing = used.filter(u => !out.includes(".fa-" + u + ",") && !out.includes(".fa-" + u + "{"));
console.log("missing:", missing.length ? missing : "none");
