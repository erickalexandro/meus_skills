// Gera o advertorial como HTML ÚNICO (CSS inline + imagens em base64) a partir de data.js + render.mjs.
// Uso: node build.mjs            -> grava em OUT (env), em CONFIG.meta.out ou em ./dist/advertorial.html
//      OUT="C:/caminho/Entregável V1 - X.html" node build.mjs
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { CONFIG } from "./assets/js/data.js";
import { renderPage } from "./assets/js/render.mjs";

const dir = path.dirname(fileURLToPath(import.meta.url));
const OUT = process.env.OUT || CONFIG.meta.out || path.join(dir, "dist", "advertorial.html");

const css = ["base.css", "layout.css", "components.css"]
  .map((f) => fs.readFileSync(path.join(dir, "assets/css", f), "utf8"))
  .join("\n");

const imgDir = path.join(dir, "assets/img");
const imgs = {};
for (const f of fs.readdirSync(imgDir)) {
  const ext = path.extname(f).slice(1).toLowerCase();
  if (!["webp", "jpg", "jpeg", "png", "gif", "svg"].includes(ext)) continue;
  const mime = ext === "jpg" ? "jpeg" : ext === "svg" ? "svg+xml" : ext;
  imgs[path.basename(f, path.extname(f))] = `data:image/${mime};base64,${fs.readFileSync(path.join(imgDir, f)).toString("base64")}`;
}

// avisa sobre chaves de imagem citadas no data.js que não existem em assets/img
const used = new Set();
JSON.stringify(CONFIG, (k, v) => { if (["k", "seal", "authorImg"].includes(k) && typeof v === "string") used.add(v); return v; });
CONFIG.blocks.forEach((b) => b.t === "testimonials" && b.items.forEach((i) => used.add(i[0])));
const missing = [...used].filter((k) => !imgs[k]);
if (missing.length) console.warn("ATENÇÃO — imagens citadas e não encontradas em assets/img:", missing.join(", "));

const html = renderPage({ cfg: CONFIG, imgs, css });
fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, html, "utf8");

const text = html.split("</style>")[1].replace(/<script[\s\S]*?<\/script>/g, "").replace(/<[^>]*>/g, " ").replace(/&[a-z]+;/g, " ");
const words = text.split(/\s+/).filter((w) => /[a-zA-Z]/.test(w)).length;
const imgCount = (html.match(/<img /g) || []).length;
console.log("OK ->", OUT);
console.log(`tamanho: ${(Buffer.byteLength(html) / 1024 / 1024).toFixed(2)} MB · <img> na página: ${imgCount} · ~${words} palavras · 1 imagem a cada ~${Math.round(words / Math.max(imgCount, 1))} palavras`);
