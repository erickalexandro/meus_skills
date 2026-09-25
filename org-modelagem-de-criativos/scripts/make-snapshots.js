// Grava o snapshot de cada leva (estado atual no Copy App) na pasta de snapshots do vault.
// Uso: node make-snapshots.js <pasta com docs de ads exportados> <pasta de snapshots do vault>
const fs = require('fs');
const [src, dst] = process.argv.slice(2);
const levas = {};
for (const f of fs.readdirSync(src)) {
  const raw = JSON.parse(fs.readFileSync(src + '/' + f, 'utf8'));
  const d = raw.data || raw;
  (levas[d.levaId] = levas[d.levaId] || {})[f.replace('.json', '')] = d;
}
for (const [levaId, ads] of Object.entries(levas)) {
  const snap = { levaId, atualizadoEm: new Date().toISOString().slice(0, 10), ads };
  fs.writeFileSync(`${dst}/${levaId}.json`, JSON.stringify(snap, null, 2));
  console.log(levaId, Object.keys(ads).length, 'anúncios');
}
