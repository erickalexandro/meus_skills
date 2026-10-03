// Gera e valida título + descrição + hashtags de POSTAGEM (Facebook e YouTube) de cada anúncio (R12).
// Base: estudo "Títulos, descrições e hashtags validados (Facebook e YouTube)", vault › Projects & context/OND-organic/Copy (03/10/2026).
// Uso:  node scripts/post-fields.js entrada.json saida.json
// entrada.json = [{ code: "SS-PG01-ADS_007-V_001",
//                   ctaKeyword: "RECIPE",              // opcional, padrão RECIPE
//                   hookEN: "...", bodyEN: "...",      // só pra detectar o ingrediente da hashtag (opcional se `topic`)
//                   topic: "bakingsoda",               // opcional: bakingsoda | gingertea | lemonwater | cinnamon | kitchenhacks
//                   ytTitle, ytTitlePt, fbTitle, fbTitlePt, hook, hookPt }]   // você escreve os 6 textos curtos: título YT, título FB e a linha de hook, EN + PT
// saida.json   = [{ code, copy: { fbTitleEn/Pt, fbDescEn/Pt, ytTitleEn/Pt, ytDescEn/Pt, fbDescMode, ytDescMode } }]
//                → já no formato do `node scripts/copy-ingest.mjs saida.json` (OPS-organic): o merge só troca estas chaves.
// O script monta CTA, alternância hook+CTA / só CTA e as 3 hashtags; valida tudo.
// ERRO (sai com código 1) = viola a R12. AVISO = passa, mas vale revisar (ex.: título do YouTube acima do ideal de 45).
// O primary text (R04) foi aposentado: entrada que ainda traz `primaryEn`/`primaryTextEN` é recusada.
const fs = require('fs');

// ---------- regras ----------
const LIM = { ytTitle: 45, ytTitleMax: 60, fbTitle: 60, hook: 90, desc: 320, fbFold: 125 };

// Hashtags: exatamente 3 por post = público da página + ingrediente do vídeo + nicho da página.
const PAGE_TAGS = {
  PG01: { aud: '#womenover50', niche: '#naturalremedies' },
  PG02: { aud: '#womenover40', niche: '#bellybloat' },
  PG03: { aud: '#womenover50', niche: '#guthealth' },
  PG04: { aud: '#womenover40', niche: '#morningroutine' },
  PG05: { aud: '#womenover40', niche: '#momlife' },
};
const TOPIC_TAG = { bakingsoda: '#bakingsoda', gingertea: '#gingertea', lemonwater: '#lemonwater', cinnamon: '#cinnamon', kitchenhacks: '#kitchenhacks' };
// Hashtags que nunca entram (redundante, política de fármacos, ou saturada e que atrai bot).
const TAG_BLACKLIST = ['#shorts', '#ozempic', '#wegovy', '#mounjaro', '#zepbound', '#glp1', '#weightloss', '#loseweight', '#diet'];

// CTA do Facebook: palavra-chave comentada (a DM automática exige o follow). CTA do YouTube: link do perfil.
// 3 versões por rede, em rodízio, pra a legenda não sair idêntica em todo vídeo.
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

// Proibido em título e descrição (seção 6 do estudo). A legenda é a parte que os classificadores leem inteira.
const NUM = '(?:\\d+|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|sixteen|seventeen|eighteen|nineteen|twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety|hundred)';
const NUMS = `${NUM}(?:[ -]${NUM})?`;
const BANNED = [
  [/\b(ozempic|wegovy|mounjaro|zepbound|glp-?1)\b/i, 'menção a Ozempic/GLP-1'],
  [/\bcures?\b|\bcured\b|\bheals?\b|\bhealed\b|\breverses?\b/i, 'promessa de cura'],
  [new RegExp(`\\b${NUMS}\\s*(lbs?|pounds?|kg|kilos?|inch(es)?|sizes?)\\b`, 'i'), 'número de peso ou medida como resultado'],
  [new RegExp(`\\b${NUMS}\\s*(hours?|days?|weeks?|months?)\\b`, 'i'), 'prazo de resultado'],
  [new RegExp(`\\bsize\\s+${NUM}\\b`, 'i'), 'tamanho de roupa como resultado'],
  [/\b(overnight|in (just )?(one|a single) night)\b/i, 'prazo de resultado'],
  [/\bburn(s|ing|ed)? (stubborn |belly )?fat\b|\bmelt(s|ing|ed)?\b/i, 'promessa de queimar/derreter gordura'],
  [/\bas an? (registered )?(nurse|doctor|trainer|dietitian|nutritionist|physician)\b|\b(i am|i'm) an? (nurse|trainer|doctor|dietitian|nutritionist|physician)\b|\bmy (patients?|clients?)\b|\b(rn|md)\b/i, 'credencial ou paciente do avatar'],
  [/slim ?soda/i, 'nome do produto'],
  [/✅|✔|•|^\s*[-*]\s/m, 'bullet ou fascination (R12 proíbe)'],
];
// No PT (referência interna) só se barra o que nunca pode aparecer em lugar nenhum.
const BANNED_PT = [BANNED[0], BANNED[8], BANNED[9]];
const EMOJI = /\p{Extended_Pictographic}/gu;

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
  return 'bakingsoda'; // o produto é a bebida de bicarbonato; vídeo que não cita o ingrediente na fala cai aqui (use `topic` pra forçar outro)
}

function build(ad) {
  const n = adsNum(ad.code), page = pg(ad.code), t = PAGE_TAGS[page];
  if (!t) throw new Error(`página desconhecida em ${ad.code}`);
  const topic = topicOf(ad);
  if (!TOPIC_TAG[topic]) throw new Error(`topic "${topic}" inválido em ${ad.code} (use ${Object.keys(TOPIC_TAG).join(' | ')})`);
  const kw = (ad.ctaKeyword || 'RECIPE').toUpperCase();
  const tags = [t.aud, TOPIC_TAG[topic], t.niche].join(' ');
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

// Erros da R12. `ad` (a entrada) é opcional: com ela, valida também os 6 textos escritos à mão.
function validate(out, ad) {
  const e = [];
  const L = s => (s || '').length;
  const page = pg(out.code || (ad && ad.code) || ''), t = PAGE_TAGS[page];
  // títulos
  if (!out.fbTitleEn || !out.ytTitleEn) e.push('falta título');
  if (!out.fbTitlePt || !out.ytTitlePt) e.push('falta o PT do título');
  if (L(out.ytTitleEn) > LIM.ytTitleMax) e.push(`título YT ${L(out.ytTitleEn)} car. (máx ${LIM.ytTitleMax}; ideal ≤ ${LIM.ytTitle}, o feed corta ~40)`);
  if (L(out.fbTitleEn) > LIM.fbTitle) e.push(`título FB ${L(out.fbTitleEn)} car. (máx ${LIM.fbTitle})`);
  if (/#/.test(`${out.ytTitleEn}${out.fbTitleEn}`)) e.push('hashtag no título (vai só na descrição)');
  if (EMOJI.test(out.ytTitleEn || '')) e.push('emoji no título do YouTube');
  EMOJI.lastIndex = 0;
  if (/\b[A-Z]{4,}\b/.test(out.ytTitleEn || '')) e.push('CAIXA ALTA no título do YouTube');
  if (out.fbTitleEn && out.ytTitleEn && out.fbTitleEn.trim().toLowerCase() === out.ytTitleEn.trim().toLowerCase()) e.push('título do Facebook igual ao do YouTube (FB = curiosidade; YT = palavra-chave primeiro)');
  // hook escrito à mão
  if (ad) {
    if (!ad.hook || !ad.hookPt) e.push('falta a linha de hook (EN ou PT)');
    if (L(ad.hook) > LIM.hook) e.push(`hook ${L(ad.hook)} car. (máx ${LIM.hook})`);
    if (/\n/.test(ad.hook || '')) e.push('hook com mais de uma linha');
    for (const k of ['primaryEn', 'primaryPt', 'primaryTextEN', 'primaryTextPT']) if (ad[k]) e.push(`${k} na entrada: o primary text foi aposentado pela R12, não gerar`);
  }
  // lista negra (EN = o que vai pro ar; PT = só o que não pode em lugar nenhum)
  for (const k of ['fbTitleEn', 'ytTitleEn', 'fbDescEn', 'ytDescEn']) {
    for (const [re, why] of BANNED) if (re.test(out[k] || '')) e.push(`${k}: ${why}`);
  }
  for (const k of ['fbTitlePt', 'ytTitlePt', 'fbDescPt', 'ytDescPt']) {
    for (const [re, why] of BANNED_PT) if (re.test(out[k] || '')) e.push(`${k}: ${why}`);
  }
  // emoji: nenhum no YouTube; no Facebook, no máximo 1 (estética de anúncio derruba o orgânico)
  if ((out.ytDescEn || '').match(EMOJI)) e.push('ytDescEn: emoji na descrição do YouTube');
  if (((`${out.fbTitleEn || ''} ${out.fbDescEn || ''}`).match(EMOJI) || []).length > 1) e.push('Facebook: mais de 1 emoji (estética de anúncio)');
  // descrições
  for (const k of ['fbDescEn', 'ytDescEn', 'fbDescPt', 'ytDescPt']) {
    const d = out[k] || '', lines = d.split('\n').filter(Boolean), tagLine = lines[lines.length - 1] || '';
    const tags = tagLine.match(/#\w+/g) || [];
    if (tags.length !== 3 || tagLine.replace(/#\w+|\s/g, '')) e.push(`${k}: a última linha deve ter exatamente 3 hashtags`);
    if ((d.match(/#\w+/g) || []).length !== 3) e.push(`${k}: hashtag fora da última linha`);
    const bad = tags.filter(x => TAG_BLACKLIST.includes(x.toLowerCase()));
    if (bad.length) e.push(`${k}: hashtag proibida ${bad.join(' ')}`);
    if (t && tags.length === 3 && (tags[0] !== t.aud || tags[2] !== t.niche || !Object.values(TOPIC_TAG).includes(tags[1]))) e.push(`${k}: hashtags fora da fórmula público + ingrediente + nicho da ${page} (${t.aud} #ingrediente ${t.niche})`);
    if (L(d) > LIM.desc) e.push(`${k}: ${L(d)} car. (máx ${LIM.desc}; descrição curta)`);
    if (lines.length > 3) e.push(`${k}: mais de 3 linhas (hook, CTA, hashtags)`);
    if (!/\n\n#/.test(d)) e.push(`${k}: as hashtags vão numa linha isolada, depois de uma linha em branco`);
  }
  for (const [k, m] of [['fbDescEn', out.fbDescMode], ['ytDescEn', out.ytDescMode]]) {
    const n = (out[k] || '').split('\n').filter(Boolean).length;
    if (!['hook_cta', 'cta'].includes(m)) e.push(`${k}: modo "${m}" inválido`);
    else if (n !== (m === 'hook_cta' ? 3 : 2)) e.push(`${k}: ${n} linhas não batem com o modo ${m}`);
  }
  if (out.fbDescMode && out.fbDescMode === out.ytDescMode) e.push('modos iguais nas duas redes (devem alternar: uma hook_cta, a outra cta)');
  if (!/\bcomment [A-Z]{3,}\b/i.test(out.fbDescEn || '') || !/follow me/i.test(out.fbDescEn || '')) e.push('fbDescEn sem CTA de palavra-chave + follow');
  if (!/profile/i.test(out.ytDescEn || '')) e.push('ytDescEn sem CTA do link do perfil');
  if (/\b[Cc]omment [A-Z]{3,}\b/.test(out.ytDescEn || '')) e.push('ytDescEn pede comentário (no YouTube não há DM automática; a CTA é o link do perfil)');
  if (/https?:\/\/|www\./i.test(`${out.ytDescEn}${out.fbDescEn}`)) e.push('link na descrição (em Short não clica; no Facebook derruba alcance)');
  return e;
}

// Avisos: não reprovam, mas aparecem no relatório.
function warnings(out) {
  const w = [];
  if ((out.ytTitleEn || '').length > LIM.ytTitle) w.push(`título YT com ${out.ytTitleEn.length} car. (ideal ≤ ${LIM.ytTitle}; o feed corta perto de 40)`);
  const first = (out.fbDescEn || '').split('\n\n')[0].replace(/\n/g, ' ');
  if (`${out.fbTitleEn || ''} ${first}`.length > LIM.fbFold + 60) w.push('Facebook: título + descrição longos; a CTA pode cair depois do "ver mais" (~125 car.)');
  return w;
}

module.exports = { build, validate, warnings, LIM, PAGE_TAGS, TOPIC_TAG, TAG_BLACKLIST, BANNED };

if (require.main === module) {
  const [inp, outp] = process.argv.slice(2);
  if (!inp || !outp) { console.error('uso: node post-fields.js entrada.json saida.json'); process.exit(1); }
  const ads = JSON.parse(fs.readFileSync(inp, 'utf8').replace(/^﻿/, ''));
  let falhou = false, avisos = 0; const res = [];
  for (const ad of ads) {
    let out, err, warn = [];
    try { out = build(ad); err = validate(out, ad); warn = warnings(out); }
    catch (ex) { out = { code: ad.code, ytTitleEn: ad.ytTitle || '' }; err = [ex.message]; }
    if (err.length) falhou = true;
    avisos += warn.length;
    const { code, ...copy } = out;
    res.push({ code, copy }); // formato do `node scripts/copy-ingest.mjs` do OPS-organic (o merge só troca estas chaves)
    console.log(`${ad.code} · FB ${out.fbDescMode} / YT ${out.ytDescMode} · YT "${out.ytTitleEn}" (${(out.ytTitleEn || '').length}) · ${err.length ? 'ERRO: ' + err.join('; ') : 'OK'}${warn.length ? ' · AVISO: ' + warn.join('; ') : ''}`);
  }
  if (!falhou) fs.writeFileSync(outp, JSON.stringify(res, null, 2));
  console.log(`${ads.length} anúncios · ${falhou ? 'REPROVADO (nada gravado)' : 'aprovado'}${avisos ? ` · ${avisos} aviso(s)` : ''}`);
  process.exit(falhou ? 1 : 0);
}
