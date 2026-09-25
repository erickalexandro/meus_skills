// Valida uma leva antes de subir: regra do editor + espelho de blocos + CTA pela duração
// + encaixe avatar × referência (R10) + nomenclatura por página (R11).
// Uso: node scripts/check-leva.js caminho/copies.json
// copies.json = [{ code: "SS-PG05-ADS_006-V_001", ref: "SW_049" (ou "externo:<link>"), refChars, consc: "alta"|"media"|"baixa", refBlocks,
//                 encaixe: "verde"|"amarelo"|"vermelho",
//                 direcao: { cenario, figurino, ajuste, virada },   // obrigatório em amarelo/vermelho; virada = 1 só (string) ou ""
//                 scenes: [{ b: <bloco da referência>, p: "hook"|"body"|"cta", en, pt }] }]
const fs = require('fs');
const file = process.argv[2];
if (!file) { console.error('uso: node check-leva.js copies.json'); process.exit(1); }
const ads = JSON.parse(fs.readFileSync(file, 'utf8').replace(/^﻿/, ''));
const WPS = 2.9; // ritmo de fala medido nas referências do swipe
let falhou = false;
for (const ad of ads) {
  const en = ad.scenes.map(s => s.en).join(' ');
  const pct = Math.round((en.length - ad.refChars) / ad.refChars * 100);
  const words = ad.scenes.map(s => s.en.split(/\s+/).length);
  const bad = en.match(/[0-9$%&\/\[\]—–]/g);
  const secs = Math.round(en.split(/\s+/).length / WPS);
  const midCta = ad.scenes.some(s => s.p !== 'cta' && /RECIPE/.test(s.en));
  const blocks = [...new Set(ad.scenes.map(s => s.b))];
  const espelho = blocks.length === ad.refBlocks && blocks.every((b, i) => b === i + 1);
  const teto = ad.consc === 'alta' ? 5 : ad.consc === 'media' ? 12 : 20;
  const erros = [];
  if (pct > teto || pct < -5) erros.push(`tamanho ${pct}% (faixa -5% a +${teto}%)`);
  if (ad.scenes.length > 12) erros.push('mais de 12 cenas');
  if (Math.max(...words) > 24) erros.push('cena com mais de 24 palavras');
  if (secs > 96) erros.push('passa de 1 min 36 s');
  if (bad) erros.push('símbolos ' + bad.join(''));
  if (secs <= 50 && midCta) erros.push('CTA no meio em copy de até 50 s (R01)');
  if (secs > 50 && !midCta) erros.push('falta CTA no meio em copy acima de 50 s (R01)');
  if (!espelho) erros.push(`blocos ${blocks.join(',')} não espelham os ${ad.refBlocks} da referência (R02)`);
  const cor = { verde: '🟢', amarelo: '🟡', vermelho: '🔴' }[ad.encaixe];
  const d = ad.direcao || {};
  if (!cor) erros.push('falta encaixe verde|amarelo|vermelho (R10)');
  if (cor && cor !== '🟢' && !(d.cenario && d.figurino && d.ajuste)) erros.push(`encaixe ${cor} sem DIREÇÃO VISUAL completa (cenário, figurino, ajuste) (R10)`);
  if (Array.isArray(d.virada) && d.virada.length > 1) erros.push('mais de uma virada (R10)');
  if (!/^SS-PG\d{2}-ADS_\d{3}-V_\d{3}$/.test(ad.code || '')) erros.push(`código "${ad.code || ''}" fora de SS-PGnn-ADS_YYY-V_ZZZ (R11)`);
  if (!/^(SW_\d{3}|externo:\S+)$/.test(ad.ref || '')) erros.push(`referência "${ad.ref || ''}" não é SW_nnn do app nem externo:<link> (R11)`);
  if (erros.length) falhou = true;
  console.log(`${ad.code || ad.ref} · ${ad.ref} ${cor || '?'}: ${en.length} vs ${ad.refChars} (${pct >= 0 ? '+' : ''}${pct}%) | ${ad.scenes.length} cenas | máx ${Math.max(...words)} pal | ~${secs}s | CTA meio ${midCta ? 'sim' : 'não'} | blocos ${blocks.length}/${ad.refBlocks} | ${erros.length ? 'ERRO: ' + erros.join('; ') : 'OK'}`);
}
process.exit(falhou ? 1 : 0);
