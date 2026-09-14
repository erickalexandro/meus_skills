// Converte imagens novas (png/jpg/webp de qualquer tamanho) de assets/img/_novas para webp otimizado em assets/img.
// Horizontais: largura 760px · quadradas: 700px. Uso: node tools/prep-img.mjs
import fs from "fs"; import path from "path"; import { execFileSync } from "child_process";
const FF = process.env.FFMPEG || "C:/Users/alexa/OND-organic/_tools/ffmpeg/ffmpeg-master-latest-winarm64-gpl/bin/ffmpeg.exe";
const src = path.resolve("assets/img/_novas"), dst = path.resolve("assets/img");
for (const f of fs.readdirSync(src)) {
  if (!/\.(png|jpe?g|webp)$/i.test(f)) continue;
  const out = path.join(dst, f.replace(/\.[^.]+$/, ".webp"));
  execFileSync(FF, ["-v", "error", "-y", "-i", path.join(src, f), "-frames:v", "1", "-update", "1", "-vf", "scale='if(gte(iw,ih*1.2),min(760,iw),min(700,iw))':-2", "-q:v", "80", out]);
  console.log("ok", path.basename(out), Math.round(fs.statSync(out).size / 1024) + "KB");
}
