// Compara o snapshot de uma leva (o que o Claude subiu) com o estado atual no Copy App (edições do Erick).
// Uso: node diff-edicoes.js <snapshot.json> <pasta com os docs atuais>
const fs = require('fs');
const [snapPath, liveDir] = process.argv.slice(2);
const snap = JSON.parse(fs.readFileSync(snapPath, 'utf8')).ads;
for (const f of fs.readdirSync(liveDir)) {
  const raw = JSON.parse(fs.readFileSync(liveDir + '/' + f, 'utf8'));
  const live = raw.data || raw;
  const id = f.replace('.json', '');
  const antes = snap[id] || {};
  for (const k of new Set([...Object.keys(antes), ...Object.keys(live)])) {
    if (k === 'updatedAt') continue;
    if (JSON.stringify(antes[k]) !== JSON.stringify(live[k])) {
      console.log(`### ${id} . ${k}\nANTES: ${JSON.stringify(antes[k])}\nAGORA: ${JSON.stringify(live[k])}\n`);
    }
  }
}
