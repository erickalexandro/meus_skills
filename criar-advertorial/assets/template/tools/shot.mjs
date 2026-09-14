// Tira screenshot da página em largura de celular (390px) e fatia em pedaços legíveis pra revisão visual.
// Uso: node tools/shot.mjs "C:/caminho/advertorial.html" [pastaSaida] [larguraCss=390]
// Precisa de Edge/Chrome e ffmpeg. Caminhos via env EDGE e FFMPEG (padrões desta máquina abaixo).
// Por que o iframe: o Edge headless nesta máquina ignora a largura da janela (viewport sai ~1,26x maior e corta a lateral).
import fs from "fs";
import path from "path";
import { execFileSync } from "child_process";

const [, , input, outDir = path.join(path.dirname(input || "."), "_shots"), widthArg = "390"] = process.argv;
if (!input) { console.error("uso: node tools/shot.mjs arquivo.html [pastaSaida] [largura]"); process.exit(1); }
const EDGE = process.env.EDGE || "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const FFMPEG = process.env.FFMPEG || "C:/Users/alexa/OND-organic/_tools/ffmpeg/ffmpeg-master-latest-winarm64-gpl/bin/ffmpeg.exe";
const W = Number(widthArg), H = 40000, SLICE = 2200;

fs.mkdirSync(outDir, { recursive: true });
const page = path.resolve(outDir, "page.html");
fs.copyFileSync(input, page);
const frame = path.resolve(outDir, "frame.html");
fs.writeFileSync(frame, `<!doctype html><meta charset=utf-8><body style="margin:0;background:#888"><iframe src="page.html" style="width:${W}px;height:${H}px;border:0;display:block;background:#fff"></iframe>`);
const full = path.resolve(outDir, "full.png");
execFileSync(EDGE, ["--headless=new", "--disable-gpu", "--hide-scrollbars", `--window-size=${W + 30},${H + 200}`, "--force-device-scale-factor=1", "--virtual-time-budget=12000", `--screenshot=${full}`, "file:///" + frame.split(path.sep).join("/")], { stdio: "ignore" });

// fatia de cima pra baixo e para quando o pedaço é em branco (arquivo pequeno = sem conteúdo)
let n = 0;
for (let i = 0; i * SLICE < H; i++) {
  const out = path.resolve(outDir, `slice_${String(i).padStart(2, "0")}.jpg`);
  execFileSync(FFMPEG, ["-v", "error", "-y", "-i", full, "-frames:v", "1", "-update", "1", "-vf", `crop=${W + 2}:${SLICE}:0:${i * SLICE},scale=440:-2`, out]);
  if (fs.statSync(out).size < 25000) { fs.unlinkSync(out); break; }
  n++;
}
console.log(`${n} fatias em ${outDir} (slice_00.jpg...). Leia só as que precisar conferir. Se a página for maior que ${H}px, aumente H.`);
