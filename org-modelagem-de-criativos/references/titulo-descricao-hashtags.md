# Título, descrição e hashtags de postagem (R12)

Todo anúncio sobe com **quatro textos de postagem**, além da fala do vídeo: **Facebook** (título + descrição) e **YouTube Shorts** (título + descrição), cada um em EN (o que vai pro ar) e PT (referência). A descrição já leva as **3 hashtags** no fim, pra o Erick só copiar e colar.

Isso **substitui o primary text** (R04). **Acabaram os bullets e as fascinations na descrição**, nas duas redes. A fascination continua existindo **dentro da fala do vídeo** (R06), não na legenda.

## Chaves no app (`videos.copy`, via `scripts/copy-ingest.mjs`)

| Chave | Conteúdo |
|---|---|
| `fbTitleEn` · `fbTitlePt` | Título do Facebook (1ª linha da legenda) |
| `fbDescEn` · `fbDescPt` | Descrição do Facebook: [hook] + CTA da palavra-chave + hashtags |
| `ytTitleEn` · `ytTitlePt` | Título do Short |
| `ytDescEn` · `ytDescPt` | Descrição do Short: [hook] + CTA do link do perfil + hashtags |
| `fbDescMode` · `ytDescMode` | `hook_cta` ou `cta` (qual formato esta descrição usa) |

`primaryEn`/`primaryPt` ficam só como legado nos anúncios antigos: **não escrever mais**.

## O que escrever (você) e o que o script faz

Você escreve, por anúncio, **seis textos curtos** (EN + PT): título do YouTube, título do Facebook e a **linha de hook** da descrição. O script `scripts/post-fields.js` monta o resto (CTA, alternância dos formatos, 3 hashtags), valida a R12 e entrega o JSON pronto pro `copy-ingest`. Não montar descrição à mão.

```
node scripts/post-fields.js entrada.json saida.json     # valida e gera
node <OPS-organic>/scripts/copy-ingest.mjs saida.json   # sobe no app (merge só nessas chaves)
```
Formato de `entrada.json` no topo do script.

## Títulos

| | Facebook | YouTube Shorts |
|---|---|---|
| Tamanho | até **60** caracteres | ideal **até 45**, máximo 60 (o feed do Shorts corta perto de 40) |
| Estilo | curiosidade direta, frase de quem fala ("My neighbor's two-ingredient drink") | **palavra-chave primeiro** (o ingrediente + o assunto), é o que a busca de Shorts indexa ("Baking soda and lemon for belly bloat") |
| Não pode | hashtag, bullet, ✅ | hashtag, emoji, CAIXA ALTA |

Os dois títulos de um anúncio **não são iguais**: o do Facebook chama pela curiosidade, o do YouTube nomeia o assunto.

Facebook Reels tem **um campo só de legenda** (sem título separado). O app mostra o título e a descrição separados e oferece "Copiar legenda completa" (título + linha em branco + descrição). Quem posta cola uma coisa só.

## Descrição: dois formatos, sempre curtos

- **`hook_cta`**: uma linha de hook + a CTA. (≤ 90 caracteres no hook.)
- **`cta`**: só a CTA.
- **Intercalar** (padrão do script, pelo número do anúncio): ADS ímpar → Facebook `hook_cta` · YouTube `cta`; ADS par → Facebook `cta` · YouTube `hook_cta`. Assim cada rede testa os dois formatos e dá pra comparar.
- Nada de bullet, fascination, lista, ✅, parágrafo. Máximo 3 linhas: hook (se tiver), CTA, hashtags. Total até ~320 caracteres.
- Facebook: só os ~125 primeiros caracteres aparecem antes do "mais". Por isso hook + CTA ficam no começo e as hashtags no fim.

### CTA (o script gira entre 3 versões por rede, pra a legenda não ficar idêntica em todo vídeo)

- **Facebook** (palavra-chave comentada + follow, reason why da R07): *"Comment RECIPE below and follow me, or I can't reach you."* · *"Want the full recipe? Comment RECIPE and follow me."* · *"Comment RECIPE and follow me, and I'll send you the recipe."*
- **YouTube** (não há DM nem automação de comentário, e link em descrição/comentário de Short **não clica**): *"Full recipe: link on my profile."* · *"Want the full recipe? Tap my profile and open the link."* · *"The full recipe is in the link on my profile."*
  - Só vale quando o canal **já liberou os recursos avançados e tem o link do perfil**. Canal sem link: avisar o Erick; não prometer link que não existe.

## Hashtags (3 por post, na última linha)

Fórmula: **público da página + ingrediente do vídeo + nicho da página**. O script já aplica.

| Página | Público | Nicho |
|---|---|---|
| PG01 Harper | `#womenover50` | `#naturalremedies` |
| PG02 Sophia | `#womenover40` | `#bellybloat` |
| PG03 Emma | `#womenover50` | `#guthealth` |
| PG04 MIX | `#womenover40` | `#morningroutine` |
| PG05 Sarah | `#womenover40` | `#momlife` |

Ingrediente: `#bakingsoda` · `#gingertea` · `#lemonwater` · `#cinnamon` · `#kitchenhacks` (o script detecta pelo hook/body; `topic` força).

Por que 3: no YouTube só as **3 primeiras** aparecem acima do título, mais de **15** faz o YouTube ignorar todas; no Facebook o alcance vem do tema e do vídeo, não da quantidade. Hashtag vai **só na descrição**, nunca no título. Não usar `#shorts` (o formato já identifica), `#ozempic` e afins, nem tag que não descreve o vídeo.

## Proibido em título e descrição (o script barra)

- Menção a **Ozempic, Wegovy, Mounjaro, GLP-1**.
- Promessa de **cura**, "derrete/queima gordura", **prazo de resultado** ("overnight", "in seven days"), **número de peso, tamanho de roupa ou dias/semanas** como resultado ("lost 26 pounds", "size 18 to 10").
- **Credencial ou paciente do avatar** ("as a nurse", "my patients", "I'm a trainer").
- **Nome do produto** (SlimSoda).
- Bullet, ✅, fascination.

Motivo: a descrição é a parte que os classificadores leem inteira (texto da legenda, link, título), e uma legenda com promessa de saúde derruba o vídeo mesmo com a fala suave; no YouTube, o strike é do **canal** (3 em 90 dias encerra) e arrasta os outros canais da mesma operação. A fala do vídeo segue as regras dela; a legenda é mais conservadora de propósito.

## Checklist rápido (QA do passo 9)

- [ ] 3 hashtags na última linha, nenhuma no título
- [ ] Título YT ≤ 45 (nunca > 60), sem emoji; título FB ≤ 60
- [ ] Descrição ≤ 3 linhas, sem bullet/✅
- [ ] Modo alternado (ímpar: FB `hook_cta`/YT `cta`; par: o contrário)
- [ ] Nenhuma palavra da lista proibida
- [ ] PT para os 6 textos
- [ ] `node scripts/post-fields.js` sem erro
