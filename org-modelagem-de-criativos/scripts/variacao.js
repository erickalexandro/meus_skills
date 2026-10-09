#!/usr/bin/env node
// R13: mede quanto da fala mudou em relação à referência (distância de edição em palavras ÷ palavras da referência).
// Uso: node variacao.js itens.json [--min 20] [--max 30]
// itens.json: [{ "code": "SS-PG01-ADS_025-V_001", "ref": ["frase da referência", ...], "copy": ["frase da copy", ...] }]
// Com --min/--max, sai com código 1 se algum item ficar fora da faixa.
const fs = require('fs');

const words = t => t.toLowerCase().replace(/[^a-z' ]/g, ' ').split(/\s+/).filter(Boolean);

function lev(a, b) {
  const d = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++)
    d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return d[a.length][b.length];
}

function variacao(ref, copy) {
  const rw = words([].concat(ref).join(' ')), cw = words([].concat(copy).join(' '));
  return { refWords: rw.length, copyWords: cw.length, pct: Math.round(100 * lev(rw, cw) / rw.length) };
}

module.exports = { variacao, words, lev };

if (require.main === module) {
  const args = process.argv.slice(2);
  const opt = n => { const i = args.indexOf(n); return i >= 0 ? Number(args[i + 1]) : null; };
  const file = args.find(a => /\.json$/.test(a));
  if (!file) { console.error('Uso: node variacao.js itens.json [--min 20] [--max 30]'); process.exit(2); }
  const min = opt('--min'), max = opt('--max');
  let bad = 0;
  for (const it of JSON.parse(fs.readFileSync(file, 'utf8'))) {
    const v = variacao(it.ref, it.copy);
    const fora = (min !== null && v.pct < min) || (max !== null && v.pct > max);
    if (fora) bad++;
    console.log(`${it.code} · palavras ${v.refWords} → ${v.copyWords} · variação ${v.pct}%${fora ? ` · FORA da faixa ${min ?? 0}-${max ?? 100}%` : ''}`);
  }
  process.exit(bad ? 1 : 0);
}
