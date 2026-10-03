// Teste do post-fields.js (R12). Uso: node scripts/post-fields.test.js
// Os 3 exemplos do estudo têm que passar; cada caso proibido tem que ser barrado pelo motivo certo.
const { build, validate, warnings } = require('./post-fields.js');
let falhas = 0;
const ok = (nome, cond, extra = '') => { if (!cond) { falhas++; console.log(`FALHOU · ${nome} ${extra}`); } else console.log(`ok · ${nome}`); };

const base = { code: 'SS-PG01-ADS_001-V_001', hookEN: 'This is what baking soda does to your belly.',
  fbTitle: 'What happens when you calm gut acid first thing', fbTitlePt: 'O que acontece quando você acalma o ácido logo cedo',
  ytTitle: 'Baking soda and lemon for belly bloat', ytTitlePt: 'Bicarbonato e limão para desinchar a barriga',
  hook: 'The version online misses the one piece that makes it last all day.', hookPt: 'A versão da internet não tem a peça que faz durar o dia todo.' };

// ── exemplos do estudo (seção 8) ──
const ex1 = build(base);
ok('exemplo 1 passa', validate(ex1, base).length === 0, JSON.stringify(validate(ex1, base)));
ok('exemplo 1: ímpar = FB hook_cta / YT cta', ex1.fbDescMode === 'hook_cta' && ex1.ytDescMode === 'cta');
ok('exemplo 1: FB igual ao estudo', ex1.fbDescEn === "The version online misses the one piece that makes it last all day.\nComment RECIPE below and follow me, or I can't reach you.\n\n#womenover50 #bakingsoda #naturalremedies", ex1.fbDescEn);
ok('exemplo 1: hashtags da PG01', ex1.ytDescEn.endsWith('#womenover50 #bakingsoda #naturalremedies'));

const ad2 = { ...base, code: 'SS-PG02-ADS_002-V_001', fbTitle: "Why your lower belly won't budge after 40", fbTitlePt: 'Por que sua pochete não sai do lugar após os 40',
  ytTitle: 'Morning bloat remedy for women over 40', ytTitlePt: 'Remédio para inchaço matinal em mulheres 40+',
  hook: 'It is not stubborn fat, your cortisol signal is just locked.', hookPt: 'Não é gordura teimosa, o sinal do seu cortisol só está travado.' };
const ex2 = build(ad2);
ok('exemplo 2 passa', validate(ex2, ad2).length === 0, JSON.stringify(validate(ex2, ad2)));
ok('exemplo 2: par = FB cta / YT hook_cta', ex2.fbDescMode === 'cta' && ex2.ytDescMode === 'hook_cta');
ok('exemplo 2: hashtags da PG02', ex2.fbDescEn.endsWith('#womenover40 #bakingsoda #bellybloat'));

const ad3 = { ...base, code: 'SS-PG03-ADS_003-V_001', fbTitle: 'The simple kitchen habit I started doing at 55', fbTitlePt: 'O hábito simples de cozinha que comecei aos 55',
  ytTitle: 'Natural gut cleansing drink recipe', ytTitlePt: 'Receita de bebida natural para limpeza intestinal',
  hook: 'My grandmother never bought fancy teas, just this two-ingredient cup.', hookPt: 'A minha avó nunca comprou chá caro, só essa xícara de dois ingredientes.' };
const ex3 = build(ad3);
ok('exemplo 3 passa', validate(ex3, ad3).length === 0, JSON.stringify(validate(ex3, ad3)));
ok('exemplo 3: hashtags da PG03', ex3.fbDescEn.endsWith('#womenover50 #bakingsoda #guthealth'));

// ── ingrediente dinâmico ──
ok('topic gingertea', build({ ...base, topic: 'gingertea' }).fbDescEn.includes('#gingertea'));
ok('detecta gengibre pelo hook', build({ ...base, hookEN: 'Never buy a ginger root like this one.' }).fbDescEn.includes('#gingertea'));
let lancou = false; try { build({ ...base, topic: 'weightloss' }); } catch { lancou = true; }
ok('topic inválido é recusado', lancou);

// ── cada proibição tem que ser barrada ──
const barra = (nome, patch, motivo) => {
  const ad = { ...base, ...patch }, errs = validate(build(ad), ad);
  ok(`barra: ${nome}`, errs.some(x => x.includes(motivo)), `→ ${JSON.stringify(errs)}`);
};
barra('Ozempic', { fbTitle: 'Better than Ozempic for me' }, 'Ozempic');
barra('GLP-1', { hook: 'My natural GLP-1 morning habit.' }, 'Ozempic');
barra('cura', { ytTitle: 'Baking soda cures belly bloat' }, 'cura');
barra('reverses', { hook: 'This reverses years of bloating.' }, 'cura');
barra('prazo em algarismo', { hook: 'Flat belly in 7 days.' }, 'prazo');
barra('prazo por extenso', { hook: 'Flat belly in seven days.' }, 'prazo');
barra('24 horas', { hook: 'Bloat gone in 24 hours.' }, 'prazo');
barra('overnight', { fbTitle: 'Flatten your belly overnight' }, 'prazo');
barra('peso em algarismo', { hook: 'I lost 25 lbs with this.' }, 'peso');
barra('peso por extenso', { hook: 'I lost twenty six pounds with this.' }, 'peso');
barra('tamanho de roupa', { fbTitle: 'From a size 18 to a size 8' }, 'tamanho');
barra('tamanho por extenso', { fbTitle: 'I went from a size sixteen to a ten' }, 'tamanho');
barra('queima gordura', { ytTitle: 'Baking soda burns belly fat' }, 'queimar');
barra('derrete', { hook: 'It melts stubborn fat.' }, 'queimar');
barra('as a nurse', { hook: 'As a nurse, I see this every week.' }, 'credencial');
barra('my patients', { fbTitle: 'What I tell my patients about bloat' }, 'credencial');
barra('nome do produto', { hook: 'SlimSoda is my morning drink.' }, 'produto');
barra('checkmark', { hook: '✅ The step most women skip' }, 'bullet');
barra('hashtag no título', { ytTitle: 'Baking soda for bloat #guthealth' }, 'hashtag no título');
barra('emoji no título do YouTube', { ytTitle: 'Baking soda for belly bloat 🍋' }, 'emoji');
barra('CAIXA ALTA no YouTube', { ytTitle: 'BAKING SODA for belly bloat' }, 'CAIXA ALTA');
barra('título YT acima de 60', { ytTitle: 'Baking soda and lemon and ginger morning drink for stubborn belly bloat' }, 'título YT');
barra('título FB acima de 60', { fbTitle: 'What really happens when you calm your gut acid first thing every day' }, 'título FB');
barra('hook acima de 90', { hook: 'The version everyone shares online misses the one small piece that makes the whole thing last all day long.' }, 'hook');
barra('títulos iguais', { fbTitle: 'Baking soda and lemon for belly bloat' }, 'igual');
barra('sem PT', { hookPt: '' }, 'hook');
barra('primary text na entrada', { primaryEn: 'Hook\n\n✅ a\n✅ b' }, 'aposentado');

// ── hashtag proibida ou fora da fórmula ──
const forj = build(base); forj.fbDescEn = forj.fbDescEn.replace('#bakingsoda', '#weightloss');
ok('barra: hashtag da lista negra', validate(forj, base).some(x => x.includes('proibida')));
const forj2 = build(base); forj2.ytDescEn = forj2.ytDescEn.replace('#womenover50', '#womenover40');
ok('barra: hashtag fora da fórmula da página', validate(forj2, base).some(x => x.includes('fórmula')));
const forj3 = build(base); forj3.fbDescEn += ' #guthealth';
ok('barra: mais de 3 hashtags', validate(forj3, base).some(x => x.includes('3 hashtags')));

// ── aviso (não reprova) ──
const longo = { ...base, ytTitle: 'Baking soda and lemon morning drink for bloating' }; // 48: acima do ideal (45), abaixo do teto (60)
ok('YT entre 46 e 60 car. passa com aviso', longo.ytTitle.length > 45 && validate(build(longo), longo).length === 0 && warnings(build(longo)).length === 1);
ok('YT com 45 car. passa sem aviso', warnings(build({ ...base, ytTitle: 'Baking soda and lemon morning drink for bloat' })).length === 0);

// ── rodízio de CTA e paridade ──
const ctas = new Set([1, 2, 3].map(n => build({ ...base, code: `SS-PG01-ADS_00${n}-V_001` }).fbDescEn.split('\n').find(l => /Comment/i.test(l))));
ok('3 CTAs diferentes no Facebook em anúncios seguidos', ctas.size === 3);

console.log(falhas ? `\n${falhas} teste(s) falharam` : '\ntodos os testes passaram');
process.exit(falhas ? 1 : 0);
