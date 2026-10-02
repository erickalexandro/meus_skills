// Gera e valida título + descrição + hashtags de POSTAGEM (Facebook e YouTube) de cada anúncio (R12).
// Uso:  node scripts/post-fields.js entrada.json saida.json
// entrada.json = [{ code: "SS-PG01-ADS_007-V_001",
//                   ctaKeyword: "RECIPE",              // opcional, padrão RECIPE
//                   hookEN: "...", bodyEN: "...",      // só pra detectar o ingrediente da hashtag (opcional se `topic`)
//                   topic: "bakingsoda",               // opcional: bakingsoda | gingertea | lemonwater | cinnamon | kitchenhacks
//                   ytTitle, ytTitlePt, fbTitle, fbTitlePt, hook, hookPt }]   // você escreve título (YT e FB) e a linha de hook, EN + PT
// saida.json   = [{ code, copy: { fbTitleEn/Pt, fbDescEn/Pt, ytTitleEn/Pt, ytDescEn/Pt, fbDescMode, ytDescMode } }]
//                → já no formato do `node scripts/copy-ingest.mjs saida.json` (OPS-organic): o merge só troca estas chaves.
// O script monta CTA, alternância hook+CTA / só CTA e as 3 hashtags; valida tudo.
// Sai com código 1 se algum anúncio violar a regra R12.
const fs = require('fs');

// ---------- regras ----------
const LIM = { ytTitle: 45, ytTitleMax: 60, fbTitle: 60, hook: 90, desc: 320 };

// Hashtags: 3 por post = público da página + ingrediente do vídeo + nicho da página.
const PAGE_TAGS = {
  PG01: { aud: '#womenover50', niche: '#naturalremedies' },
  PG02: { aud: '#womenover40', niche: '#bellybloat' },
  PG03: { aud: '#womenover50', niche: '#guthealth' },
  PG04: { aud: '#womenover40', niche: '#morningroutine' },
  PG05: { aud: '#womenover40', niche: '#momlife' },
};
const TOPIC_TAG = { bakingsoda: '#bakingsoda', gingertea: '#gingertea', lemonwater: '#lemonwater', cinnamon: '#cinnamon', kitchenhacks: '#kitchenhacks' };

// CTA do Facebook: palavra-chave comentada (a DM automática exige o follow). CTA do YouTube: link do perfil.
const CTA_FB = [
  { en: k => `Comment ${k} below and follow me, or I can't reach you.`, pt: k => `Comenta ${k} abaixo e me segue, senão não consigo falar com você.` },
  { en: k => `Want the full recipe? Comment ${k} and follow me.`, pt: k => `Quer a receita completa? Comenta ${k} e me segue.` },
  { en: k => `Comment ${k} and follow me, and I'll send you the recipe.`, pt: k => `Comenta ${k} e me segue, que eu te mando a receita.` },
];
const CTA_YT = [
  { en: 'Full recipe: link on my profile.', pt: 'Receita completa: link no meu perfil.' },
  { en: 'Want the full recipe? Tap my profile and open the link.', pt: 'Quer a receita completa? Toque no meu perfil e abra o link.' },
  { en: 'The full recipe is in the link on my profile.', pt: 'A receita completa está no link do meu perfil.' },
];

// Proibido em título e descrição (política do YouTube/Meta + regra do Erick: simples e direto).
const BANNED = [
  [/\bozempic|wegovy|mounjaro|zepbound|glp-?1\b/i, 'menção a Ozempic/GLP-1'],
  [/\bcures?\b|\bcured\b|\bheals?\b/i, 'promessa de cura'],
  [/\b\d+\s*(lbs?|pounds?|kg|kilos?|inches|days?|weeks?|months?)\b/i, 'número de peso/prazo'],
  [/\bsize\s+\d+\b/i, 'tamanho de roupa como resultado'],
  [/\b(overnight|in one night|in just one night)\b/i, 'prazo de resultado'],
  [/\bburn(s|ing)? (belly )?fat\b|\bmelt(s|ing)?\b/i, 'promessa de queimar/derreter gordura'],
  [/\b(nurse|trainer|doctor|dr\.|rn|md)\b.*\b(i am|i'm|my patients|my clients)\b|\b(i am|i'm) an? (nurse|trainer|doctor)\b|\bmy (patients|clients)\b/i, 'credencial/paciente do avatar'],
  [/slimsoda|slim soda/i, 'nome do produto'],
  [/✅|•|^\s*[-*]\s/m, 'bullet ou fascination (R12 proíbe)'],
];

const adsNum = code => Number((/ADS_(\d{3})/.exec(code) || [])[1] || 0);
const pg = code => (/SS-(PG\d{2})-/.exec(code) || [])[1];

function topicOf(ad) {
  if (ad.topic) return ad.topic;
  const hook = (ad.hookEN || '').toLowerCase();
  const all = `${hook} ${(ad.bodyEN || '').toLowerCase()}`;
  if (/baking soda/.test(hook)) return 'bakingsoda';
  if (/ginger/.test(hook)) return 'gingertea';
  if (/lemon/.test(hook)) return 'lemonwater';
  if (/baking soda/.test(all)) return 'bakingsoda';
  if (/ginger/.test(all)) return 'gingertea';
  if (/cinnamon/.test(all)) return 'cinnamon';
  return 'kitchenhacks';
}

function build(ad) {
  const n = adsNum(ad.code), page = pg(ad.code), t = PAGE_TAGS[page];
  if (!t) throw new Error(`página desconhecida em ${ad.code}`);
  const kw = (ad.ctaKeyword || 'RECIPE').toUpperCase();
  const tags = [t.aud, TOPIC_TAG[topicOf(ad)], t.niche].join(' ');
  const odd = n % 2 === 1;
  // Intercala os dois formatos: ímpar = FB hook + CTA / YT só CTA; par = FB só CTA / YT hook + CTA.
  const modoFB = odd ? 'hook_cta' : 'cta';
  const modoYT = odd ? 'cta' : 'hook_cta';
  const fb = CTA_FB[(n - 1) % 3], yt = CTA_YT[n % 3];
  const mk = (modo, hook, cta) => (modo === 'hook_cta' ? `${hook}\n${cta}` : cta);
  return {
    code: ad.code,
    fbTitleEn: ad.fbTitle, fbTitlePt: ad.fbTitlePt,
    fbDescEn: `${mk(modoFB, ad.hook, fb.en(kw))}\n\n${tags}`,
    fbDescPt: `${mk(modoFB, ad.hookPt, fb.pt(kw))}\n\n${tags}`,
    ytTitleEn: ad.ytTitle, ytTitlePt: ad.ytTitlePt,
    ytDescEn: `${mk(modoYT, ad.hook, yt.en)}\n\n${tags}`,
    ytDescPt: `${mk(modoYT, ad.hookPt, yt.pt)}\n\n${tags}`,
    fbDescMode: modoFB, ytDescMode: modoYT,
  };
}

function validate(out) {
  const e = [];
  const L = (s) => (s || '').length;
  if (!out.fbTitleEn || !out.ytTitleEn) e.push('falta título');
  if (L(out.ytTitleEn) > LIM.ytTitleMax) e.push(`título YT ${L(out.ytTitleEn)} car. (máx ${LIM.ytTitleMax}; ideal ≤ ${LIM.ytTitle}, o feed corta ~40)`);
  if (L(out.fbTitleEn) > LIM.fbTitle) e.push(`título FB ${L(out.fbTitleEn)} car. (máx ${LIM.fbTitle})`);
  if (/#/.test(out.ytTitleEn + out.fbTitleEn)) e.push('hashtag no título (vai só na descrição)');
  if (/\p{Extended_Pictographic}/u.test(out.ytTitleEn)) e.push('emoji no título do YouTube');
  if (/\b[A-Z]{4,}\b/.test(out.ytTitleEn)) e.push('CAIXA ALTA no título do YouTube');
  for (const [k, txt] of [['fbTitleEn', out.fbTitleEn], ['ytTitleEn', out.ytTitleEn], ['fbDescEn', out.fbDescEn], ['ytDescEn', out.ytDescEn]]) {
    for (const [re, why] of BANNED) if (re.test(txt || '')) e.push(`${k}: ${why}`);
  }
  for (const k of ['fbDescEn', 'ytDescEn']) {
    const d = out[k], lines = d.split('\n').filter(Boolean), tagLine = lines[lines.length - 1];
    const tags = tagLine.match(/#\w+/g) || [];
    if (tags.length !== 3 || tagLine.replace(/#\w+|\s/g, '')) e.push(`${k}: a última linha deve ter exatamente 3 hashtags`);
    if (L(d) > LIM.desc) e.push(`${k}: ${L(d)} car. (máx ${LIM.desc}; descrição curta)`);
    if (lines.length > 3) e.push(`${k}: mais de 3 linhas (hook, CTA, hashtags)`);
  }
  if (!/comment [A-Z]+ /i.test(out.fbDescEn) && !/Comment [A-Z]+/.test(out.fbDescEn)) e.push('fbDescEn sem CTA de palavra-chave');
  if (!/profile/i.test(out.ytDescEn)) e.push('ytDescEn sem CTA do link do perfil');
  return e;
}

module.exports = { build, validate, LIM };

if (require.main === module) {
  const [inp, outp] = process.argv.slice(2);
  if (!inp || !outp) { console.error('uso: node post-fields.js entrada.json saida.json'); process.exit(1); }
  const ads = JSON.parse(fs.readFileSync(inp, 'utf8').replace(/^﻿/, ''));
  let falhou = false; const res = [];
  for (const ad of ads) {
    const out = build(ad), err = validate(out);
    if (!ad.hook || !ad.hookPt || !ad.fbTitlePt || !ad.ytTitlePt) err.push('falta PT ou hook');
    if (err.length) falhou = true;
    const { code, ...copy } = out;
    res.push({ code, copy }); // formato do `node scripts/copy-ingest.mjs` do OPS-organic (o merge só troca estas chaves)
    console.log(`${ad.code} · FB ${out.fbDescMode} / YT ${out.ytDescMode} · YT "${out.ytTitleEn}" (${out.ytTitleEn.length}) · ${err.length ? 'ERRO: ' + err.join('; ') : 'OK'}`);
  }
  fs.writeFileSync(outp, JSON.stringify(res, null, 2));
  process.exit(falhou ? 1 : 0);
}
