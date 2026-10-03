# Título, descrição e hashtags de postagem (R12)

Fonte: estudo **"Títulos, descrições e hashtags validados (Facebook e YouTube)"** (03/10/2026), no vault em `Projects & context/OND-organic/Copy/`. Se o estudo mudar, vale o estudo, e este arquivo e o `scripts/post-fields.js` são corrigidos juntos.

Todo anúncio sobe com **quatro textos de postagem**, além da fala do vídeo: **Facebook** (título + descrição) e **YouTube Shorts** (título + descrição), cada um em EN (o que vai pro ar) e PT (referência). A descrição já leva as **3 hashtags** no fim, pra o Erick só copiar e colar.

Isso **aposenta de vez o primary text** (R04). **Não existem mais bullets nem fascinations na descrição**, nas duas redes. A fascination continua **dentro da fala do vídeo** (R06), não na legenda. Nenhuma copy nova leva `primaryEn`/`primaryPt` (nem `primaryTextEN`/`PT`, nome do artifact antigo): o script recusa entrada que ainda traz esses campos.

## Por que a regra existe

O primary text com ✅ veio do tráfego pago e falhou no orgânico por quatro motivos:
1. **Cara de anúncio.** No feed orgânico a pessoa desliza quando vê estética de anúncio (lista com ✅, promessa empilhada).
2. **Dobra do Facebook Reels.** Só os primeiros **~125 caracteres** da legenda aparecem antes do "ver mais". O formato antigo empurrava a CTA da palavra-chave pra depois da dobra e matava os comentários.
3. **YouTube Shorts é outro jogo.** Não há DM automática por comentário, e link em descrição ou comentário de Short **não clica desde 31/08/2023**. Legenda longa com promessa de saúde vira strike de *medical misinformation* no **canal**.
4. **Não havia busca nem tema.** O título do Short é o que a busca de Shorts indexa, e faltava a tríade de hashtags pro público certo (mulheres 40+ e 50+).

A descrição não vende o produto: **vende o comentário (Facebook) ou o toque no perfil (YouTube)**.

## Chaves no app (`videos.copy`, via `scripts/copy-ingest.mjs`)

| Chave | Conteúdo |
|---|---|
| `fbTitleEn` · `fbTitlePt` | Título do Facebook (1ª linha da legenda) |
| `fbDescEn` · `fbDescPt` | Descrição do Facebook: [hook] + CTA da palavra-chave + hashtags |
| `ytTitleEn` · `ytTitlePt` | Título do Short |
| `ytDescEn` · `ytDescPt` | Descrição do Short: [hook] + CTA do link do perfil + hashtags |
| `fbDescMode` · `ytDescMode` | `hook_cta` ou `cta` (qual formato esta descrição usa) |

`primaryEn`/`primaryPt` ficam congelados como legado nos anúncios antigos: **não escrever, não atualizar**.

## O que você escreve e o que o script faz

Você escreve, por anúncio, **seis textos curtos** (3 em EN + 3 em PT):
- `fbTitle` / `fbTitlePt`: título conversacional do Facebook, ≤ 60 caracteres;
- `ytTitle` / `ytTitlePt`: título de palavra-chave do YouTube, ideal ≤ 45, máximo 60;
- `hook` / `hookPt`: a linha de hook da descrição, ≤ 90 caracteres, uma linha só.

O `scripts/post-fields.js` faz o resto: detecta o ingrediente (ou usa `topic`), aplica as 3 hashtags da página, alterna os modos pela paridade do `ADS_`, escolhe a CTA no rodízio, valida limites e a lista negra, e entrega o JSON pronto pro `copy-ingest`. **Não montar descrição à mão.**

```
node scripts/post-fields.js entrada.json saida.json     # valida e gera (só grava a saída se nada reprovar)
node <OPS-organic>/scripts/copy-ingest.mjs saida.json   # sobe no app (merge só nessas chaves)
node scripts/post-fields.test.js                        # depois de mexer no script: os exemplos do estudo passam e cada proibição é barrada
```
Formato de `entrada.json` no topo do script. **ERRO** reprova (código de saída 1); **AVISO** passa, mas vale revisar (título do YouTube entre 46 e 60 caracteres).

## Títulos: um estilo pra cada rede

Os dois títulos de um anúncio **nunca são iguais** (o script barra). Usar o mesmo título nas duas redes prejudica as duas.

| | Facebook Reels | YouTube Shorts |
|---|---|---|
| O que é | a **1ª linha da legenda** (não há campo de título) | campo de **título próprio** |
| Função | fazer parar no feed, intrigar | indexar a busca de Shorts e as sugestões |
| Estilo | curiosidade direta, frase que uma mulher diria pra amiga na cozinha | **palavra-chave e assunto primeiro**, tom editorial e claro |
| Tamanho | até **60** caracteres (pra não roubar a CTA dos ~125 visíveis) | ideal **até 45**, teto **60** (o app corta perto de 40–45) |
| Não pode | hashtag, emoji em excesso, promessa que aciona filtro de saúde | hashtag, emoji, palavra inteira em CAIXA ALTA |

**Fórmulas validadas do Facebook** (curiosidade direta):
- *"My neighbor's two-ingredient morning drink"*
- *"What happens when you calm gut acid first thing"*
- *"The kitchen habit I started doing at 55"*
- *"Why your morning water isn't flattening your belly"*
- *"This is what baking soda does to morning bloat"*
- *"Why your lower belly won't budge after 45"*

**Fórmulas validadas do YouTube** (a busca lê a frente do título):
| Fórmula | Exemplo |
|---|---|
| `[ingrediente] + [benefício ou sintoma]` | *"Baking soda and lemon for belly bloat"* |
| `[hábito ou sintoma] + [público]` | *"Morning gut cleanse for women over 50"* |
| `[ingrediente] + [rotina]` | *"Baking soda morning routine for belly bloat"* |
| `[problema] + [solução caseira]` | *"Stubborn belly bloat: simple morning drink"* |
| `[remédio caseiro] + [sintoma]` | *"Natural remedy for bloated stomach"* |

Hashtag no título do YouTube é desperdício: o YouTube já puxa as 3 da descrição pra cima do título.

Facebook Reels tem **um campo só de legenda**. O app mostra título e descrição separados e oferece "Copiar legenda completa" (título + linha em branco + descrição). Quem posta cola uma coisa só.

## Descrição: dois modos, sempre curtos

Máximo **320 caracteres** no total (com as hashtags) e **3 linhas úteis**.

```
hook_cta                               cta
[hook, até 90 caracteres]              [CTA da rede]
[CTA da rede]
                                       #tag1 #tag2 #tag3
#tag1 #tag2 #tag3
```

- **`hook_cta`**: reforça a curiosidade do vídeo antes da instrução.
- **`cta`**: pra quando a fala já criou a urgência e a pessoa só precisa saber o que fazer.
- **Alternância A/B** (o script aplica pelo número do anúncio): ADS **ímpar** → Facebook `hook_cta` · YouTube `cta`; ADS **par** → Facebook `cta` · YouTube `hook_cta`. Cada página testa os dois modos em volume igual, nas duas redes.
- Nada de bullet, fascination, lista, ✅ ou parágrafo. Sem link na descrição.
- Facebook: hook e CTA ficam no começo e as hashtags no fim, por causa da dobra dos ~125 caracteres.

### CTA (rodízio de 3 versões por rede, pra a Meta não ver texto duplicado)

- **Facebook** (comentário com palavra-chave dispara a DM; sem o follow a DM não chega, é o reason why da R07):
  1. *"Comment RECIPE below and follow me, or I can't reach you."*
  2. *"Want the full recipe? Comment RECIPE and follow me."*
  3. *"Comment RECIPE and follow me, and I'll send you the recipe."*
- **YouTube** (sem DM automática e sem link clicável na descrição: a CTA leva ao **link do perfil** ou ao vídeo relacionado configurado no player):
  1. *"Full recipe: link on my profile."*
  2. *"Want the full recipe? Tap my profile and open the link."*
  3. *"The full recipe is in the link on my profile."*
  - Só vale quando o canal **já liberou os recursos avançados e tem o link do perfil**. Canal sem link: avisar o Erick; não prometer link que não existe.
  - A MIX (PG04) não tem canal no YouTube: os campos `yt*` são gerados pra manter o anúncio completo, mas não são postados.

## Hashtags: exatamente 3, na última linha

Fórmula: **`#público` (idade) + `#ingrediente` (tópico do vídeo) + `#nicho` (a dor da página)**. O script aplica e confere.

| Página | Persona | Tag 1 · público | Tag 2 · ingrediente (padrão) | Tag 3 · nicho |
|---|---|---|---|---|
| PG01 | Harper Wilson | `#womenover50` | `#bakingsoda` | `#naturalremedies` |
| PG02 | Sophia Brown | `#womenover40` | `#bakingsoda` | `#bellybloat` |
| PG03 | Emma Davys | `#womenover50` | `#bakingsoda` | `#guthealth` |
| PG04 | MIX | `#womenover40` | `#bakingsoda` | `#morningroutine` |
| PG05 | Sarah Miller | `#womenover40` | `#bakingsoda` | `#momlife` |

**Tag 2 muda com o foco do vídeo** (o script detecta pelo hook e pelo corpo da fala; `topic` força):
| Foco | `topic` | Tag |
|---|---|---|
| Bicarbonato (o mecanismo central; é o padrão) | `bakingsoda` | `#bakingsoda` |
| Gengibre, chá de raiz | `gingertea` | `#gingertea` |
| Água morna com limão | `lemonwater` | `#lemonwater` |
| Canela, especiarias | `cinnamon` | `#cinnamon` |
| Truque de cozinha | `kitchenhacks` | `#kitchenhacks` |

**Por que 3:** o YouTube mostra só as **3 primeiras** hashtags acima do título, e mais de **15** faz ele ignorar todas; tag que não descreve o vídeo é violação de metadados. No Facebook o alcance vem do tema e da retenção, e um bloco de 20 hashtags parece spam. Hashtag vai **só na descrição**, nunca no título.

**Lista negra de hashtags (o script barra):**
- `#shorts`: redundante, o formato já identifica.
- `#ozempic`, `#wegovy`, `#mounjaro`, `#zepbound`, `#glp1`: política de fármacos.
- `#weightloss`, `#loseweight`, `#diet`: saturadas, atraem bot e tiram a entrega do público maduro.

## Proibido em título e descrição (o script barra)

A fala do vídeo tem a margem dela; a **legenda é lida inteira pelos classificadores** (texto e OCR) no upload. No YouTube o strike é do **canal**: 3 em 90 dias encerram, e arrastam os outros canais da mesma conta. Por isso a legenda é mais conservadora que a fala, de propósito. As alavancas de compliance (Ozempic, número de peso) que a regra 9 permite na fala **nunca** entram aqui.

| Categoria | Não escrever | Como dizer com segurança |
|---|---|---|
| Medicamentos | Ozempic, Wegovy, Mounjaro, Zepbound, GLP-1 | *"morning routine"*, *"kitchen habit"*, *"natural drink"* |
| Promessa de cura | "cures", "heals", "reverses" | verbos de alívio: *"calms gut acid"*, *"supports digestion"*, *"helps bloating"* |
| Prazo de resultado | "overnight", "in 7 days", "in seven days", "in 24 hours" | frequência de hábito: *"morning habit"*, *"daily routine"*, *"every morning"* |
| Peso e medida | "lost 25 lbs", "twenty six pounds", "size 18 to 8", "two sizes" | sensação: *"jeans button again"*, *"belly bloat drops"*, *"feel like yourself"* |
| Queima de gordura | "burns belly fat", "melts stubborn fat" | inchaço: *"belly bloat"*, *"calms bloating"*, *"morning puffiness"* |
| Credencial do avatar | "as a nurse", "my patients", "I am a doctor", "my clients" | voz de quem faz em casa: *"my neighbor showed me"*, *"the recipe I make"*, *"what worked for me"* |
| Nome da oferta | "SlimSoda", "Slim Soda" | *"the recipe"*, *"the two-ingredient drink"* |
| Estética de anúncio | ✅, `•`, lista com `-`, emoji em excesso (nenhum no YouTube; no máximo 1 no Facebook) | texto puro, em linhas limpas |

Número por extenso também reprova ("seven days", "size sixteen"): o validador lê os dois jeitos. Idade do público ("after 45", "at 55", "women over 50") não é resultado e passa.

A credencial vale pra legenda mesmo quando o avatar é enfermeira ou treinadora na fala (Emma, Sophia): na legenda ela fala como quem faz a receita em casa.

## Exemplos prontos (do estudo)

**Demonstração de receita · mecanismo da solução · PG01 Harper · ADS ímpar**
```
FB título: What happens when you calm gut acid first thing
YT título: Baking soda and lemon for belly bloat
hook:      The version online misses the one piece that makes it last all day.

Facebook (hook_cta):
The version online misses the one piece that makes it last all day.
Comment RECIPE below and follow me, or I can't reach you.

#womenover50 #bakingsoda #naturalremedies

YouTube (cta):
Full recipe: link on my profile.

#womenover50 #bakingsoda #naturalremedies
```

**Talking head + B-roll · problema / causa raiz · PG02 Sophia · ADS par**
```
FB título: Why your lower belly won't budge after 40
YT título: Morning bloat remedy for women over 40
hook:      It is not stubborn fat, your gut is just holding on.

Facebook (cta):
Want the full recipe? Comment RECIPE and follow me.

#womenover40 #bakingsoda #bellybloat

YouTube (hook_cta):
It is not stubborn fat, your gut is just holding on.
The full recipe is in the link on my profile.

#womenover40 #bakingsoda #bellybloat
```

**UGC · segredo de autoridades · PG03 Emma · ADS ímpar**
```
FB título: The simple kitchen habit I started doing at 55
YT título: Natural gut cleansing drink recipe
hook:      My grandmother never bought fancy teas, just this two-ingredient cup.

Facebook (hook_cta):
My grandmother never bought fancy teas, just this two-ingredient cup.
Comment RECIPE and follow me, and I'll send you the recipe.

#womenover50 #bakingsoda #guthealth

YouTube (cta):
The full recipe is in the link on my profile.

#womenover50 #bakingsoda #guthealth
```
(A CTA exata de cada anúncio sai do rodízio do script; os exemplos mostram o formato.)

## Checklist de QA da R12 (passo 9)

- [ ] **Título do YouTube:** palavra-chave no começo · ideal ≤ 45, nunca > 60 · sem hashtag, emoji ou CAIXA ALTA
- [ ] **Título do Facebook:** curiosidade direta, conversacional · ≤ 60 · sem hashtag · diferente do título do YouTube
- [ ] **Descrição:** até 3 linhas úteis e ~320 caracteres · sem ✅, bullet ou parágrafo · sem link
- [ ] **CTA:** Facebook com palavra-chave + follow · YouTube com o link do perfil, sem pedir comentário
- [ ] **Modos alternados:** ímpar = FB `hook_cta` / YT `cta`; par = o contrário
- [ ] **Hashtags:** exatamente 3, na última linha isolada · público + ingrediente + nicho da página · nenhuma da lista negra
- [ ] **Compliance:** nada de Ozempic/GLP-1, cura, prazo, peso ou tamanho de roupa, queima de gordura, credencial do avatar, SlimSoda
- [ ] **PT** dos 6 textos escritos
- [ ] **Sem primary text** no anúncio novo
- [ ] `node scripts/post-fields.js` sem ERRO
